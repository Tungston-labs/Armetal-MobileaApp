import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "./styles";
import BottomNavbar from "../BottomNavbar";
import LeaveHeader from "../LeaveHeader-screen";
import authAxios from "../../utils/auth"; // centralized axios instance
import { useNavigation } from "@react-navigation/native";

export default function AttendanceScreen() {
  const [attendanceData, setAttendanceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [punching, setPunching] = useState(false);
  const [punchedIn, setPunchedIn] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const navigation = useNavigation();

  const fetchTodayAttendance = async () => {
    try {
      const res = await authAxios.get("/attendance/today/");
      setAttendanceData(res.data || []);
      const punchedInStatus = res.data.some((item) => item.time_out === null);
      setPunchedIn(punchedInStatus);
    } catch (error) {
      console.error("Error fetching today's attendance:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handlePunch = async () => {
    try {
      setPunching(true);
      await authAxios.post("/attendance/swipe/");
      await fetchTodayAttendance();
    } catch (error) {
      console.error("Error punching attendance:", error);
    } finally {
      setPunching(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchTodayAttendance();
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profileRes = await authAxios.get("/profile/");
        setProfileData(profileRes.data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
    fetchTodayAttendance();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.cardText}>Date: {item.date}</Text>
      <Text style={styles.cardText}>Time In: {item.time_in}</Text>
      <Text style={styles.cardText}>Time Out: {item.time_out || "N/A"}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <LeaveHeader />
      <View style={styles.container}>
        <Text style={styles.title}>Today’s Attendance</Text>
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : attendanceData.length === 0 ? (
          <Text style={styles.noData}>No attendance data for today.</Text>
        ) : (
          <FlatList
            data={attendanceData}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          />
        )}

        <TouchableOpacity
          style={[
            styles.punchButton,
            punchedIn ? styles.punchOut : styles.punchIn,
          ]}
          onPress={handlePunch}
          disabled={punching}
        >
          {punching ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <>
              <Ionicons
                name={punchedIn ? "exit-outline" : "enter-outline"}
                size={24}
                color="#fff"
                style={{ marginRight: 10 }}
              />
              <Text style={styles.buttonText}>
                {punchedIn ? "Punch Out" : "Punch In"}
              </Text>
            </>
          )}
        </TouchableOpacity>
      </View>
      <BottomNavbar navigation={navigation} />
    </SafeAreaView>
  );
}
