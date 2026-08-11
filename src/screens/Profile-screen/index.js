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
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/src/redux/features/authSlice";
import { buildAuthenticatedImageSource } from "../../utils/mediaSource";
import Toast from "react-native-toast-message";
import ConfirmationModal from "../../components/ConfirmationModal";
import useRefreshOnReconnect from "../../hooks/useRefreshOnReconnect";

const defaultAvatar = "https://cdn-icons-png.flaticon.com/512/149/149071.png";

const ProfileScreen = () => {
  const navigation = useNavigation();
  const [employee, setEmployee] = useState(null);
  const mediaToken = useSelector((state) => state.auth.accessToken);
  const [profileImageFailed, setProfileImageFailed] = useState(false);
  const [logoutConfirmVisible, setLogoutConfirmVisible] = useState(false);
  const dispatch = useDispatch();

  const fetchProfile = async () => {
    try {
      const response = await authAxios.get("/profile/");

      setEmployee(response.data);
      setProfileImageFailed(false);
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

  const profileImage = buildAuthenticatedImageSource({
    path: profileImageFailed ? null : employee?.profile_pic,
    token: mediaToken,
    fallbackUri: defaultAvatar,
  });

  const confirmLogout = async () => {
    setLogoutConfirmVisible(false);
    await AsyncStorage.removeItem("accessToken");
    await AsyncStorage.removeItem("refreshToken");
    dispatch(logout());
  };

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
          onPress={() => setLogoutConfirmVisible(true)}
        >
          <Ionicons name="log-out-outline" size={22} color="#ccc" />
          <Text style={styles.optionText}>Log out</Text>
        </TouchableOpacity>

      </View>

      <ConfirmationModal
        visible={logoutConfirmVisible}
        title="Confirm Logout"
        message="Are you sure you want to log out?"
        confirmText="Yes"
        cancelText="Cancel"
        iconName="log-out-outline"
        onConfirm={confirmLogout}
        onCancel={() => setLogoutConfirmVisible(false)}
      />
    </SafeAreaView>
  );
};

export default ProfileScreen;
