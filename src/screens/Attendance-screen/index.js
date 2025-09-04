import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
  RefreshControl,
  Platform,
} from "react-native";
import styles from "./styles";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation, useRoute } from "@react-navigation/native";
import authAxios from "../../utils/authAxios";
import BottomNavbar from "../BottomNavbar";
import { Calendar } from "react-native-calendars";

const API_BASE_URL = "http://178.248.112.16:8001";

const AttendanceScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const [sessions, setSessions] = useState([]);
  const [totalHours, setTotalHours] = useState("00:00 Hrs");
  const [profilePic, setProfilePic] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false); // ✅ state for pull-to-refresh

  const [selectedDate, setSelectedDate] = useState(() => {
    const { date } = route.params || {};
    return date ? new Date(date) : new Date();
  });
  const [showCalendar, setShowCalendar] = useState(false);
  const [calendarMonth, setCalendarMonth] = useState(new Date());
  const [yearPickerVisible, setYearPickerVisible] = useState(false);

  const handleDateSelect = (day) => {
    const selected = new Date(day.timestamp);
    const today = new Date();
    selected.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);
    if (selected > today) return;
    setSelectedDate(selected);
    setShowCalendar(false);
  };

  const fetchTodayAttendance = async () => {
    try {
      const formattedDate = selectedDate.toLocaleDateString("en-CA"); // YYYY-MM-DD
      const res = await authAxios.get(`/attendance/today`, {
        params: { date: formattedDate },
      });

      const data = res.data;
      setSessions(data.sessions || []);
      const hours = parseFloat(data.total_hours || 0);
      const h = Math.floor(hours);
      const m = Math.round((hours - h) * 60);
      setTotalHours(
        `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")} Hrs`
      );
    } catch (err) {
      console.error("Attendance fetch error:", err.message);
      setSessions([]);
      setTotalHours("00:00 Hrs");
    }
  };

  // 🔄 called when pulling down
  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchTodayAttendance();
    setRefreshing(false);
  };

  useEffect(() => {
    fetchTodayAttendance();
  }, [selectedDate]);

  useEffect(() => {
    const fetchProfilePic = async () => {
      try {
        const response = await authAxios.get("/profile/");
        const imageUrl = response.data?.profile_pic
          ? `${API_BASE_URL}${response.data.profile_pic}`
          : "https://cdn-icons-png.flaticon.com/512/149/149071.png";
        setProfilePic(imageUrl);
      } catch (error) {
        setProfilePic("https://cdn-icons-png.flaticon.com/512/149/149071.png");
      } finally {
        setLoading(false);
      }
    };
    fetchProfilePic();
  }, []);

  const renderItem = ({ item }) => {
    const punchIn = item.time_in
      ? new Date(item.time_in).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })
      : "-- --";

    const punchOut = item.time_out
      ? new Date(item.time_out).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })
      : "-- --";

    return (
      <View style={styles.row}>
        <Text style={[styles.cell, { color: "#00FF00" }]}>{punchIn}</Text>
        <Text
          style={[
            styles.cell,
            { color: punchOut !== "-- --" ? "#FF4B4B" : "#ccc" },
          ]}
        >
          {punchOut}
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#fff" style={{ marginTop: 6 }} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Attendance details</Text>
        {loading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Image source={{ uri: profilePic }} style={styles.profileImage} />
        )}
      </View>

      {/* Attendance Table */}
      <View style={styles.tableContainer}>
        <View style={styles.tableHeader}>
          <Text style={styles.headerCell}>Punch In</Text>
          <Text style={styles.headerCell}>Punch Out</Text>
        </View>
        <FlatList
          data={sessions}
          renderItem={renderItem}
          keyExtractor={(_, index) => index.toString()}
          refreshControl={ // ✅ pull-to-refresh added
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
              colors={["#ffffff", "#d3d3d3"]} // Android colors
              tintColor="#ffffff"             // iOS spinner color
              progressBackgroundColor={Platform.OS === "android" ? "#2c2c2c" : "transparent"}
            />
          }
        />
      </View>

      {/* Bottom Navigation with separator */}
<View>
  <View
    style={{
      height: 1,
      backgroundColor: "#3e4e6c", // subtle gray line (fits your dark theme)
      marginHorizontal: 10,
      marginBottom: 5,
    }}
  />
  <View style={styles.bottomNavbarContainer}>
    <BottomNavbar navigation={navigation} route={route} />
  </View>
</View>


      {/* Bottom Navigation */}
      <View style={styles.bottomNavbarContainer}>
        <BottomNavbar navigation={navigation} route={route} />
      </View>
    </SafeAreaView>
  );
};

export default AttendanceScreen;
