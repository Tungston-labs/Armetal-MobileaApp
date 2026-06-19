import React, { useRef, useEffect } from "react";
import { View, Text, Image, Animated, Easing, StyleSheet, Dimensions } from "react-native";

const PunchLoader = ({ text }) => {
  const rotateValue = useRef(new Animated.Value(0)).current;

  const spin = rotateValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  useEffect(() => {
    rotateValue.setValue(0);
    const loop = Animated.loop(
      Animated.timing(rotateValue, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );
    loop.start();
    return () => loop.stop();
  }, []);

  return (
    <View style={styles.loaderOverlay}>
      <View style={styles.logoWrapper}>
        {/* Static Logo */}
        <Image
          source={require("../../assets/images/logo.png")}
          style={styles.logoImage}
          resizeMode="contain"
        />

        {/* Rotating Circle */}
        <Animated.View
          style={[styles.rotatingCircle, { transform: [{ rotate: spin }] }]}
        />
      </View>
      <Text style={styles.loaderText}>{text}</Text>
    </View>
  );
};

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  loaderOverlay: {
    position: "absolute",      // overlay
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width,
    height,
backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 999,            
  },
  
  logoWrapper: {
    width: 100,
    height: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  logoImage: {
    width: 30,
    height: 30,
    position: "absolute",
    zIndex: 2,
  },
  rotatingCircle: {
    width: 60,
    height: 60,
    borderWidth: 3,
    borderRadius: 60,
    borderLeftColor: "#fff",
    borderTopColor: "#d3d3d3",
    borderRightColor: "transparent",
    borderBottomColor: "transparent",
    position: "absolute",
  },
  loaderText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginTop: 20,
  },
});

export default PunchLoader;
