package com.anonymous.Rekory

import android.content.Intent
import com.facebook.react.bridge.*

class LocationModule(private val context: ReactApplicationContext)
    : ReactContextBaseJavaModule(context) {

    override fun getName() = "LocationModule"

    @ReactMethod
    fun startService(employeeId: String, sessionId: String, token: String) {
        val prefs = context.getSharedPreferences("rekory", 0)
        prefs.edit()
            .putString("employeeId", employeeId)
            .putString("sessionId", sessionId)
            .putString("token", token)
            .apply()

        val intent = Intent(context, LocationService::class.java)
        context.startForegroundService(intent)
    }

    @ReactMethod
    fun stopService() {
        val intent = Intent(context, LocationService::class.java)
        context.stopService(intent)
    }
}
