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
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function RequestPending({ navigation, route }) {
  const { leaveId } = route.params;
  const [leave, setLeave] = useState(null);
  const [loading, setLoading] = useState(true);
  const [canceling, setCanceling] = useState(false);

  useEffect(() => {
    const fetchLeaveDetail = async () => {
      try {
        const token = await AsyncStorage.getItem("accessToken");
        const res = await axios.get(
          `http://178.248.112.16:8000/api/leave/emp/${leaveId}/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setLeave(res.data);
      } catch (error) {
        console.error("Failed to fetch leave details", error);
        Alert.alert("Error", "Could not load leave details.");
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
          const token = await AsyncStorage.getItem("accessToken");

          const response = await axios.delete(
            `http://192.168.29.146:8000/api/leave/${leaveId}/cancel/`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (response.status === 204) {
            Alert.alert("Cancelled", "Leave request cancelled successfully.");
            navigation.goBack();
          } else {
            Alert.alert("Error", "Could not cancel the leave request.");
          }
        } catch (error) {
          console.error("Cancel failed:", error);
          Alert.alert("Error", "An error occurred while cancelling the request.");
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
          <Image source={{ uri: "https://i.pravatar.cc/150" }} style={styles.avatar} />
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
            <Text style={styles.statusText}>{leave.status}</Text>
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
              <Text style={styles.value}>11:30 AM</Text>
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
