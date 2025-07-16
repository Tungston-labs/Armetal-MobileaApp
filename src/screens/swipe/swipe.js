// import React, { useState } from 'react';
// import { Alert, StyleSheet, View } from 'react-native';
// import SwipeButton from '../../components/SwipeButton';

// export default function App() {
//   const [isPunchedIn, setIsPunchedIn] = useState(false);

//   const handleSwipe = () => {
//     const nextState = !isPunchedIn;
//     setIsPunchedIn(nextState);
//     Alert.alert('Success', nextState ? 'Punched In' : 'Punched Out');
//   };

//   return (
//     <View style={styles.container}>
//       <SwipeButton
//         title={isPunchedIn ? 'Swipe to Punch Out' : 'Swipe to Punch In'}
//         successTitle={isPunchedIn ? 'Punched Out!' : 'Punched In!'}
//         onSwipeSuccess={handleSwipe}
//         backgroundColor="#ddd"
//         thumbColor={isPunchedIn ? '#e53935' : '#43a047'}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'flex-end',
//     paddingBottom: 50,
//     alignItems: 'center',
//   },
// });



// swipeButton.js

// // components/SwipeButton.js

// import React from 'react';
// import { I18nManager, StyleSheet, Text, View } from 'react-native';
// import {
//     GestureHandlerRootView,
//     PanGestureHandler,
// } from 'react-native-gesture-handler';
// import Animated, {
//     runOnJS,
//     useAnimatedGestureHandler,
//     useAnimatedStyle,
//     useSharedValue,
//     withSpring,
// } from 'react-native-reanimated';

// const SwipeButton = ({
//   width = 300,
//   height = 60,
//   title = 'Swipe to Punch In',
//   successTitle = 'Punched In!',
//   onSwipeSuccess,
//   backgroundColor = '#eee',
//   thumbColor = '#4CAF50',
//   borderRadius = 30,
//   textColor = '#000',
//   fontSize = 16,
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
//                 height,
//                 borderRadius,
//                 backgroundColor: thumbColor,
//               },
//               animatedThumbStyle,
//             ]}
//           >
//             {icon ? icon : <Text style={styles.iconText}>👉</Text>}
//           </Animated.View>
//         </PanGestureHandler>
//       </View>
//     </GestureHandlerRootView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     justifyContent: 'center',
//     backgroundColor: '#ccc',
//     overflow: 'hidden',
//   },
//   label: {
//     position: 'absolute',
//     alignSelf: 'center',
//     fontWeight: '600',
//   },
//   thumb: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     position: 'absolute',
//     zIndex: 10,
//   },
//   iconText: {
//     color: 'white',
//     fontSize: 20,
//   },
// });

// export default SwipeButton;
