class LocationReceiver : BroadcastReceiver() {


override fun onReceive(context: Context, intent: Intent) {
    if (LocationResult.hasResult(intent)) {
        val location = LocationResult.extractResult(intent)?.lastLocation ?: return

        val serviceIntent = Intent(context, LocationUploadService::class.java)
        serviceIntent.putExtra("lat", location.latitude)
        serviceIntent.putExtra("lng", location.longitude)

        ContextCompat.startForegroundService(context, serviceIntent)
    }
}

    private fun sendLocation(context: Context, location: Location) {
        val prefs = context.getSharedPreferences("rekory", Context.MODE_PRIVATE)

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

        OkHttpClient().newCall(request).enqueue(object : Callback {
            override fun onFailure(call: Call, e: IOException) {}
            override fun onResponse(call: Call, response: Response) {
                response.close()
            }
        })
    }
}
