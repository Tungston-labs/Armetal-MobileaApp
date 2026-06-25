import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import authAxios from "../../utils/authAxios";
import styles from "./styles";
import LeaveHeader from "../LeaveHeader-screen";
import SwipeLoader from "../../components/SwipeLoader"
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LeaveAllScreen({ navigation, route }) {
  const [leaveData, setLeaveData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState("All");
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
  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };


  useEffect(() => {
    fetchLeaves();
  }, []);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchLeaves();
    setRefreshing(false);
  }, []);

  const filteredLeaveData =
    activeTab === "All"
      ? leaveData
      : leaveData.filter(
        (item) =>
          item.status?.toLowerCase() ===
          activeTab.toLowerCase()
      );


  const today = new Date();
  const formattedDate = today.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  const formatDate = (dateString) => {
    const date = new Date(dateString);

    return `${String(date.getDate()).padStart(2, "0")}/${String(
      date.getMonth() + 1
    ).padStart(2, "0")}/${date.getFullYear()}`;
  };
  const renderItem = ({ item }) => (
    <View style={styles.card}>
     <TouchableOpacity
  activeOpacity={0.8}
 onPress={() => {
  if (item.status?.toLowerCase() === "approved") {
    navigation.navigate("RequestApprovedScreen", {
      leaveId: item.id,
    });
  } else if (item.status?.toLowerCase() === "pending") {
    navigation.navigate("RequestPending", {
      leaveId: item.id,
    });
  } else {
    navigation.navigate("RequestRejected", {
      leaveId: item.id,
    });
  }
}}
  style={[
    styles.statusBadge,
    styles[
      `status${item.status?.charAt(0).toUpperCase() + item.status?.slice(1)}`
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
        {/* Row: From | To | Time */}
        <View style={styles.row}>
          <View>
            <Text style={styles.label}>From</Text>
            <Text style={styles.value}>{formatDate(item.from_date)}</Text>
            <Text style={styles.value}>{item.from_date_type}</Text>
          </View>

          <View>
            <Text style={styles.label}>To</Text>
            <Text style={styles.value}>{formatDate(item.to_date)}</Text>
            <Text style={styles.value}>{item.to_date_type}</Text>

          </View>

          <View>
            <Text style={styles.label}>Time</Text>
            <Text style={styles.value}>{formatTime(item.created_at)}

            </Text>
          </View>
        </View>

        {/* Leave Type in second line */}
        <View style={{ marginTop: 8 }}>
          <Text style={styles.label}>Leave Type</Text>
          <Text style={styles.value}>{item.leave_type}</Text>
        </View>
      </View>
    </View>
  );

  return (

    <SafeAreaView style={styles.container} edges={["bottom"]}>
      <LeaveHeader
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <Text style={styles.dateHeader}>{formattedDate}</Text>

      {loading ? (
        <SwipeLoader size="large" color="#fff" style={{ marginTop: 20 }} />
      ) : (
        <FlatList
          data={filteredLeaveData}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={["#ffffff", "#d3d3d3"]}
              tintColor="#ffffff"
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
        style={[styles.fab, { bottom: styles.fab.bottom + insets.bottom }]}
        onPress={() => navigation.navigate("LeaveRequestFormScreen")}
      >
        <Ionicons name="add" size={24} color="white" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}
