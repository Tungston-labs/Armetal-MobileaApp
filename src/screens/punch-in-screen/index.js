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
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation, useRoute } from "@react-navigation/native";
import authAxios from "@/src/utils/authAxios";
import styles from "./styles";
import BottomNavbar from "../BottomNavbar";
import SwipeButton from "../../components/swipe/index";

// ✅ SVG Imports (6 main icons)
import SalarySlipIcon from "../../../assets/salarySlip.svg";
import AttendanceIcon from "../../../assets/attendance.svg";
import TaskIcon from "../../../assets/task.svg";
import DocumentsIcon from "../../../assets/documents.svg";
import TeamIcon from "../../../assets/team.svg";
import ReminderIcon from "../../../assets/reminder.svg";

const defaultAvatar = "https://cdn-icons-png.flaticon.com/512/149/149071.png";

const AttendanceScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sessions, setSessions] = useState([]);
  const [totalHours, setTotalHours] = useState("00:00 Hrs");
  const [punching, setPunching] = useState(false);
  const [pendingLeaves, setPendingLeaves] = useState(20); // Example dynamic number

  const dayStatus = [
    "present",
    "present",
    "present",
    "present",
    "present",
    "present",
    "holiday",
    "present",
    "present",
    "absent",
    "present",
    "present",
    "holiday",
    "present",
    "present",
    "present",
    "present",
    "absent",
    "present",
    "holiday",
    "present",
    "present",
    "present",
    "absent",
    "present",
    "holiday",
    "present",
    "present",
    "present",
    "absent",
  ];

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
      console.error("Attendance fetch error:", err.message);
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

  const handlePunch = async () => {
    setPunching(true);
    try {
      await authAxios.post(`/attendance/swipe/`, {});
      await fetchTodayAttendance();
    } catch (error) {
      Alert.alert("Error", "Failed to swipe.");
    } finally {
      setPunching(false);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const profileRes = await authAxios.get(`/profile/`);
        setEmployee(profileRes.data);
        await fetchTodayAttendance();
        // Example: Fetch pending leaves
        // const leaveRes = await authAxios.get("/leaves/pending");
        // setPendingLeaves(leaveRes.data.count);
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
            transform: [{ rotate: `${angle}deg` }, { translateY: -105 }],
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

  // ✅ Main 6 menu items
  const menuItems = [
    { label: "Salary Slip", icon: SalarySlipIcon, route: "SalarySlipScreen" },
    { label: "Attendance", icon: AttendanceIcon, route: "AttendanceScreen" },
    { label: "Task", icon: TaskIcon, route: "TaskUpdateScreen" },
    { label: "Documents", icon: DocumentsIcon, route: "DocumentsScreen" },
    { label: "Team", icon: TeamIcon, route: "DepartmentScreen" },
    { label: "Set Reminder", icon: ReminderIcon, route: "ReminderScreen" },
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
        {/* Top Header */}
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
            activeOpacity={0.7} // controls fade amount (0–1)
            onPress={() => navigation.navigate("ProfileScreen")}
          >
            <Image
              source={{ uri: employee?.profile_image || defaultAvatar }}
              style={styles.profilePic}
            />
          </TouchableOpacity>
        </View>

        {/* Radial Circle */}
        {renderRadialCircle()}

        {/* Legend */}
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

        {/* Menu Grid */}
        <View style={styles.menuGrid}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.menuBox}
              onPress={() => navigation.navigate(item.route)}
            >
              <item.icon width={28} height={28} />
              <Text style={styles.menuText}>{item.label}</Text>
            </TouchableOpacity>
          ))}

          {/* ✅ Pending Leaves Box */}
          <TouchableOpacity
            style={styles.menuBox}
            onPress={() => navigation.navigate("PendingLeavesScreen")}
          >
            <Text style={{ color: "#fff", fontSize: 20, fontWeight: "700" }}>
              {pendingLeaves}
            </Text>
            <Text style={styles.menuText}>Pending Leaves</Text>
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
        <View style={styles.attendanceBox}>
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
            <Text style={styles.totalHoursText}> Total hours</Text>
            <Text style={styles.hours}>{totalHours}</Text>
          </View>
        </View>

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
