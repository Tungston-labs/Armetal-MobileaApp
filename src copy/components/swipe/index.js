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
} from 'react-native-reanimated';
import Ionicons from 'react-native-vector-icons/Ionicons';

const SwipeButton = ({
  width = 320,
  height = 55,
  title = 'Swipe to punch in',
  successTitle = 'Punched In',
  onSwipeSuccess,
  backgroundColor = '#e3e9ed',
  thumbColor = '#182040',
  borderRadius = 150,
  textColor = '#000',
  fontSize = 18,
  icon,
  resetAfterSuccess = true,
  leftSpacing = 5,
}) => {
  const swipeThreshold = width - height - leftSpacing; 
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
        runOnJS(handleSwipeSuccess)();
      } else {
        translateX.value = withSpring(0);
      }
    });

  const animatedThumbStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value + leftSpacing }],
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
                width: height - 10,
                height: height - 10,
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
    marginVertical: -35,
  },
  label: {
    position: 'absolute',
    left: '25%',
    fontFamily: 'Montserrat_700Bold',
    zIndex: 10,
  },
  thumb: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    zIndex: 5,
  },
});

export default SwipeButton;


