
package com.google.homesampleapp.trackrAPI

import com.google.homesampleapp.Device
import com.google.homesampleapp.Devices
import com.google.homesampleapp.MainActivity
import com.google.homesampleapp.chip.ClustersHelper
import com.google.homesampleapp.data.DevicesRepository
import dagger.Module
import dagger.Provides
import dagger.hilt.InstallIn
import dagger.hilt.components.SingletonComponent
import java.util.*
import javax.inject.Inject


//@InstallIn(SingletonComponent::class)
//@Module
class TempReader {


    @Inject
    internal lateinit var devicesRepository: DevicesRepository

    @Inject
    internal lateinit var clusters: ClustersHelper
    internal lateinit var api: trackrAPI


    // temp methods
    suspend fun temperatureReaderLastId(): Long {
        return devicesRepository.getLastDeviceId()
    }

    //@Provides
    suspend fun temperatureReader(deviceId: Long, endpoint: Int): Int?{
        return clusters.readTemperatureClusterVendorIDAttribute(deviceId, endpoint)
    }

    //device methods
    fun getDeviceId(device: Device): Long{
        return device.deviceId
    }

    fun getIdsFromDevices(devices: Devices): MutableList<Long>{

        val listOfDevices = devices.devicesList
        val count = devices.devicesCount
        val retVals: MutableList<Long> = mutableListOf()

        if (count > 0) {
            for(device in listOfDevices){
                retVals.add(getDeviceId(device))
            }
        }

        return retVals
    }



//    fun temperatureReaderThread(){
//
//        //schedule commands to run after a given delay
//        //FIFO
//        val threadObject = ScheduledThreadPoolExecutor(2)
//
//        threadObject.execute()
//
//    }

}

// Class that implements Runnable interface
internal class Command(var taskName: String) : Runnable {

    override fun run() {
        try {
            println(
                "Task name : "
                        + taskName
                        + " Current time : "
                        + Calendar.getInstance()[Calendar.SECOND]
            )
            Thread.sleep(2000)
        } catch (e: Exception) {
            e.printStackTrace()
        }
    }

}