import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
  Platform,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import styles from "./styles";
import BottomNavbar from "../BottomNavbar";
import { useNavigation, useRoute, useIsFocused } from "@react-navigation/native";
import LeaveHeader from "../LeaveHeader-screen";
import authAxios from "../../utils/authAxios";
import SwipeLoader from "../../components/SwipeLoader"
export default function LeavePendingScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const isFocused = useIsFocused();

  const [leaveData, setLeaveData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchPendingLeaves = async () => {
    try {
      const response = await authAxios.get("leave/by-status/?status=pending");
      setLeaveData(response.data);
    } catch (error) {
      console.error("Error fetching pending leaves:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isFocused) {
      fetchPendingLeaves();
    }
  }, [isFocused]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchPendingLeaves();
    setRefreshing(false);
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate("RequestPending", { leaveId: item.id })}
      style={styles.card}
    >
      <View style={styles.statusBadgePending}>
        <Text style={styles.statusTextPending}>
          {item.status.charAt(0).toUpperCase() + item.status.slice(1).toLowerCase()}
        </Text>
      </View>
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
         <Text style={styles.value}>
           {item.reason && item.reason.length > 10
             ? item.reason.substring(0, 25) + "...."
             : item.reason}
         </Text>
       </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Leave Header */}
      <LeaveHeader navigation={navigation} route={route} />

      <Text style={styles.dateHeader}>Pending Leaves</Text>

      {loading ? (
        <SwipeLoader size="large" color="#fff" style={{ marginTop: 20 }} />
      ) : (
        <FlatList
          data={leaveData}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
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
            !loading && (
              <Text style={{ color: "#888", textAlign: "center", marginTop: 20 }}>
                No pending leaves found.
              </Text>
            )
          }
        />
      )}

      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate("LeaveRequestFormScreen")}
      >
        <Ionicons name="add" size={20} color="white" />
      </TouchableOpacity>

      <BottomNavbar navigation={navigation} route={route} />
    </SafeAreaView>
  );
}
