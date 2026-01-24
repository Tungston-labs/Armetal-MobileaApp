package com.anonymous.Rekory

import android.app.*
import android.content.Intent
import android.location.Location
import android.os.Build
import android.os.IBinder
import android.os.PowerManager
import androidx.core.app.NotificationCompat
import com.google.android.gms.location.*
import okhttp3.*
import okhttp3.MediaType.Companion.toMediaType
import okhttp3.RequestBody.Companion.toRequestBody
import org.json.JSONObject
import java.util.concurrent.TimeUnit

class LocationService : Service() {

    private lateinit var fusedClient: FusedLocationProviderClient
    private lateinit var locationCallback: LocationCallback
    private lateinit var wakeLock: PowerManager.WakeLock

    override fun onCreate() {
        super.onCreate()

        // WakeLock
        val pm = getSystemService(POWER_SERVICE) as PowerManager
        wakeLock = pm.newWakeLock(
            PowerManager.PARTIAL_WAKE_LOCK,
            "Rekory::LocationWakeLock"
        )
        wakeLock.acquire()

        fusedClient = LocationServices.getFusedLocationProviderClient(this)

        createNotificationChannel()
        startForeground(1, buildNotification())

        locationCallback = object : LocationCallback() {
            override fun onLocationResult(result: LocationResult) {
                result.lastLocation?.let {
                    sendLocationToBackend(it)
                }
            }
        }

        startLocationUpdates()
    }

    private fun startLocationUpdates() {
        val request = LocationRequest.Builder(
            Priority.PRIORITY_HIGH_ACCURACY,
            2 * 60 * 1000
        )
            .setMinUpdateIntervalMillis(60_000)
            .setWaitForAccurateLocation(false)
            .build()

        fusedClient.requestLocationUpdates(
            request,
            locationCallback,
            mainLooper
        )
    }

    private fun sendLocationToBackend(location: Location) {
        val prefs = getSharedPreferences("rekory", MODE_PRIVATE)

        val employeeId = prefs.getString("employeeId", null) ?: return
        val sessionId = prefs.getString("sessionId", null) ?: return
        val token = prefs.getString("token", null) ?: return

        val json = JSONObject().apply {
            put("session_id", sessionId)
            put("latitude", location.latitude)
            put("longitude", location.longitude)
        }.toString()

        val body = json.toRequestBody("application/json".toMediaType())

        val request = Request.Builder()
            .url("https://api.rekory.com/api/background-location/$employeeId/")
            .addHeader("Authorization", "Bearer $token")
            .post(body)
            .build()

        OkHttpClient.Builder()
            .connectTimeout(10, TimeUnit.SECONDS)
            .readTimeout(10, TimeUnit.SECONDS)
            .build()
            .newCall(request)
            .enqueue(object : Callback {
                override fun onFailure(call: Call, e: java.io.IOException) {}
                override fun onResponse(call: Call, response: Response) {
                    response.close()
                }
            })
    }

    override fun onDestroy() {
        fusedClient.removeLocationUpdates(locationCallback)
        if (wakeLock.isHeld) wakeLock.release()
        super.onDestroy()
    }

    override fun onBind(intent: Intent?): IBinder? = null

    private fun buildNotification(): Notification {
        return NotificationCompat.Builder(this, "location_channel")
            .setContentTitle("Rekory Attendance")
            .setContentText("Tracking work location")
            .setSmallIcon(R.mipmap.ic_launcher)
            .setOngoing(true)
            .setPriority(NotificationCompat.PRIORITY_LOW)
            .build()
    }

    private fun createNotificationChannel() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            val channel = NotificationChannel(
                "location_channel",
                "Location Tracking",
                NotificationManager.IMPORTANCE_LOW
            )
            getSystemService(NotificationManager::class.java)
                .createNotificationChannel(channel)
        }
    }
}
