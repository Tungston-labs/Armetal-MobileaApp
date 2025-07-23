import  { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

export default function AuthLoadingScreen() {
  const navigation = useNavigation();

  useEffect(() => {
    const checkLogin = async () => {
      const token = await AsyncStorage.getItem("accessToken");
      if (token) {
        navigation.replace("PunchinScreen"); 
      } else {
        navigation.replace("LoginScreen");
      }
    };

    checkLogin();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  );
}
