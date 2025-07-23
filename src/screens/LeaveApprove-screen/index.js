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
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LeaveApproveScreen() {
  const navigation = useNavigation();
  const route = useRoute();

  const [leaveData, setLeaveData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApprovedLeaves = async () => {
      try {
        const token = await AsyncStorage.getItem("accessToken");
        const response = await axios.get(
          "http://178.248.112.16:8000/api/leave/by-status/?status=approved",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setLeaveData(response.data);
      } catch (error) {
        console.error("Error fetching approved leaves:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchApprovedLeaves();
  }, []);

 const renderItem = ({ item }) => (
  <TouchableOpacity
    onPress={() => navigation.navigate("RequestApprovedScreen", { leaveId: item.id })}
    style={styles.card}
  >
    <View style={styles.statusContainer}>
 <Text style={styles.statusText}>
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
      {/* Top Status Bar */}
      

      <LeaveHeader navigation={navigation} route={route} />

      <Text style={styles.dateHeader}>Approved Leaves</Text>

      <FlatList
        data={leaveData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          !loading && (
            <Text style={{ color: "#888", textAlign: "center", marginTop: 20 }}>
              No approved leaves found.
            </Text>
          )
        }
      />

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
