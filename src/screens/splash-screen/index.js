import React, { useEffect } from "react";
import { View, Image, SafeAreaView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import styles from "./styles";

const SplashScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace("LoginScreen"); 
    }, 2000);

    return () => clearTimeout(timer); // cleanup
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require("../../assets/images/armetal_logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>
    </SafeAreaView>
  );
};

export default SplashScreen;
