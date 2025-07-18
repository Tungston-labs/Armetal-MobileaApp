import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import styles from "./styles";
import BottomNavbar from "../BottomNavbar";
import { useNavigation, useRoute, useIsFocused } from "@react-navigation/native";
import LeaveHeader from "../LeaveHeader-screen";
import authAxios from "../../utils/auth"; // ✅ Import custom authAxios

export default function LeavePendingScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const isFocused = useIsFocused();

  const [leaveData, setLeaveData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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

    if (isFocused) {
      setLoading(true);
      fetchPendingLeaves();
    }
  }, [isFocused]);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate("RequestPending", { leaveId: item.id })}
      style={styles.card}
    >
      <View style={styles.statusBadgePending}>
        <Text style={styles.statusTextPending}>{item.status}</Text>
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
          <Text style={styles.value}>{item.reason}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Status Bar */}
      <View style={styles.topBar}>
        <Text style={styles.statusTime}>11:07</Text>
        <View style={styles.statusIcons}>
          <Ionicons name="wifi" size={18} color="#fff" style={styles.statusIcon} />
          <Ionicons name="battery-full" size={18} color="#fff" />
        </View>
      </View>

      {/* Leave Header */}
      <LeaveHeader navigation={navigation} route={route} />

      <Text style={styles.dateHeader}>Pending Leaves</Text>

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
            <Text style={{ color: "#888", textAlign: "center", marginTop: 20 }}>
              No pending leaves found.
            </Text>
          }
        />
      )}

      {/* Add Button */}
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
