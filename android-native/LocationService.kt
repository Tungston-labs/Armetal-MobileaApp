package com.anonymous.Rekory

import android.app.*
import android.content.Intent
import android.os.Build
import android.os.IBinder
import android.util.Log
import androidx.core.app.NotificationCompat
import com.google.android.gms.location.*
import okhttp3.*
import okhttp3.MediaType.Companion.toMediaType
import okhttp3.RequestBody.Companion.toRequestBody
import org.json.JSONObject
import java.io.IOException

class LocationService : Service() {

    private lateinit var fusedClient: FusedLocationProviderClient
    private lateinit var locationCallback: LocationCallback
    private val client = OkHttpClient()
    private var updatesStarted = false

    override fun onCreate() {
        super.onCreate()

        fusedClient = LocationServices.getFusedLocationProviderClient(this)

        createNotificationChannel()
        startForeground(1, buildNotification())

        startLocationUpdates()
    }

    override fun onStartCommand(intent: Intent?, flags: Int, startId: Int): Int {
        // If killed, system will restart service.
        // If restarted and updates got dropped, start them again.
        if (!updatesStarted) {
            startLocationUpdates()
        }
        return START_STICKY
    }

    private fun startLocationUpdates() {
        if (updatesStarted) return

        // Samsung/Doze can heavily throttle "balanced" background updates.
        // A foreground service should request a higher priority to remain reliable.
        val request = LocationRequest.Builder(
            Priority.PRIORITY_HIGH_ACCURACY,
            60_000L // target: 1 minute
        )
            .setMinUpdateIntervalMillis(30_000L)
            .setMaxUpdateDelayMillis(0L) // avoid batching delays in background
            .build()

        locationCallback = object : LocationCallback() {
            override fun onLocationResult(result: LocationResult) {
                val location = result.lastLocation ?: return
                uploadLocation(location.latitude, location.longitude)
            }
        }

        try {
            fusedClient.requestLocationUpdates(
                request,
                locationCallback,
                mainLooper
            )
            updatesStarted = true
            Log.i("LocationService", "Location updates started")
        } catch (t: Throwable) {
            Log.e("LocationService", "requestLocationUpdates failed", t)
        }
    }

    private fun uploadLocation(lat: Double, lng: Double) {
        val prefs = getSharedPreferences("rekory", MODE_PRIVATE)

        val employeeId = prefs.getString("employeeId", null) ?: return
        val sessionId = prefs.getString("sessionId", null) ?: return
        val token = prefs.getString("token", null) ?: return

        val json = JSONObject().apply {
            put("session_id", sessionId)
            put("latitude", lat)
            put("longitude", lng)
        }.toString()

        val body = json.toRequestBody("application/json".toMediaType())

        val request = Request.Builder()
            .url("https://api.rekory.com/api/background-location/$employeeId/")
            .addHeader("Authorization", "Bearer $token")
            .post(body)
            .build()

        client.newCall(request).enqueue(object : Callback {
            override fun onFailure(call: Call, e: IOException) {
                Log.e("LocationService", "Upload failed: ${e.message}", e)
            }
            override fun onResponse(call: Call, response: Response) {
                if (!response.isSuccessful) {
                    Log.w("LocationService", "Upload non-2xx: ${response.code}")
                }
                response.close()
            }
        })
    }

    override fun onDestroy() {
        try {
            if (::locationCallback.isInitialized) {
                fusedClient.removeLocationUpdates(locationCallback)
            }
        } catch (t: Throwable) {
            Log.e("LocationService", "removeLocationUpdates failed", t)
        } finally {
            updatesStarted = false
        }
        super.onDestroy()
    }

    override fun onBind(intent: Intent?): IBinder? = null

    private fun buildNotification(): Notification {
        return NotificationCompat.Builder(this, "location_channel")
            .setContentTitle("Rekory Attendance")
            .setContentText("Tracking work location in background")
            .setSmallIcon(R.mipmap.ic_launcher)
            .setOngoing(true)
            .setCategory(NotificationCompat.CATEGORY_SERVICE)
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
