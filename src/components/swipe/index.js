import React, { useState, useCallback } from 'react';
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
  width ="100%",
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
  const [swiped, setSwiped] = useState(false);

  const handleSwipeSuccess = useCallback(() => {
    setSwiped(true);
    onSwipeSuccess?.();

    if (resetAfterSuccess) {
      setTimeout(() => {
        translateX.value = withSpring(0);
        runOnJS(setSwiped)(false);
      }, 1500);
    }
  }, [onSwipeSuccess, resetAfterSuccess]);

  const panGesture = Gesture.Pan()
    .onUpdate((event) => {
      const translation = I18nManager.isRTL ? -event.translationX : event.translationX;
      translateX.value = Math.min(Math.max(0, translation), swipeThreshold);
    })
    .onEnd((event) => {
      const shouldSwipe = translateX.value + event.velocityX * 0.1 > swipeThreshold * 0.7;

      if (shouldSwipe && !swiped) {
        translateX.value = withSpring(swipeThreshold);
        runOnJS(handleSwipeSuccess)(); // ✅ This is now 100% safe
      } else {
        translateX.value = withSpring(0);
      }
    });

  const animatedThumbStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <GestureHandlerRootView>
      <View
        style={[
          styles.container,
          { width, height, backgroundColor, borderRadius },
        ]}
      >
        <Text style={[styles.label, { color: textColor, fontSize }]}>
          {swiped ? successTitle : title}
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
    overflow: 'hidden',
    alignSelf: 'center',
    marginVertical: 20,
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
