import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Alert,
  Image,
  Animated,
  Easing,
} from "react-native";
import * as Location from "expo-location";
import RefreshWrapper from "../../components/RefreshWrapper";
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
import SwipeLoader from "../../components/SwipeLoader"
import { SvgUri } from "react-native-svg";
import { startBackgroundUpdate, stopBackgroundUpdate } from './LocationTask';
import AttendanceTracker from "../../utils/AttendanceTracker"

import Svg, { Defs, RadialGradient, Stop, Circle } from "react-native-svg";
const defaultAvatar = "https://cdn-icons-png.flaticon.com/512/149/149071.png";

const API_BASE_URL = "http://192.168.29.193:8001";

const AttendanceScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sessions, setSessions] = useState([]);
  const [totalHours, setTotalHours] = useState("00:00 Hrs");
  const [punching, setPunching] = useState(false);
  const [pendingLeaves, setPendingLeaves] = useState();
  const [sessionId, setSessionId] = useState(null);


  const [dayStatus, setDayStatus] = useState([]);
  //  🔄 Rotation setup
  const rotateValue = useRef(new Animated.Value(0)).current;
  const spin = rotateValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  const startRotation = () => {
    rotateValue.setValue(0);
    Animated.loop(
      Animated.timing(rotateValue, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  };

  const stopRotation = () => {
    rotateValue.stopAnimation();
    rotateValue.setValue(0);
  };

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

      // Initialize all days: Sundays as holiday, rest working
      allDates.forEach((date) => {
        const day = new Date(date).getDay();
        if (day === 0) statusMap[date] = "holiday";
        else statusMap[date] = "working";
      });

      // Mark present, absent, holiday
      data.present_days_dates.forEach((date) => (statusMap[date] = "present"));
      data.absent_days_dates.forEach((date) => (statusMap[date] = "absent"));
      data.holidays_dates.forEach((date) => (statusMap[date] = "holiday"));

      // Mark half-days (overrides present)
      data.half_days_dates.forEach((date) => (statusMap[date] = "half"));

      const orderedStatuses = allDates.map((date) => statusMap[date]);
      setDayStatus(orderedStatuses);
    } catch (error) {
      console.log("Failed to fetch day status:", error);
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
      const res = await authAxios.get(`/attendance/today/`);
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
  startRotation();
  try {
    const location = await getCurrentLocation();
    if (!location) return;

    const res = await authAxios.post("/attendance/swipe/", {
      latitude: location.latitude,
      longitude: location.longitude,
    });

    console.log("Swipe response:", res.data);

    if (res.data?.success === false) {
      Alert.alert("Failed", res.data?.error || "Swipe failed");
    } else {
      await fetchTodayAttendance();

      if (res.data?.action === "punch_in" && res.data?.session_id) {
        setSessionId(res.data.session_id);
        console.log(" Session started:", res.data.session_id);
      }

      if (res.data?.action === "punch_out") {
        setSessionId(null);
        console.log(" Session ended");
      }
    }
  } catch (error) {
    console.log("Swipe error:", error);
    Alert.alert("Failed", error.response?.data?.error || error.message || "Swipe failed");
  } finally {
    setPunching(false);
    stopRotation();
  }
};


  useEffect(() => {
    (async () => {
      try {
        const profileRes = await authAxios.get(`/profile/`);
        setEmployee(profileRes.data);

        await fetchTodayAttendance();

        const punchedIn = isCurrentlyPunchedIn();
        if (punchedIn) {
          await startBackgroundUpdate();
        } else {
          await stopBackgroundUpdate();
        }
      } catch (err) {
        console.log(err);
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

    let segmentContent;

    if (status === "half") {
      // Half-day: split red (absent) and green (present)
      segmentContent = (
        <View style={{ flexDirection: "row", width: "100%", height: "100%" }}>
          <View style={{ flex: 1, backgroundColor: "#FF0000" }} />
          <View style={{ flex: 1, backgroundColor: "#00B140" }} />
        </View>
      );
    } else if (status === "present") {
      segmentContent = <View style={{ flex: 1, backgroundColor: "#00B140" }} />;
    } else if (status === "absent") {
      segmentContent = <View style={{ flex: 1, backgroundColor: "#FF3B30" }} />;
    } else if (status === "holiday") {
      segmentContent = <View style={{ flex: 1, backgroundColor: "#4C4C4C" }} />;
    } else {
      segmentContent = <View style={{ flex: 1, backgroundColor: "#FFFFFF" }} />;
    }

    return (
      <View
        key={index}
        style={[
          styles.segment,
          { transform: [{ rotate: `${angle}deg` }, { translateY: -78 }] },
        ]}
      >
        {segmentContent}
      </View>
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

        {/* Gradient Circle */}
        <View style={styles.circle}>
          <Svg height="160" width="160">
            <Defs>
              <RadialGradient
                id="grad"
                cx="50%"
                cy="50%"
                rx="50%"
                ry="50%"
                fx="50%"
                fy="50%"

              >
                <Stop offset="41.35%" stopColor="#172554" stopOpacity="1" />
                <Stop offset="63.46%" stopColor="rgba(25,41,92,0.918269)" stopOpacity="1" />
                <Stop offset="100%" stopColor="rgba(51,82,186,0)" stopOpacity="0" />
              </RadialGradient>
            </Defs>
            {/* Fill full circle */}
            <Circle cx="80" cy="80" r="80" fill="url(#grad)" />
          </Svg>

          {/* Text on top of gradient */}
          <View style={styles.textContainer}>
            <Text style={styles.dayText}>{todayWeekday}</Text>
            <Text style={styles.monthText}>{todayMonth}</Text>
            <Text style={styles.dateText}>{today.getDate()}</Text>
          </View>
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
        <SwipeLoader text="Loading ..." />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <RefreshWrapper
        style={{ flex: 1 }}
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 120 }}
        onRefresh={async () => {
          await fetchDayStatus();
          await fetchTodayAttendance();
        }}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, }}
          showsVerticalScrollIndicator={false}
        >

          <View style={styles.header}>

            <View style={styles.logoRow}>
              {employee?.company_logo?.endsWith(".svg") ? (
                <SvgUri
                  uri={employee.company_logo}
                  width={70}
                  height={40}
                />
              ) : (
                <Image
                  source={{ uri: employee?.company_logo }}
                  style={styles.logo}
                />
              )}

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
              onPress={() => navigation.navigate("LeaveAllScreen")}
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



          {/* 🔄 Loader or SwipeButton */}
          {punching ? (
            <View style={styles.loaderOverlay}>
              <View style={styles.logoWrapper}>
                {/* Static logo in center */}
                <Image
                  source={require("../../../assets/images/logo.png")}
                  style={styles.logoImage}
                  resizeMode="contain"
                />

                {/* Rotating circle */}
                <Animated.View
                  style={[
                    styles.rotatingCircle,
                    { transform: [{ rotate: spin }] },
                  ]}
                />
              </View>
              <Text style={styles.loaderText}>
                {isCurrentlyPunchedIn() ? "" : ""}
              </Text>
            </View>
          ) : (
            <SwipeButton
              title={isCurrentlyPunchedIn() ? "Swipe to Punch Out" : "Swipe to punch in"}
              successTitle={isCurrentlyPunchedIn() ? "Punched Out!" : "Punched In!"}
              onSwipeSuccess={handlePunch}
              backgroundColor="#ddd"
              thumbColor={isCurrentlyPunchedIn() ? "#ED2B2B" : "#2F822F"}
              resetAfterSuccess={true}
            />

          )}
          {isCurrentlyPunchedIn() && sessionId && (
            <AttendanceTracker sessionId={sessionId} />
          )}
          {/* Attendance Box */}


          <Pressable
            style={styles.attendanceBox}
            onPress={() => navigation.navigate("AttendanceScreen")}
          >
            {/* Date (left) + Hours with Clock (right) in same row */}
            <View style={styles.headerRow}>
              <Text style={styles.attendanceTitle}>
                {today.toLocaleDateString("en-US", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                })}
              </Text>

              <View style={styles.totalHoursRow}>
                <Ionicons name="time-outline" size={20} color="#fff" />
                <Text style={styles.hours}>{totalHours}</Text>
              </View>
            </View>

            <View style={styles.timeRow}>
              <Text style={styles.timeLabel}>Time in :</Text>
              <Text style={styles.timeValue}>
                {sessions[0]?.time_in
                  ? new Date(sessions[0]?.time_in).toLocaleTimeString("en-US", {
                    hour: "numeric",
                    minute: "2-digit",
                    hour12: true,
                  })
                  : "-- --"}
              </Text>
            </View>

            <View style={styles.timeRow}>
              <Text style={styles.timeLabel}>Time Out :</Text>
              <Text style={styles.timeValue}>
                {getLatestSession()?.time_out
                  ? new Date(getLatestSession()?.time_out).toLocaleTimeString("en-US", {
                    hour: "numeric",
                    minute: "2-digit",
                    hour12: true,
                  })
                  : "-- --"}
              </Text>
            </View>

            <View style={styles.line} />
          </Pressable>

        </ScrollView>
      </RefreshWrapper>
      {!punching && (


        <View style={styles.bottomNavbarContainer}>

          <BottomNavbar navigation={navigation} route={route} />
        </View>
      )}



    </SafeAreaView>
  );
};

export default AttendanceScreen;


