import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  Image,
  TouchableOpacity,
  RefreshControl,
  Platform,
} from "react-native";
import styles from "./styles";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation, useRoute } from "@react-navigation/native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import authAxios from "../../utils/authAxios";
import BottomNavbar from "../BottomNavbar";
import SwipeLoader from "../../components/SwipeLoader";

const API_BASE_URL = "http://178.248.112.16:8001";

const AttendanceScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const [sessions, setSessions] = useState([]);
  const [totalHours, setTotalHours] = useState("00:00 Hrs");
  const [profilePic, setProfilePic] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);

  const [selectedDate, setSelectedDate] = useState(() => {
    const { date } = route.params || {};
    return date ? new Date(date) : new Date();
  });

  const fetchAttendanceData = async () => {
    try {
      setLoading(true);
      const formattedDate = selectedDate.toLocaleDateString("en-CA");
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

      const profileRes = await authAxios.get("/profile/");
      const imageUrl = profileRes.data?.profile_pic
        ? `${API_BASE_URL}${profileRes.data.profile_pic}`
        : "https://cdn-icons-png.flaticon.com/512/149/149071.png";
      setProfilePic(imageUrl);
    } catch (error) {
      //console.error("Attendance fetch error:", error);
      setSessions([]);
      setTotalHours("00:00 Hrs");
      setProfilePic(
        "https://cdn-icons-png.flaticon.com/512/149/149071.png"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAttendanceData();
  }, [selectedDate]);

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchAttendanceData();
    setRefreshing(false);
  };

  const formatTime = (time) => {
    if (!time) return "-- --";
    const date = new Date(time);
    let hours = date.getHours();
    let minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")} ${ampm}`;
  };

  const renderItem = ({ item }) => {
    const punchIn = formatTime(item.time_in);
    const punchOut = formatTime(item.time_out);

    return (
      <View style={styles.row}>
        <Text style={[styles.cell, { color: "#00FF26" }]}>{punchIn}</Text>
        <Text
          style={[
            styles.cell,
            { color: punchOut !== "-- --" ? "#FF2304" : "#ccc" },
          ]}
        >
          {punchOut}
        </Text>
      </View>
    );
  };

  if (loading) {
    return (
      <View
        style={[
          styles.container,
          { justifyContent: "center", alignItems: "center" },
        ]}
      >
        <SwipeLoader size="large" color="#3352BA" />
      </View>
    );
  }

  return (
    <>
  {/* Background behind notch */}
  <SafeAreaView style={{ flex: 0, backgroundColor: '#262D40' }} edges={['top']} />

  {/* Main container (below the notch) */}
  <SafeAreaView style={styles.container} edges={['left', 'right', 'bottom']}>
    {/* Header */}
    <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Ionicons
          name="arrow-back"
          size={24}
          color="#fff"
          style={{ marginBottom: 16 }}
        />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>Attendance details</Text>
    </View>

    {/* Date dropdown */}
    <TouchableOpacity
      style={styles.dateCard}
      onPress={() => setDatePickerVisible(true)}
    >
      <Ionicons name="calendar-outline" size={29} color="#fff" />
      <View style={{ marginLeft: 8, flex: 1 }}>
        <Text style={styles.selectDateText}>Select a day</Text>
        <Text style={styles.selectedDate}>
          {selectedDate.toLocaleDateString("en-GB").replace(/\//g, ".")}
        </Text>
      </View>
      <Ionicons name="chevron-down" size={18} color="#fff" />
    </TouchableOpacity>

    {/* Date picker modal */}
    <DateTimePickerModal
      isVisible={isDatePickerVisible}
      mode="date"
      date={selectedDate}
      onConfirm={(date) => {
        setSelectedDate(date);
        setDatePickerVisible(false);
      }}
      onCancel={() => setDatePickerVisible(false)}
    />

    {/* Attendance Table */}
    <View style={styles.tableContainer}>
      <View style={styles.tableHeader}>
        <Text style={styles.headerCell}>Punch In</Text>
        <Text style={styles.headerCell}>Punch Out</Text>
      </View>

      <View style={styles.divider} />

      <View style={{ maxHeight: 10 * 39 }}>
        <FlatList
          data={sessions}
          renderItem={renderItem}
          keyExtractor={(_, index) => index.toString()}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
              colors={["#ffffff", "#d3d3d3"]}
              tintColor="#ffffff"
              progressBackgroundColor={
                Platform.OS === "android" ? "#2c2c2c" : "transparent"
              }
            />
          }
        />
      </View>
    </View>

    {/* Bottom Navbar */}
    <View style={styles.bottomNavbarContainer}>
      <View style={styles.totalHoursCard}>
        <Text style={styles.totalHoursLabel}>Total working hour</Text>
        <Text style={styles.totalHoursValue}>{totalHours}</Text>
      </View>
      <BottomNavbar navigation={navigation} route={route} />
    </View>
  </SafeAreaView>
</>

  );
};

export default AttendanceScreen;
