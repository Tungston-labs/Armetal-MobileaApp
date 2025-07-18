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
import authAxios from "../../utils/authAxios"; // ✅ import updated instance

export default function RequestApprovedScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { leaveId } = route.params;

  const [leave, setLeave] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaveDetail = async () => {
      try {
        const response = await authAxios.get(`/leave/emp/${leaveId}/`);
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
              source={{ uri: "https://i.pravatar.cc/40" }}
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
              <Text style={styles.value}>11:30 AM</Text> {/* optional static */}
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
