package com.anonymous.Rekory

import android.app.Notification
import android.app.NotificationChannel
import android.app.NotificationManager
import android.app.Service
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

    companion object {
        const val CHANNEL_ID = "location_service"
        const val ACTION_REFRESH = "REFRESH_LOCATION"
    }

    override fun onCreate() {
        super.onCreate()

        fusedClient = LocationServices.getFusedLocationProviderClient(this)
        createNotificationChannel()
        startForeground(101, buildNotification())
    }

    override fun onStartCommand(intent: Intent?, flags: Int, startId: Int): Int {

        // 🔥 IMMEDIATE REFRESH WHEN APP OPENS
        if (intent?.action == ACTION_REFRESH) {
            fetchImmediateLocation()
        }

        if (!updatesStarted) {
            startLocationUpdates()
        }

        return START_STICKY
    }

    private fun startLocationUpdates() {
        if (updatesStarted) return

        val request = LocationRequest.Builder(
            Priority.PRIORITY_HIGH_ACCURACY,
            60 * 60 * 1000L // 1 hour
        )
            .setMinUpdateIntervalMillis(5 * 60 * 1000L)
            .setMaxUpdateDelayMillis(0)
            .build()

        locationCallback = object : LocationCallback() {
            override fun onLocationResult(result: LocationResult) {
                result.lastLocation?.let {
                    uploadLocation(it.latitude, it.longitude)
                }
            }
        }

        fusedClient.requestLocationUpdates(
            request,
            locationCallback,
            mainLooper
        )

        updatesStarted = true
    }

    private fun fetchImmediateLocation() {
        fusedClient.getCurrentLocation(
            Priority.PRIORITY_HIGH_ACCURACY,
            null
        ).addOnSuccessListener { location ->
            location?.let {
                uploadLocation(it.latitude, it.longitude)
            }
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
            override fun onFailure(call: Call, e: IOException) {}
            override fun onResponse(call: Call, response: Response) {
                response.close()
            }
        })
    }

    override fun onDestroy() {
        if (::locationCallback.isInitialized) {
            fusedClient.removeLocationUpdates(locationCallback)
        }
        updatesStarted = false
        super.onDestroy()
    }

    override fun onBind(intent: Intent?): IBinder? = null

    private fun buildNotification(): Notification {
        return NotificationCompat.Builder(this, CHANNEL_ID)
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
                CHANNEL_ID,
                "Location Tracking",
                NotificationManager.IMPORTANCE_LOW
            )
            getSystemService(NotificationManager::class.java)
                .createNotificationChannel(channel)
        }
    }
}

