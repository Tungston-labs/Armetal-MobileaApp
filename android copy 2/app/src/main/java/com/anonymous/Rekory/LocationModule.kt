package com.anonymous.Rekory

import android.content.Intent
import android.os.Build
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

class LocationModule(private val context: ReactApplicationContext) :
  ReactContextBaseJavaModule(context) {

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
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
      context.startForegroundService(intent)
    } else {
      context.startService(intent)
    }
  }

  @ReactMethod
  fun stopService() {
    val intent = Intent(context, LocationService::class.java)
    context.stopService(intent)
  }
  @ReactMethod
  fun startHourlyNotification() {
    HourlyAlarmScheduler.start(context)
}

@ReactMethod
fun stopHourlyNotification() {
    HourlyAlarmScheduler.stop(context)
}
}

