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
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function LeaveRejectedScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const isFocused = useIsFocused();
  const insets = useSafeAreaInsets();
  const [leaveData, setLeaveData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchRejectedLeaves = async () => {
    try {
      const response = await authAxios.get("leave/by-status/?status=rejected");
      setLeaveData(response.data);
    } catch (error) {
      console.error("Error fetching rejected leaves:", error);
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
    if (isFocused) {
      fetchRejectedLeaves();
    }
  }, [isFocused]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchRejectedLeaves();
    setRefreshing(false);
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate("RequestRejected", { leaveId: item.id })}
    >
      <View style={styles.statusBadgeRejected}>
        <Text style={styles.statusTextRejected}>
          {item.status.charAt(0).toUpperCase() + item.status.slice(1).toLowerCase()}
        </Text>
      </View>
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

      <Text style={styles.dateHeader}>Rejected Leaves</Text>

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
              colors={["#ffffff", "#d3d3d3"]} // Android spinner
              tintColor="#ffffff"             // iOS spinner
              progressBackgroundColor={
                Platform.OS === "android" ? "#2c2c2c" : "transparent"
              }
            />
          }
          ListEmptyComponent={
            !loading && (
              <Text style={{ color: "#888", textAlign: "center", marginTop: 20 }}>
                No rejected leaves found.
              </Text>
            )
          }
        />
      )}

      <TouchableOpacity
        style={[styles.fab, { bottom: styles.fab.bottom + insets.bottom }]}
        onPress={() => navigation.navigate("LeaveRequestFormScreen")}
      >
        <Ionicons name="add" size={20} color="white" />
      </TouchableOpacity>

      <BottomNavbar navigation={navigation} route={route} />
    </SafeAreaView>
  );
}
