import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation, useRoute } from "@react-navigation/native";
import styles from "./styles";
import BottomNavbar from "../BottomNavbar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export default function RequestApprovedScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { leaveId } = route.params;

  const [leave, setLeave] = useState(null);
  const [profile, setProfile] = useState(null); // 👈 Profile data
  const [loading, setLoading] = useState(true);
  const API_BASE_URL = 'http://178.248.112.16:8000';


  // Fetch leave details
  useEffect(() => {
    const fetchLeaveDetail = async () => {
      try {
        const token = await AsyncStorage.getItem("accessToken");
        const response = await axios.get(
          `http://178.248.112.16:8000/api/leave/emp/${leaveId}/`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setLeave(response.data);
      } catch (error) {
        console.error("Error fetching leave detail:", error);
        Alert.alert("Error", "Could not fetch leave details.");
      } finally {
        setLoading(false);
      }
    };

    fetchLeaveDetail();
  }, [leaveId]);

  // Fetch employee profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = await AsyncStorage.getItem("accessToken");
        const response = await axios.get(
          `http://178.248.112.16:8000/api/profile/`, // 👈 Update URL if needed
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setProfile(response.data);
      } catch (error) {
        console.error("Error fetching profile:", error);
        Alert.alert("Error", "Could not fetch profile.");
      }
    };

    fetchProfile();
  }, []);

  if (loading || !leave) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#000" style={{ marginTop: 40 }} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <View style={styles.headerLeft}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name="arrow-back" size={24} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Request detail</Text>
          </View>

          <TouchableOpacity onPress={() => navigation.navigate("ProfileScreen")}>
            <Image
  source={{
    uri: profile?.profile_pic
      ? `${API_BASE_URL}${profile.profile_pic}`
      : "https://i.pravatar.cc/40",
  }}
  style={styles.avatar}
/>

          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.separator} />

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.card}>
          {/* Status Badge */}
          <View style={styles.statusBadge}>
            <Text style={styles.statusText}>Approved</Text>
          </View>

          {/* From / To / Time */}
          <View style={styles.row}>
            <View style={styles.column}>
              <Text style={styles.label}>From</Text>
              <Text style={styles.value}>{leave.from_date}</Text>
            </View>
            <View style={styles.column}>
              <Text style={styles.label}>To</Text>
              <Text style={styles.value}>{leave.to_date}</Text>
            </View>
            <View style={styles.column}>
              <Text style={styles.label}>Time</Text>
              <Text style={styles.value}>11:30 AM</Text>
            </View>
          </View>

          {/* Leave Type */}
          <View style={styles.section}>
            <Text style={styles.label}>Leave Type</Text>
            <Text style={styles.value}>{leave.leave_type}</Text>
          </View>

          {/* Reason */}
          <View style={styles.section}>
            <Text style={styles.label}>Reason</Text>
            <Text style={styles.value}>{leave.reason}</Text>
          </View>
        </View>
      </ScrollView>

      <BottomNavbar navigation={navigation} route={route} />
    </View>
  );
}
