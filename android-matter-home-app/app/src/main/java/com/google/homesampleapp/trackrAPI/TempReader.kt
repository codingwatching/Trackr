
package com.google.homesampleapp.trackrAPI

import java.util.*
import java.util.concurrent.ScheduledThreadPoolExecutor
import com.google.homesampleapp.data.DevicesRepository
import com.google.homesampleapp.chip.ClustersHelper

import javax.inject.Inject

class TempReader {

    @Inject
    internal lateinit var devicesRepository: DevicesRepository

    @Inject
    internal lateinit var clusters: ClustersHelper
    internal lateinit var api: trackrAPI

    suspend fun temperatureReaderDeviceId(): Long {
        return devicesRepository.getLastDeviceId()
    }

    suspend fun temperatureReader(deviceId: Long, endpoint: Int): Int?{
        return clusters.readTemperatureClusterVendorIDAttribute(deviceId, endpoint)
    }

    fun temperatureReaderThread(){

        //schedule commands to run after a given delay
        //FIFO
        val threadObject = ScheduledThreadPoolExecutor(2)

        threadObject.execute()

    }

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
            println(
                "Executed : " + taskName
                        + " Current time : "
                        + Calendar.getInstance()[Calendar.SECOND]
            )
        } catch (e: Exception) {
            e.printStackTrace()
        }
    }

}