import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import authAxios from "../../utils/authAxios";
import styles from "./styles";
import BottomNavbar from "../BottomNavbar";
import LeaveHeader from "../LeaveHeader-screen";
import SwipeLoader from "../../components/SwipeLoader"
export default function LeaveAllScreen({ navigation, route }) {
  const [leaveData, setLeaveData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchLeaves = async () => {
    try {
      const response = await authAxios.get("/leave/");
      const leaves = response.data.results?.leaves || [];
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

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchLeaves();
    setRefreshing(false);
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
  const formattedDate = today.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <TouchableOpacity
        style={[
          styles.statusBadge,
          styles[
            `status${
              item.status?.charAt(0).toUpperCase() + item.status?.slice(1)
            }`
          ],
        ]}
      >
        <Text
          style={[
            styles.statusText,
            item.status === "approved"
              ? { color: "#00d47f" }
              : item.status === "rejected"
              ? { color: "#f44336" }
              : { color: "#ff9800" },
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
      <LeaveHeader navigation={navigation} route={route} />

      <Text style={styles.dateHeader}>{formattedDate}</Text>

      {loading ? (
        <SwipeLoader size="large" color="#fff" style={{ marginTop: 20 }} />
      ) : (
        <FlatList
          data={leaveData}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={["#ffffff", "#d3d3d3"]} // ✅ Android spinner colors
              tintColor="#ffffff"             // ✅ iOS spinner color
              progressBackgroundColor={
                Platform.OS === "android" ? "#2c2c2c" : "transparent"
              }
            />
          }
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
