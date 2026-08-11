import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import styles from "./styles";
import authAxios from "../../utils/authAxios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { logout } from "@/src/redux/features/authSlice";
import Toast from "react-native-toast-message";
import { showConfirmation } from "../../utils/toast";
import useRefreshOnReconnect from "../../hooks/useRefreshOnReconnect";

const defaultAvatar = "https://cdn-icons-png.flaticon.com/512/149/149071.png";
  const BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL;

const ProfileScreen = () => {
  const navigation = useNavigation();
  const [employee, setEmployee] = useState(null);
  const dispatch = useDispatch();

  const fetchProfile = async () => {
    try {
      const response = await authAxios.get("/profile/");
      setEmployee(response.data);
    } catch (error) {
      console.error("Error fetching profile:", error.message);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Failed to load profile",
      });
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  useRefreshOnReconnect(fetchProfile);

 const getProfileUri = (path) => {
  if (!path) return defaultAvatar;

  // Fix HTTP → HTTPS (iOS ATS issue)
  if (path.startsWith("http://")) {
    return path.replace("http://", "https://");
  }

  if (path.startsWith("https://")) return path;

  const normalizedPath = path.startsWith("/")
    ? path
    : `/media/${path}`;

  return `${BASE_URL}${normalizedPath}`;
};

  const profileImage = { uri: getProfileUri(employee?.profile_pic) };

  const confirmLogout = async () => {
    await AsyncStorage.removeItem("accessToken");
    await AsyncStorage.removeItem("refreshToken");
    dispatch(logout());
  };

  const requestLogout = () => {
    showConfirmation({
      title: "Confirm Logout",
      message: "Are you sure you want to log out?",
      confirmText: "Yes",
      cancelText: "Cancel",
      confirmColor: "#EF4444",
      onConfirm: confirmLogout,
    });
  };

  return (
    <View style={styles.container}>
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
          <Image source={profileImage} style={styles.profileImage} />
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
          onPress={requestLogout}
        >
          <Ionicons name="log-out-outline" size={22} color="#ccc" />
          <Text style={styles.optionText}>Log out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProfileScreen;
