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
import { useNavigation, useRoute } from "@react-navigation/native";
import LeaveHeader from "../LeaveHeader-screen";
import authAxios from "../../utils/authAxios";
import SwipeLoader from "../../components/SwipeLoader"
export default function LeaveApproveScreen() {
  const navigation = useNavigation();
  const route = useRoute();

  const [leaveData, setLeaveData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchApprovedLeaves = async () => {
    try {
      const response = await authAxios.get("leave/by-status/?status=approved");
      setLeaveData(response.data);
    } catch (error) {
      console.error("Error fetching approved leaves:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApprovedLeaves();
  }, []);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchApprovedLeaves();
    setRefreshing(false);
  }, []);
  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("RequestApprovedScreen", { leaveId: item.id })
      }
      style={styles.card}
    >
      {/* Status */}
      <View style={styles.statusContainer}>
        <Text style={styles.statusText}>
          {item.status.charAt(0).toUpperCase() +
            item.status.slice(1).toLowerCase()}
        </Text>
      </View>

      {/* Card Content */}
      <View style={styles.cardContent}>
        {/* Row: From | To | Time */}
        <View style={styles.row}>
          <View>
            <Text style={styles.label}>From</Text>
            <Text style={styles.value}>{item.from_date}</Text>
            <Text style={styles.value}>{item.from_date_type}</Text>

          </View>

          <View>
            <Text style={styles.label}>To</Text>
            <Text style={styles.value}>{item.to_date}</Text>
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
    </TouchableOpacity>
  );
  return (
    <SafeAreaView style={styles.container}>
      <LeaveHeader navigation={navigation} route={route} />

      <Text style={styles.dateHeader}>Approved Leaves</Text>

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
              colors={["#ffffff", "#d3d3d3"]} 
              tintColor="#ffffff"          
              progressBackgroundColor={
                Platform.OS === "android" ? "#2c2c2c" : "transparent"
              }
            />
          }
          ListEmptyComponent={
            !loading && (
              <Text
                style={{ color: "#888", textAlign: "center", marginTop: 20 }}
              >
                No approved leaves found.
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
