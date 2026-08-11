import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import styles from "./styles";
import authAxios from "../../utils/authAxios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/src/redux/features/authSlice";
import { buildAuthenticatedImageSource } from "../../utils/mediaSource";

const defaultAvatar = "https://cdn-icons-png.flaticon.com/512/149/149071.png";

const ProfileScreen = () => {
  const navigation = useNavigation();
  const [employee, setEmployee] = useState(null);
  const mediaToken = useSelector((state) => state.auth.accessToken);
  const [profileImageFailed, setProfileImageFailed] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await authAxios.get("/profile/");

        setEmployee(response.data);
        setProfileImageFailed(false);
      } catch (error) {
        console.error("Error fetching profile:", error.message);
        Alert.alert("Error", "Failed to load profile");
      }
    };

    fetchProfile();
  }, []);

  const profileImage = buildAuthenticatedImageSource({
    path: profileImageFailed ? null : employee?.profile_pic,
    token: mediaToken,
    fallbackUri: defaultAvatar,
  });

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
      </View>

      {/* Content */}
      <View style={styles.content}>
        {/* Profile Image */}
        <View style={styles.profileSection}>
          <Image
            source={profileImage}
            style={styles.profileImage}
            onError={() => setProfileImageFailed(true)}
          />
        </View>

        {/* Options */}
        <TouchableOpacity
          style={styles.optionCard}
          onPress={() => navigation.navigate("SalarySlipScreen")}
        >
          <Ionicons
            name="reader"       // filled version
            size={25}
            color="#ccc"        // your desired fill color
            style={{ marginRight: 5 }}
          />
          <Text style={styles.optionText}>Salary slip</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.optionCard}
          onPress={() => navigation.navigate("DocumentsScreen")}
        >
          <Ionicons name="document-attach-outline" size={22} color="#ccc" />
          <Text style={styles.optionText}>Documents</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.optionCard}
          onPress={() => navigation.navigate("CreateNewPasswordScreen")}
        >
          <Ionicons name="key-outline" size={22} color="#ccc" />
          <Text style={styles.optionText}>Change Password</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.optionCard}
          onPress={() => {
            Alert.alert(
              "Confirm Logout",
              "Are you sure you want to log out?",
              [
                {
                  text: "Cancel",
                  style: "cancel",
                },
                {
                  text: "Yes",
                  onPress: async () => {
                    await AsyncStorage.removeItem("accessToken");
                    await AsyncStorage.removeItem("refreshToken");
                    dispatch(logout());
                  },
                },
              ],
              { cancelable: true }
            );
          }}
        >
          <Ionicons name="log-out-outline" size={22} color="#ccc" />
          <Text style={styles.optionText}>Log out</Text>
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;
