import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "./styles";
import BottomNavbar from "../BottomNavbar";
// import axios from "axios";
// import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import authAxios from "../../utils/authAxios";

export default function RequestPending({ navigation, route }) {
  const { leaveId } = route.params;
  const [leave, setLeave] = useState(null);
  const [loading, setLoading] = useState(true);
  const [canceling, setCanceling] = useState(false);
  const [profile, setProfile] = useState(null);

  const API_BASE_URL = 'http://178.248.112.16:8000';

  const formatTime = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true, // set to false if you prefer 24-hour format
    });
  };


  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await authAxios.get(`/profile/`);
        setProfile(response.data);
      } catch (error) {
        console.error("Error fetching profile:", error);
        Toast.show({
          type: 'error',
          text1: 'Profile Error',
          text2: 'Could not fetch profile.',
        });
      }
    };

    fetchProfile();
  }, []);


  useEffect(() => {
    const fetchLeaveDetail = async () => {
      try {
        const res = await authAxios.get(`/leave/emp/${leaveId}/`);
        setLeave(res.data);
      } catch (error) {
        console.error("Failed to fetch leave details", error);
        Toast.show({
          type: 'error',
          text1: 'Leave Error',
          text2: 'Could not load leave details.',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchLeaveDetail();
  }, [leaveId]);


  const cancelLeave = async () => {
    Alert.alert("Confirm", "Are you sure you want to cancel this leave?", [
      { text: "No" },
      {
        text: "Yes",
        onPress: async () => {
          try {
            setCanceling(true);

            const response = await authAxios.delete(`/leave/${leaveId}/cancel/`);

            if (response.status === 204) {
              Toast.show({
                type: 'success',
                text1: 'Leave Cancelled',
                text2: 'Leave request cancelled successfully.',
              });
              navigation.goBack();
            } else {
              Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'Could not cancel the leave request.',
              });
            }
          } catch (error) {
            console.error("Cancel failed:", error);
            Toast.show({
              type: 'error',
              text1: 'Error',
              text2: 'An error occurred while cancelling the request.',
            });
          } finally {
            setCanceling(false);
          }
        },
      },
    ]);
  };
  if (loading || !leave) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={{ textAlign: "center", marginTop: 30 }}>Loading leave details...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.topHeader}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Request Detail</Text>
        <TouchableOpacity onPress={() => navigation.navigate("ProfileScreen")}>
          <Image
            source={{
              uri: profile?.profile_pic
                ? `${API_BASE_URL}${profile.profile_pic}`
                : "https://cdn-icons-png.flaticon.com/512/149/149071.png",
            }}
            style={styles.avatar}
          />
        </TouchableOpacity>
      </View>

      {/* Content */}
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.card}>
          <View
            style={[
              styles.statusBadge,
              leave.status === "approved"
                ? styles.approvedBadge
                : leave.status === "rejected"
                  ? styles.rejectedBadge
                  : styles.pendingBadge,
            ]}
          >
            <Text style={styles.statusText}>{leave.status.charAt(0).toUpperCase() + leave.status.slice(1).toLowerCase()}
            </Text>
          </View>

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
              <Text style={styles.value}>{formatTime(leave.created_at)}</Text>


            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionLabel}>Leave Type</Text>
            <Text style={styles.sectionValue}>{leave.leave_type}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionLabel}>Reason</Text>
            <Text style={styles.reasonText}>{leave.reason}</Text>
          </View>
        </View>

        {/* Cancel button only if pending */}
        {leave.status === "pending" && (
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={cancelLeave}
            disabled={canceling}
          >
            <Text style={styles.cancelButtonText}>
              {canceling ? "Cancelling..." : "Cancel"}
            </Text>
          </TouchableOpacity>
        )}
      </ScrollView>

      <BottomNavbar navigation={navigation} route={route} />
    </SafeAreaView>
  );
}
