package com.anonymous.Rekory

import android.app.NotificationChannel
import android.app.NotificationManager
import android.app.PendingIntent
import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import android.os.Build
import android.util.Log
import androidx.core.app.NotificationCompat
import androidx.core.app.NotificationManagerCompat
class HourlyReminderReceiver : BroadcastReceiver() {

    override fun onReceive(context: Context, intent: Intent) {
        Log.i("HourlyReminderReceiver", " Hourly alarm fired")

        val refreshIntent = Intent(context, LocationService::class.java).apply {
            action = LocationService.ACTION_REFRESH
        }

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            context.startForegroundService(refreshIntent)
        } else {
            context.startService(refreshIntent)
        }

        //  Notification channel
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            val channel = NotificationChannel(
                "rekory_hourly",
                "Hourly Attendance Reminder",
                NotificationManager.IMPORTANCE_HIGH
            )

            val manager =
                context.getSystemService(Context.NOTIFICATION_SERVICE) as NotificationManager

            manager.createNotificationChannel(channel)
        }

        //  Open app intent (NO CLEAR_TASK)
       val openAppIntent = Intent(context, MainActivity::class.java).apply {
    action = "ACTION_NOTIFICATION_CLICK" // Add this custom action
    flags = Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_CLEAR_TOP
}

        val pendingIntent = PendingIntent.getActivity(
            context,
            0,
            openAppIntent,
            PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_IMMUTABLE
        )
val actionIntent = Intent(context, MainActivity::class.java).apply {
    action = MainActivity.ACTION_VERIFY_LOCATION
    flags = Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_CLEAR_TOP
}


val actionPendingIntent = PendingIntent.getActivity(
    context,
    1,
    actionIntent,
    PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_IMMUTABLE
)

      val notification = NotificationCompat.Builder(context, "rekory_hourly")
    .setSmallIcon(R.mipmap.ic_launcher)
    .setContentTitle("Attendance Tracking")
    .setContentText("Tap to open app")
    .setContentIntent(pendingIntent) // main click
    .setAutoCancel(true)
    .setPriority(NotificationCompat.PRIORITY_HIGH)

    .addAction(
        R.mipmap.ic_launcher,   // icon (can be 0 if not needed)
        "Verify Location",      // button text
        actionPendingIntent
    )
    .build()


        NotificationManagerCompat.from(context).notify(1001, notification)

        HourlyAlarmScheduler.start(context)
    }
}

