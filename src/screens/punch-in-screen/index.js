import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Alert,
  Image,
} from "react-native";
import * as Location from "expo-location";

import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation, useRoute } from "@react-navigation/native";
import authAxios from "@/src/utils/authAxios";
import styles from "./styles";
import BottomNavbar from "../BottomNavbar";
import SwipeButton from "../../components/swipe/index";
import { Pressable } from "react-native";
import LeaveIcon from "../../../assets/salarySlip.svg";
import SalarySlipIcon from "../../../assets/salarySlip.svg";
import AttendanceIcon from "../../../assets/attendance.svg";
import TaskIcon from "../../../assets/task.svg";
import DocumentsIcon from "../../../assets/documents.svg";
import TeamIcon from "../../../assets/team.svg";
import ReminderIcon from "../../../assets/reminder.svg";
import { useDispatch, useSelector } from "react-redux";


const defaultAvatar = "https://cdn-icons-png.flaticon.com/512/149/149071.png";

const API_BASE_URL = "http://178.248.112.16:8001";

const AttendanceScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sessions, setSessions] = useState([]);
  const [totalHours, setTotalHours] = useState("00:00 Hrs");
  const [punching, setPunching] = useState(false);
  const [pendingLeaves, setPendingLeaves] = useState();


  const [dayStatus, setDayStatus] = useState([]);


  const fetchDayStatus = async () => {
    try {
      const response = await authAxios.get("/employee-monthly-summary/");
      const data = response.data;

      const statusMap = {};

      const firstDate = new Date(data.total_working_days_dates[0]);
      const year = firstDate.getFullYear();
      const month = firstDate.getMonth(); // 0-indexed
      const daysInMonth = new Date(year, month + 1, 0).getDate();

      const allDates = [];
      for (let day = 1; day <= daysInMonth; day++) {
        const iso = `${year}-${String(month + 1).padStart(2, "0")}-${String(
          day
        ).padStart(2, "0")}`;
        allDates.push(iso);
      }

      allDates.forEach((date) => {
        const day = new Date(date).getDay();
        if (day === 0) statusMap[date] = "holiday";
        else statusMap[date] = "working";
      });

      data.present_days_dates.forEach((date) => (statusMap[date] = "present"));
      data.absent_days_dates.forEach((date) => (statusMap[date] = "absent"));
      data.holidays_dates.forEach((date) => (statusMap[date] = "holiday"));

      const orderedStatuses = allDates.map((date) => statusMap[date]);

      setDayStatus(orderedStatuses);
    } catch (error) {
      console.error("Failed to fetch day status:", error);
      setDayStatus([]);
    }
  };

  const getProfileUri = (pic) => {
    if (!pic) return defaultAvatar;

    if (pic.startsWith("http")) {
      return pic; // already full URL
    }

    // Ensure path is correct (add /media/ if only filename is given)
    const path = pic.startsWith("/") ? pic : `/media/${pic}`;
    return `${API_BASE_URL}${path}`;
  };



  useEffect(() => {
    fetchDayStatus();
  }, []);

  const fetchTodayAttendance = async () => {
    try {
      const res = await authAxios.get(`/attendance/today`);
      const data = res.data;
      setSessions(data.sessions || []);

      const hours = parseFloat(data.total_hours || 0);
      const h = Math.floor(hours);
      const m = Math.round((hours - h) * 60);
      setTotalHours(
        `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")} Hrs`
      );
    } catch (err) {
      // console.error("Attendance fetch error:", err.message);
    }
  };


  const getLatestSession = () => {
    if (!Array.isArray(sessions) || sessions.length === 0) return "----";
    return sessions[sessions.length - 1];
  };

  const isCurrentlyPunchedIn = () => {
    const lastSession = getLatestSession();
    return lastSession?.time_in && !lastSession?.time_out;
  };


  const getCurrentLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      alert('Permission to access location was denied');
      return null;
    }

    const location = await Location.getCurrentPositionAsync({});
    return {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    };
  };

  const handlePunch = async () => {
    setPunching(true);
    try {
      // Get current location with permission
      const location = await getCurrentLocation();
      if (!location) {
        setPunching(false);
        return;
      }

      // Send location to backend
      await authAxios.post('/attendance/swipe/', {
        latitude: location.latitude,
        longitude: location.longitude,
      });

      await fetchTodayAttendance();
    } catch (error) {
      console.error("Punch error:", error.response?.data || error.message);
      Alert.alert("Error", error.response?.data?.error || "Failed to swipe.");
    } finally {
      setPunching(false);
    }
  };

const { accessToken, user } = useSelector((state) => state.auth);
const dispatch = useDispatch();

const handleLogout = () => {
  dispatch(logout());
};

  useEffect(() => {
    (async () => {
      try {
        const profileRes = await authAxios.get(`/profile/`);
        setEmployee(profileRes.data);
        await fetchTodayAttendance();
      } catch (err) {
        console.error("Init error:", err.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const today = new Date();
  const todayMonth = today.toLocaleString("en-US", { month: "long" });
  const todayWeekday = today.toLocaleString("en-US", { weekday: "long" });

  const getSegment = (status, index) => {
    const total = dayStatus.length;
    const angle = (360 / total) * index;

    let color = "#FFFFFF";
    if (status === "present") color = "#00FF00";
    else if (status === "absent") color = "#FF0000";
    else if (status === "holiday") color = "gray";

    return (
      <View
        key={index}
        style={[
          styles.segment,
          {
            backgroundColor: color,
            transform: [{ rotate: `${angle}deg` }, { translateY: -85 }],
          },
        ]}
      />
    );
  };

  const renderRadialCircle = () => (
    <View style={{ alignItems: "center" }}>
      <TouchableOpacity
        style={styles.circleWrapper}
        activeOpacity={0.8}
        onPress={() => navigation.navigate("WorkingDaySummary")}
      >
        {dayStatus.map((status, index) => getSegment(status, index))}
        <View style={styles.circle}>
          <Text style={styles.dayText}>{todayWeekday}</Text>
          <Text style={styles.monthText}>{todayMonth}</Text>
          <Text style={styles.dateText}>{today.getDate()}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );

  const menuItems = [
    { label: "Salary Slip", icon: SalarySlipIcon, route: "SalarySlipScreen" },
    { label: "Attendance", icon: AttendanceIcon, route: "AttendanceScreen" },
    { label: "Task", icon: TaskIcon, route: "TaskUpdateScreen" },
    { label: "Documents", icon: DocumentsIcon, route: "DocumentsScreen" },
    { label: "Team", icon: TeamIcon, route: "DepartmentScreen" },
    {
      label: "Set Reminder",
      icon: ReminderIcon,
      route: "CalendarScreen",
      params: { openTab: "reminder" },
    },
  ];

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={{ textAlign: "center", marginTop: 50 }}>Loading...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View style={styles.logoRow}>
            <Image
              source={require("../../../assets/logo.png")}
              style={styles.logo}
            />
            <Text style={styles.helloText}>
              Hello {employee?.name || "User"}
            </Text>
          </View>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigation.navigate("ProfileScreen")}
          >
            <Image
              source={{ uri: getProfileUri(employee?.profile_pic) }}
              style={styles.profilePic}
            />

          </TouchableOpacity>
        </View>

        {renderRadialCircle()}

        <View style={styles.legendRow}>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: "#00B140" }]} />
            <Text style={styles.legendText}>Present Days</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: "#FF3B30" }]} />
            <Text style={styles.legendText}>Absent Days</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: "#FFFFFF" }]} />
            <Text style={styles.legendText}>Working Days</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: "#4C4C4C" }]} />
            <Text style={styles.legendText}>Holiday</Text>
          </View>
        </View>

        <View style={styles.menuGrid}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.menuBox}
              onPress={() => navigation.navigate(item.route, item.params || {})}
            >
              <item.icon width={28} height={28} />
              <Text style={styles.menuText}>{item.label}</Text>
            </TouchableOpacity>
          ))}

<TouchableOpacity
  style={styles.menuBox}
  onPress={() => navigation.navigate("LeavePendingScreen")}
>
  {/* ✅ Icon slightly lower */}
  <LeaveIcon width={28} height={28} style={{ marginTop: 6 }} />

  {/* Pending leave count moved a little higher */}
  <Text style={{ 
    color: "#fff", 
    fontSize: 20, 
    fontWeight: "700", 
    marginTop: 2, 
    marginBottom: -25   // pushes text slightly up
  }}>
    {pendingLeaves}
  </Text>

  {/* Label (leave status) */}
  <Text style={[styles.menuText, { marginTop: 2 }]}>Leave Status</Text>
</TouchableOpacity>



          {/* ✅ Apply Leave Box */}
          <TouchableOpacity
            style={[styles.menuBox, styles.applyLeaveBox]}
            onPress={() => navigation.navigate("LeaveRequestFormScreen")}
          >
            <Text style={styles.menuText}>Apply leave</Text>
            <Text style={{ color: "#fff", fontSize: 22, marginTop: 4 }}>+</Text>
          </TouchableOpacity>
        </View>

        {/* Attendance Box */}
        <Pressable
          style={styles.attendanceBox}
          onPress={() => navigation.navigate("AttendanceScreen")}
        >
          <Text style={styles.attendanceTitle}>
            {today.toLocaleDateString("en-US", {
              weekday: "long",
              day: "numeric",
              month: "long",
            })}
          </Text>

          <View style={styles.timeRow}>
            <Text style={styles.timeLabel}>Time in :</Text>
            <Text style={styles.timeValue}>
              {sessions[0]?.time_in
                ? new Date(sessions[0]?.time_in).toLocaleTimeString()
                : "-- --"}
            </Text>
          </View>

          <View style={styles.timeRow}>
            <Text style={styles.timeLabel}>Time Out :</Text>
            <Text style={styles.timeValue}>
              {getLatestSession()?.time_out
                ? new Date(getLatestSession()?.time_out).toLocaleTimeString()
                : "-- --"}
            </Text>
          </View>

          <View style={styles.line} />

          <View style={styles.totalHoursRow}>
            <Ionicons name="time-outline" size={20} color="#fff" />
            <Text style={styles.totalHoursText}></Text>
            <Text style={styles.hours}>{totalHours}</Text>
          </View>
        </Pressable>

        {/* Swipe Button */}
        <SwipeButton
          title={
            isCurrentlyPunchedIn() ? "Swipe to Punch Out" : "Swipe to Punch In"
          }
          successTitle={isCurrentlyPunchedIn() ? "Punched Out!" : "Punched In!"}
          onSwipeSuccess={handlePunch}
          backgroundColor="#ddd"
          thumbColor={isCurrentlyPunchedIn() ? "#ED2B2B" : "#2F822F"}
          resetAfterSuccess={true}
        />
      </ScrollView>

      <View style={styles.bottomNavbarContainer}>
        <BottomNavbar navigation={navigation} route={route} />
      </View>
    </SafeAreaView>
  );
};

export default AttendanceScreen;
