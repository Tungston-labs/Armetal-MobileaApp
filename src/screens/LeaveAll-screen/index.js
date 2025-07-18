import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "./styles";
import BottomNavbar from "../BottomNavbar";
import LeaveHeader from "../LeaveHeader-screen";
import authAxios from "../../utils/auth"; // ✅ Use your path

export default function LeaveAllScreen({ navigation, route }) {
  const [leaveData, setLeaveData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchLeaves = async () => {
    try {
      const response = await authAxios.get("leave/");
      setLeaveData(response.data.results || []); // assuming paginated response
    } catch (error) {
      console.error("Error fetching leaves:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  const handleStatusNavigation = (status) => {
    if (status === "approved") {
      navigation.navigate("RequestApprovedScreen");
    } else if (status === "rejected") {
      navigation.navigate("RequestRejected");
    } else if (status === "pending") {
      navigation.navigate("RequestPending");
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <TouchableOpacity
        style={[
          styles.statusBadge,
          styles[
            `status${item.status.charAt(0).toUpperCase() + item.status.slice(1)}`
          ],
        ]}
        onPress={() => handleStatusNavigation(item.status)}
      >
        <Text style={styles.statusText}>{item.status}</Text>
      </TouchableOpacity>

      <View style={styles.cardContent}>
        <View style={styles.row}>
          <Text style={styles.label}>From</Text>
          <Text style={styles.value}>{item.from_date}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>To</Text>
          <Text style={styles.value}>{item.to_date}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Leave Type</Text>
          <Text style={styles.value}>{item.leave_type}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Reason</Text>
          <Text style={styles.value}>{item.reason}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Time/Icons */}
      <View style={styles.topHeader}>
        <Text style={styles.time}>11:07</Text>
        <Ionicons name="wifi" size={20} color="#fff" />
        <Ionicons
          name="battery-full"
          size={20}
          color="#fff"
          style={styles.batteryIcon}
        />
      </View>

      {/* Header */}
      <LeaveHeader navigation={navigation} route={route} />

      {/* Date */}
      <Text style={styles.dateHeader}>12 March 2025</Text>

      {/* Leave List */}
      {loading ? (
        <ActivityIndicator size="large" color="#fff" style={{ marginTop: 20 }} />
      ) : (
        <FlatList
          data={leaveData}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <Text style={{ color: "#ccc", textAlign: "center", marginTop: 20 }}>
              No leave requests found.
            </Text>
          }
        />
      )}

      {/* FAB for New Leave */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate("LeaveRequestFormScreen")}
      >
        <Ionicons name="add" size={20} color="white" />
      </TouchableOpacity>

      {/* Bottom Navigation */}
      <BottomNavbar navigation={navigation} route={route} />
    </SafeAreaView>
  );
}
