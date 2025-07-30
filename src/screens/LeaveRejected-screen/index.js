import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import styles from "./styles";
import BottomNavbar from "../BottomNavbar";
import { useNavigation, useRoute } from "@react-navigation/native";
import LeaveHeader from "../LeaveHeader-screen";
import authAxios from "../../utils/authAxios";
// import axios from "axios";
// import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LeaveRejectedScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const [leaveData, setLeaveData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRejectedLeaves = async () => {
      try {
        const response = await authAxios.get("leave/by-status/?status=rejected"); // ✅ relative to baseURL
        setLeaveData(response.data);
      } catch (error) {
        console.error("Error fetching rejected leaves:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRejectedLeaves();
  }, []);


  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        navigation.navigate("RequestRejected", { leaveId: item.id })
      }
    >
      <View style={styles.statusBadgeRejected}>
        <Text style={styles.statusTextRejected}>
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
          <Text style={styles.value}>{item.reason}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
   

      <LeaveHeader navigation={navigation} route={route} />

      {/* Title */}
      <Text style={styles.dateHeader}>Rejected Leaves</Text>

      {/* Leave List */}
      <FlatList
        data={leaveData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          !loading && (
            <Text style={{ color: "#888", textAlign: "center", marginTop: 20 }}>
              No rejected leaves found.
            </Text>
          )
        }
      />

      {/* FAB */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate("LeaveRequestFormScreen")}
      >
        <Ionicons name="add" size={20} color="white" />
      </TouchableOpacity>

      {/* Bottom Navbar */}
      <BottomNavbar navigation={navigation} route={route} />
    </SafeAreaView>
  );
}
