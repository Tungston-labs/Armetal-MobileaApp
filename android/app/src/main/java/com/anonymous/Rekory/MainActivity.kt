package com.anonymous.Rekory

import android.content.Intent
import android.os.Build
import android.os.Bundle
import android.util.Log
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


private fun handleIntent(intent: Intent?) {
    Log.d("MainActivity", "handleIntent → ${intent?.action}")

    when (intent?.action) {
        ACTION_VERIFY_LOCATION -> {
            Log.d("MainActivity", "Verify Location clicked → Reloading")
            emitReloadEventWhenReady()
        }
    }
}


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
    Log.d("MainActivity", " Emitting FORCE_APP_RELOAD to JS")
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
