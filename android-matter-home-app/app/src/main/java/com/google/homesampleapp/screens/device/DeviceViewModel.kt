/*
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package com.google.homesampleapp.screens.device

import android.content.IntentSender
import android.os.SystemClock
import androidx.fragment.app.FragmentActivity
import androidx.lifecycle.*
import com.google.android.gms.home.matter.Matter
import com.google.android.gms.home.matter.commissioning.CommissioningWindow
import com.google.android.gms.home.matter.commissioning.ShareDeviceRequest
import com.google.android.gms.home.matter.common.DeviceDescriptor
import com.google.android.gms.home.matter.common.Discriminator
import com.google.homesampleapp.DISCRIMINATOR
import com.google.homesampleapp.ITERATION
import com.google.homesampleapp.OPEN_COMMISSIONING_WINDOW_DURATION_SECONDS
import com.google.homesampleapp.PERIODIC_UPDATE_INTERVAL_DEVICE_SCREEN_SECONDS
import com.google.homesampleapp.SETUP_PIN_CODE
import com.google.homesampleapp.TaskStatus
import com.google.homesampleapp.chip.ChipClient
import com.google.homesampleapp.chip.ClustersHelper
import com.google.homesampleapp.data.DevicesRepository
import com.google.homesampleapp.data.DevicesStateRepository
import com.google.homesampleapp.isDummyDevice
import com.google.homesampleapp.screens.home.DeviceUiModel
import dagger.hilt.android.lifecycle.HiltViewModel
import java.time.LocalDateTime
import javax.inject.Inject
import kotlin.random.Random
import kotlinx.coroutines.delay
import kotlinx.coroutines.launch
import timber.log.Timber

/** The ViewModel for the Device Fragment. See [DeviceFragment] for additional information. */
@HiltViewModel
class DeviceViewModel
@Inject
constructor(
    private val devicesRepository: DevicesRepository,
    private val devicesStateRepository: DevicesStateRepository,
    private val chipClient: ChipClient,
    private val clustersHelper: ClustersHelper
) : ViewModel() {

  // Controls whether a periodic ping to the device is enabled or not.
  private var devicePeriodicPingEnabled: Boolean = true

  /** Generic status about actions processed in this screen. */
  private val _statusInfo = MutableLiveData("")
  val statusInfo: LiveData<String>
  get() = _statusInfo

  // -----------------------------------------------------------------------------------------------
  // Operations on device

  fun removeDevice(deviceId: Long) {
    Timber.d("**************** remove device ****** [${deviceId}]")
    viewModelScope.launch { devicesRepository.removeDevice(deviceId) }
  }

  // -----------------------------------------------------------------------------------------------
  // Inspect device
  fun inspectDescriptorCluster(deviceUiModel: DeviceUiModel) {
    val nodeId = deviceUiModel.device.deviceId
    val name = deviceUiModel.device.name
    val divider = "-".repeat(20)
    if (isDummyDevice(deviceUiModel.device.name)) {
      Timber.d(
          "Inspect Dummy Device\n${divider} Inspect Dummy Device [${name}] [${nodeId}] $divider" +
              "\n[Device Types List]\nBogus data\n[Server Clusters]\nBogus data\n[Client Clusters]\nBogus data\n[Parts List]\nBogus data")
      Timber.d(
          "Inspect Dummy Device\n${divider} End of Inspect Dummy Device [${name}] [${nodeId}] $divider")
    } else {
      Timber.d("\n${divider} Inspect Device [${name}] [${nodeId}] $divider")
      viewModelScope.launch {
        val partsListAttribute =
            clustersHelper.readDescriptorClusterPartsListAttribute(
                chipClient.getConnectedDevicePointer(nodeId), 0)
        Timber.d("partsListAttribute [${partsListAttribute}]")

        partsListAttribute?.forEach { part ->
          Timber.d("part [$part] is [${part.javaClass}]")
          val endpoint =
              when (part) {
                is Int -> part.toInt()
                else -> return@forEach
              }
          Timber.d("Processing part [$part]")

          val deviceListAttribute =
              clustersHelper.readDescriptorClusterDeviceListAttribute(
                  chipClient.getConnectedDevicePointer(nodeId), endpoint)
          deviceListAttribute.forEach { Timber.d("device attribute: [${it}]") }

          val serverListAttribute =
              clustersHelper.readDescriptorClusterServerListAttribute(
                  chipClient.getConnectedDevicePointer(nodeId), endpoint)
          serverListAttribute.forEach { Timber.d("server attribute: [${it}]") }
        }
      }
    }
  }

  fun inspectApplicationBasicCluster(nodeId: Long) {
    Timber.d("inspectApplicationBasicCluster: nodeId [${nodeId}]")
    viewModelScope.launch {
      val attributeList = clustersHelper.readApplicationBasicClusterAttributeList(nodeId, 1)
      attributeList.forEach { Timber.d("inspectDevice attribute: [$it]") }
    }
  }

  fun inspectBasicCluster(deviceId: Long) {
    Timber.d("inspectBasicCluster: deviceId [${deviceId}]")
    viewModelScope.launch {
      val vendorId = clustersHelper.readBasicClusterVendorIDAttribute(deviceId, 0)
      Timber.d("vendorId [${vendorId}]")

      val attributeList = clustersHelper.readBasicClusterAttributeList(deviceId, 0)
      Timber.d("attributeList [${attributeList}]")
    }
  }



  // -----------------------------------------------------------------------------------------------
  // Task that runs periodically to update the device state.

  fun startDevicePeriodicPing(deviceUiModel: DeviceUiModel) {
    Timber.d(
        "${LocalDateTime.now()} startDevicePeriodicPing every $PERIODIC_UPDATE_INTERVAL_DEVICE_SCREEN_SECONDS seconds")
    devicePeriodicPingEnabled = true
    runDevicePeriodicUpdate(deviceUiModel)
  }

  private fun runDevicePeriodicUpdate(deviceUiModel: DeviceUiModel) {
    viewModelScope.launch {
      while (devicePeriodicPingEnabled) {
        // Do something here on the main thread
        Timber.d("[device ping] begin")
        var isOn = clustersHelper.getDeviceStateOnOffCluster(deviceUiModel.device.deviceId, 1)
        Timber.d("[device ping] response [${isOn}]")
        var isOnline: Boolean
        if (isOn == null) {
          Timber.e("[device ping] failed")
          isOn = false
          isOnline = false
        } else {
          isOnline = true
        }
        devicesStateRepository.updateDeviceState(
            deviceUiModel.device.deviceId, isOnline = isOnline, isOn = isOn)
        delay(PERIODIC_UPDATE_INTERVAL_DEVICE_SCREEN_SECONDS * 1000L)
      }
    }
  }

  fun stopDevicePeriodicPing() {
    devicePeriodicPingEnabled = false
  }
}
