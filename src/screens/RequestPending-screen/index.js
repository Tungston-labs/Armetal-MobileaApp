import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "./styles";
import BottomNavbar from "../BottomNavbar";
import Toast from "react-native-toast-message";
import authAxios from "../../utils/authAxios";
import ConfirmationModal from "../../components/ConfirmationModal";
import useRefreshOnReconnect from "../../hooks/useRefreshOnReconnect";

export default function RequestPending({ navigation, route }) {
  const { leaveId } = route.params;
  const [leave, setLeave] = useState(null);
  const [loading, setLoading] = useState(true);
  const [canceling, setCanceling] = useState(false);
  const [profile, setProfile] = useState(null);
  const [confirmCancelVisible, setConfirmCancelVisible] = useState(false);

  const BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL;

  const formatTime = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true, 
    });
  };


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

  useEffect(() => {
    fetchProfile();
  }, []);

  useEffect(() => {
    fetchLeaveDetail();
  }, [leaveId]);

  useRefreshOnReconnect(async () => {
    await Promise.all([
      fetchProfile(),
      fetchLeaveDetail(),
    ]);
  });


  const cancelLeave = () => {
    setConfirmCancelVisible(true);
  };

  const confirmCancelLeave = async () => {
    setConfirmCancelVisible(false);

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
                ? `${BASE_URL}${profile.profile_pic}`
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
                                        <Text style={styles.value}>{leave.from_date_type}</Text>
              
            </View>
            <View style={styles.column}>
              <Text style={styles.label}>To</Text>
              <Text style={styles.value}>{leave.to_date}</Text>
                                        <Text style={styles.value}>{leave.to_date_type}</Text>
              
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

      <ConfirmationModal
        visible={confirmCancelVisible}
        title="Confirm"
        message="Are you sure you want to cancel this leave?"
        confirmText="Yes"
        cancelText="No"
        onConfirm={confirmCancelLeave}
        onCancel={() => setConfirmCancelVisible(false)}
      />

      {/* <BottomNavbar navigation={navigation} route={route} /> */}
    </SafeAreaView>
  );
}
