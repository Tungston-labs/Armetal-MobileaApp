import React, { useEffect } from "react";
import { View, Image, SafeAreaView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux"; 
import styles from "./styles";

const SplashScreen = () => {
  const navigation = useNavigation();
  const { accessToken } = useSelector((state) => state.auth); 

  useEffect(() => {
    const timer = setTimeout(() => {
      if (accessToken) {
        navigation.replace("PunchinScreen"); 
      } else {
        navigation.replace("LoginScreen"); 
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigation, accessToken]);

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
