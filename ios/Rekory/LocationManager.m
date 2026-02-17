
import <React/RCTBridgeModule.h>
import <React/RCTEventEmitter.h>

@interface RCT_EXTERN_MODULE(LocationManager, RCTEventEmitter)

RCT_EXTERN_METHOD(startTracking)
RCT_EXTERN_METHOD(stopTracking)

@end
