package com.anonymous.Rekory

import android.app.AlarmManager
import android.app.PendingIntent
import android.content.Context
import android.content.Intent
import android.os.Build
import android.os.SystemClock
import android.util.Log
import android.provider.Settings

object HourlyAlarmScheduler {

    fun start(context: Context) {
        val alarmManager = context.getSystemService(Context.ALARM_SERVICE) as AlarmManager

        // 1. Check for Android 12+ Permission FIRST
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) {
            if (!alarmManager.canScheduleExactAlarms()) {
                Log.e("Rekory", "Permission denied: Cannot schedule exact alarms")
                val intent = Intent(Settings.ACTION_REQUEST_SCHEDULE_EXACT_ALARM).apply {
                    flags = Intent.FLAG_ACTIVITY_NEW_TASK
                }
                context.startActivity(intent)
                return 
            }
        }

        // 2. Define the Intent and PendingIntent BEFORE using them
        val intent = Intent(context, HourlyReminderReceiver::class.java)
        val pendingIntent = PendingIntent.getBroadcast(
            context,
            0,
            intent,
            PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_IMMUTABLE
        )

        // 3. Set the time (Current: 15 mins. For 1 hour use: 60 * 60 * 1000)
        val triggerTime = SystemClock.elapsedRealtime() + 15 * 60 * 1000

        // 4. Set the alarm based on OS version
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            alarmManager.setExactAndAllowWhileIdle(
                AlarmManager.ELAPSED_REALTIME_WAKEUP,
                triggerTime,
                pendingIntent
            )
        } else {
            alarmManager.setExact(
                AlarmManager.ELAPSED_REALTIME_WAKEUP,
                triggerTime,
                pendingIntent
            )
        }
        Log.i("Rekory", "Alarm scheduled successfully")
    }

    fun stop(context: Context) {
        Log.i("HourlyAlarmScheduler", "Stopping hourly alarm")
        val alarmManager = context.getSystemService(Context.ALARM_SERVICE) as AlarmManager
        val intent = Intent(context, HourlyReminderReceiver::class.java)
        val pendingIntent = PendingIntent.getBroadcast(
            context,
            0,
            intent,
            PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_IMMUTABLE
        )
        alarmManager.cancel(pendingIntent)
    }
}