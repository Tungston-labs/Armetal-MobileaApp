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
import AsyncStorage from "@react-native-async-storage/async-storage";

import styles from "./styles";
import BottomNavbar from "../BottomNavbar";
import LeaveHeader from "../LeaveHeader-screen";

export default function LeaveAllScreen({ navigation, route }) {
  const [leaveData, setLeaveData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchLeaves = async () => {
    try {
      const token = await AsyncStorage.getItem("accessToken");
      const response = await fetch("http://178.248.112.16:8000/api/leave/", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch leave data");
      }

      const data = await response.json();
      const leaves = data.results?.leaves || [];
      setLeaveData(leaves);
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
const today = new Date();
const formattedDate = today.toLocaleDateString('en-GB', {
  day: '2-digit',
  month: 'long',
  year: 'numeric',
});
  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <TouchableOpacity
        style={[
          styles.statusBadge,
          styles[`status${item.status?.charAt(0).toUpperCase() + item.status?.slice(1)}`],
        ]}
        // onPress={() => handleStatusNavigation(item.status)}
      >
<Text
  style={[
    styles.statusText,
    item.status === 'approved'
      ? { color: '#00d47f' }
      : item.status === 'rejected'
      ? { color: '#f44336' }
      : { color: '#ff9800' },
  ]}
>
  {item.status?.charAt(0).toUpperCase() + item.status?.slice(1)}
</Text>

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
      {/* Top Custom Status Bar */}
      {/* <View style={styles.topHeader}>
        <Text style={styles.time}>11:07</Text>
        <Ionicons name="wifi" size={20} color="#fff" />
        <Ionicons
          name="battery-full"
          size={20}
          color="#fff"
          style={styles.batteryIcon}
        />
      </View> */}

      <LeaveHeader navigation={navigation} route={route} />

 <Text style={styles.dateHeader}>{formattedDate}</Text>


      {loading ? (
        <ActivityIndicator size="large" color="#fff" style={{ marginTop: 20 }} />
      ) : (
        <FlatList
          data={leaveData}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <Text style={{ color: "#ccc", textAlign: "center", marginTop: 20 }}>
              No leave requests found.
            </Text>
          }
        />
      )}

      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate("LeaveRequestFormScreen")}
      >
        <Ionicons name="add" size={24} color="white" />
      </TouchableOpacity>

      <BottomNavbar navigation={navigation} route={route} />
    </SafeAreaView>
  );
}
