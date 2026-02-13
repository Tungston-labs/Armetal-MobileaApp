package com.anonymous.Rekory

import android.content.Intent
import android.os.Build
import android.os.Bundle
import android.util.Log
import androidx.core.app.NotificationManagerCompat
import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.ReactInstanceManager
import com.facebook.react.bridge.ReactContext
import com.facebook.react.defaults.DefaultReactActivityDelegate
import com.facebook.react.modules.core.DeviceEventManagerModule
import expo.modules.ReactActivityDelegateWrapper
import expo.modules.splashscreen.SplashScreenManager

class MainActivity : ReactActivity() {

    companion object {
        const val ACTION_VERIFY_LOCATION = "ACTION_VERIFY_LOCATION"
        const val ACTION_NOTIFICATION_CLICK = "ACTION_NOTIFICATION_CLICK"
        const val HOURLY_NOTIFICATION_ID = 1001
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        SplashScreenManager.registerOnActivity(this)
        super.onCreate(null)
        handleIntent(intent)
    }

    override fun onNewIntent(intent: Intent) {
        super.onNewIntent(intent)
        setIntent(intent)
        handleIntent(intent)
    }

    // 🔹 Centralized intent handling
    private fun handleIntent(intent: Intent?) {
        Log.d("MainActivity", "handleIntent → ${intent?.action}")

        when (intent?.action) {
            ACTION_VERIFY_LOCATION,
            ACTION_NOTIFICATION_CLICK -> {
                Log.d("MainActivity", "Notification interaction → Reloading app")
                clearHourlyNotification()
                scheduleNextHourlyAlarm()
                emitReloadEventWhenReady()
            }
        }
    }

    // 🔹 Close the notification manually
    private fun clearHourlyNotification() {
        NotificationManagerCompat.from(this)
            .cancel(HOURLY_NOTIFICATION_ID)
    }

    // 🔹 Schedule next alarm after interaction
    private fun scheduleNextHourlyAlarm() {
        HourlyAlarmScheduler.start(this)
    }

    // 🔹 Ensure React context is ready before emitting
    private fun emitReloadEventWhenReady() {
        val manager: ReactInstanceManager = reactInstanceManager
        val context = manager.currentReactContext

        if (context != null) {
            emitReload(context)
            return
        }

        manager.addReactInstanceEventListener(
            object : ReactInstanceManager.ReactInstanceEventListener {
                override fun onReactContextInitialized(context: ReactContext) {
                    emitReload(context)
                    manager.removeReactInstanceEventListener(this)
                }
            }
        )
    }

    private fun emitReload(context: ReactContext) {
        Log.d("MainActivity", "Emitting FORCE_APP_RELOAD to JS")
        context
            .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
            .emit("FORCE_APP_RELOAD", null)
    }

    override fun getMainComponentName(): String = "main"

    override fun createReactActivityDelegate(): ReactActivityDelegate {
        return ReactActivityDelegateWrapper(
            this,
            BuildConfig.IS_NEW_ARCHITECTURE_ENABLED,
            DefaultReactActivityDelegate(
                this,
                mainComponentName,
                BuildConfig.IS_NEW_ARCHITECTURE_ENABLED
            )
        )
    }

    override fun invokeDefaultOnBackPressed() {
        if (Build.VERSION.SDK_INT <= Build.VERSION_CODES.R) {
            if (!moveTaskToBack(false)) {
                super.invokeDefaultOnBackPressed()
            }
            return
        }
        super.invokeDefaultOnBackPressed()
    }
}
