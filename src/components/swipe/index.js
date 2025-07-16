// import React from 'react';
// import { I18nManager, StyleSheet, Text, View } from 'react-native';
// import {
//   GestureHandlerRootView,
//   PanGestureHandler,
// } from 'react-native-gesture-handler';
// import Animated, {
//   runOnJS,
//   useAnimatedGestureHandler,
//   useAnimatedStyle,
//   useSharedValue,
//   withSpring,
// } from 'react-native-reanimated';
// import Ionicons from 'react-native-vector-icons/Ionicons';

// const SwipeButton = ({
//   width = 300,
//   height = 60,
//   title = 'Swipe to punch in',
//   successTitle = 'Punched In!',
//   onSwipeSuccess,
//   backgroundColor = '#e3e9ed',
//   thumbColor = '#182040',
//   borderRadius = height / 2,
//   textColor = '#000',
//   fontSize = 18,
//   icon,
//   resetAfterSuccess = true,
// }) => {
//   const swipeThreshold = width - height;
//   const translateX = useSharedValue(0);
//   const isSwiped = useSharedValue(false);

//   const gestureHandler = useAnimatedGestureHandler({
//     onActive: (event) => {
//       const translation = I18nManager.isRTL ? -event.translationX : event.translationX;
//       translateX.value = Math.min(Math.max(0, translation), swipeThreshold);
//     },
//     onEnd: () => {
//       if (translateX.value > swipeThreshold * 0.7) {
//         translateX.value = withSpring(swipeThreshold);
//         isSwiped.value = true;
//         runOnJS(onSwipeSuccess)();
//         if (resetAfterSuccess) {
//           setTimeout(() => {
//             translateX.value = withSpring(0);
//             isSwiped.value = false;
//           }, 1500);
//         }
//       } else {
//         translateX.value = withSpring(0);
//       }
//     },
//   });

//   const animatedThumbStyle = useAnimatedStyle(() => ({
//     transform: [{ translateX: translateX.value }],
//   }));

//   return (
//     <GestureHandlerRootView>
//       <View
//         style={[
//           styles.container,
//           { width, height, backgroundColor, borderRadius },
//         ]}
//       >
//         <Text style={[styles.label, { color: textColor, fontSize }]}>
//           {isSwiped.value ? successTitle : title}
//         </Text>

//         <PanGestureHandler onGestureEvent={gestureHandler}>
//           <Animated.View
//             style={[
//               styles.thumb,
//               {
//                 width: height,
//                 height: height,
//                 borderRadius: height / 2,
//                 backgroundColor: thumbColor,
//               },
//               animatedThumbStyle,
//             ]}
//           >
//             {icon ? (
//               icon
//             ) : (
//               <Ionicons name="chevron-forward" size={28} color="#ffffff" />
//             )}
//           </Animated.View>
//         </PanGestureHandler>
//       </View>
//     </GestureHandlerRootView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     justifyContent: 'center',
//     backgroundColor: 'red', // Light gray track color
//     overflow: 'hidden',
//     alignSelf: 'center',
//   },
//   label: {
//     position: 'absolute',
//     left: '30%',
//     fontWeight: 'bold',
//   },
//   thumb: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     position: 'absolute',
//     zIndex: 10,
//   },
// });

// export default SwipeButton;

import React from 'react';
import { I18nManager, StyleSheet, Text, View } from 'react-native';
import {
  GestureHandlerRootView,
  GestureDetector,
  Gesture,
} from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  cancelAnimation,
} from 'react-native-reanimated';
import Ionicons from 'react-native-vector-icons/Ionicons';

const SwipeButton = ({
  width = 300,
  height = 60,
  title = 'Swipe to punch in',
  successTitle = 'Punched In!',
  onSwipeSuccess,
  backgroundColor = '#e3e9ed',
  thumbColor = '#182040',
  borderRadius = height / 2,
  textColor = '#000',
  fontSize = 18,
  icon,
  resetAfterSuccess = true,
}) => {
  const swipeThreshold = width - height;
  const translateX = useSharedValue(0);
  const isSwiped = useSharedValue(false);

  const panGesture = Gesture.Pan()
    .onUpdate((event) => {
      const translation = I18nManager.isRTL ? -event.translationX : event.translationX;
      translateX.value = Math.min(Math.max(0, translation), swipeThreshold);
    })
    .onEnd((event) => {
      const shouldSwipe = translateX.value + event.velocityX * 0.1 > swipeThreshold * 0.7;

      if (shouldSwipe && !isSwiped.value) {
        isSwiped.value = true;
        translateX.value = withSpring(swipeThreshold, {
          damping: 15,
          stiffness: 200,
        });

        runOnJS(safeSwipeSuccess)(onSwipeSuccess);

        if (resetAfterSuccess) {
          setTimeout(() => {
            cancelAnimation(translateX);
            translateX.value = withSpring(0);
            isSwiped.value = false;
          }, 1500);
        }
      } else {
        translateX.value = withSpring(0, {
          damping: 15,
          stiffness: 200,
        });
      }
    });

  const animatedThumbStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  function safeSwipeSuccess(callback) {
    try {
      callback?.();
    } catch (e) {
      console.warn('Swipe success failed:', e.message);
    }
  }

  return (
    <GestureHandlerRootView>
      <View
        style={[
          styles.container,
          { width, height, backgroundColor, borderRadius },
        ]}
      >
        <Text style={[styles.label, { color: textColor, fontSize }]}>
          {isSwiped.value ? successTitle : title}
        </Text>

        <GestureDetector gesture={panGesture}>
          <Animated.View
            style={[
              styles.thumb,
              {
                width: height,
                height: height,
                borderRadius: height / 2,
                backgroundColor: thumbColor,
              },
              animatedThumbStyle,
            ]}
          >
            {icon ? (
              icon
            ) : (
              <Ionicons name="chevron-forward" size={28} color="#ffffff" />
            )}
          </Animated.View>
        </GestureDetector>
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    backgroundColor: 'red',
    overflow: 'hidden',
    alignSelf: 'center',
  },
  label: {
    position: 'absolute',
    left: '30%',
    fontWeight: 'bold',
  },
  thumb: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    zIndex: 10,
  },
});

export default SwipeButton;
