import Foundation
import CoreLocation
import React

@objc(LocationManager)
class LocationManager: RCTEventEmitter, CLLocationManagerDelegate {

  private var locationManager: CLLocationManager?
  private var hasListeners = false

  override init() {
    super.init()
    self.locationManager = CLLocationManager()
    self.locationManager?.delegate = self
    self.locationManager?.allowsBackgroundLocationUpdates = true
    self.locationManager?.pausesLocationUpdatesAutomatically = false
  }

  // MARK: - React Native
  override static func requiresMainQueueSetup() -> Bool {
    return true
  }

  override func supportedEvents() -> [String]! {
    return ["LOCATION_UPDATE"]
  }

  override func startObserving() {
    hasListeners = true
  }

  override func stopObserving() {
    hasListeners = false
  }

  // MARK: - Exposed Methods
  @objc
  func startTracking() {
    locationManager?.requestAlwaysAuthorization()
    locationManager?.startUpdatingLocation()
  }

  @objc
  func stopTracking() {
    locationManager?.stopUpdatingLocation()
  }

  // MARK: - CLLocation Delegate
  func locationManager(
    _ manager: CLLocationManager,
    didUpdateLocations locations: [CLLocation]
  ) {
    guard hasListeners, let location = locations.last else { return }

    sendEvent(withName: "LOCATION_UPDATE", body: [
      "latitude": location.coordinate.latitude,
      "longitude": location.coordinate.longitude,
      "timestamp": location.timestamp.timeIntervalSince1970
    ])
  }

  func locationManager(
    _ manager: CLLocationManager,
    didFailWithError error: Error
  ) {
    print("❌ Location error:", error.localizedDescription)
  }
}
