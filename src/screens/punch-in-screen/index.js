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
import LocationDisclosure from "@/src/utils/LocationDisclosure"
import { maybeAskBatteryPermission } from "@/src/utils/Batteryoptimization";
import {
  getCurrentLocation,
  startBackgroundTracking,
  requestForegroundLocationPermission,
  stopBackgroundTracking,
} from "../../services/locationService.js";
import {
  buildAuthenticatedImageSource,
  normalizeMediaUri,
} from "../../utils/mediaSource";

import Svg, { Defs, RadialGradient, Stop, Circle, SvgXml } from "react-native-svg";
import AsyncStorage from "@react-native-async-storage/async-storage";
const defaultAvatar = "https://cdn-icons-png.flaticon.com/512/149/149071.png";

const AttendanceScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sessions, setSessions] = useState([]);
  const [totalHours, setTotalHours] = useState("00:00 Hrs");
  const [punching, setPunching] = useState(false);
  const [pendingLeaves, setPendingLeaves] = useState();
  const [showDisclosure, setShowDisclosure] = useState(false);
  const [punchedIn, setPunchedIn] = useState(false);
  const [dayStatus, setDayStatus] = useState([]);
  const [mediaToken, setMediaToken] = useState(null);
  const [companyLogoUri, setCompanyLogoUri] = useState(null);
  const [companyLogoSvgXml, setCompanyLogoSvgXml] = useState(null);
  const [profileImageFailed, setProfileImageFailed] = useState(false);
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
      const month = firstDate.getMonth();
      const daysInMonth = new Date(year, month + 1, 0).getDate();

      const allDates = [];
      for (let day = 1; day <= daysInMonth; day++) {
        const iso = `${year}-${String(month + 1).padStart(2, "0")}-${String(
          day
        ).padStart(2, "0")}`;
        allDates.push(iso);
      }

      allDates.forEach((date) => {
        if (data.company_off_day_dates.includes(date)) {
          statusMap[date] = "holiday";
        } else {
          statusMap[date] = "working";
        }
      });

      data.present_days_dates.forEach((date) => (statusMap[date] = "present"));
      data.absent_days_dates.forEach((date) => (statusMap[date] = "absent"));
      data.holidays_dates.forEach((date) => (statusMap[date] = "holiday"));

      data.half_days_dates.forEach((date) => (statusMap[date] = "half"));

      const orderedStatuses = allDates.map((date) => statusMap[date]);
      setDayStatus(orderedStatuses);
    } catch (error) {
      console.log("Failed to fetch day status:", error);
      setDayStatus([]);
    }
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

  const requestLocationPermissions = async () => {
    const granted = await requestForegroundLocationPermission();

    if (!granted) {
      Alert.alert("Permission required", "Location access is required");
      return false;
    }

    return true;
  };
  const handlePunch = async () => {
    setPunching(true);
    startRotation();

    try {
      if (!employee?.id) {
        Alert.alert("Employee not ready");
        return;
      }

      const permissionGranted = await requestLocationPermissions();

      if (!permissionGranted) {
        Alert.alert("Location permission required");
        return;
      }

      const location = await getCurrentLocation();

      const res = await authAxios.post("/attendance/swipe/", {
        latitude: Number(location.coords.latitude),
        longitude: Number(location.coords.longitude),
      });

      await fetchTodayAttendance();

      if (res.data?.action === "punch_in" && res.data?.session_id) {
        const employeeId = employee.id.toString();
        const sessionId = res.data.session_id.toString();

        await AsyncStorage.multiSet([
          ["employeeId", employeeId],
          ["sessionId", sessionId],
          ["punchedIn", "true"],
        ]);

        setPunchedIn(true);

        const trackingStarted = await startBackgroundTracking({
          employeeId: employee.id,
          sessionId: res.data.session_id,
          intervalMinutes: 15,
        });

        if (trackingStarted) {
          maybeAskBatteryPermission();
        } else {
          Alert.alert(
            "Tracking Warning",
            "Punch-in succeeded, but background location tracking could not be fully started. Please allow background location and disable battery restrictions for Rekory."
          );
        }
      }

      if (res.data?.action === "punch_out") {
        await stopBackgroundTracking();
        setPunchedIn(false);
      }
    } catch (error) {
      console.log("PUNCH ERROR:", error);
      console.log("SERVER:", error?.response?.data);

      Alert.alert(
        "Punch Failed",
        JSON.stringify(error?.response?.data || error.message)
      );
    } finally {
      setPunching(false);
      stopRotation();
    }
  };

  useEffect(() => {
    const initialize = async () => {
      try {
        // Fetch employee
        const [profileRes, accessToken] = await Promise.all([
          authAxios.get("/profile/"),
          AsyncStorage.getItem("accessToken"),
        ]);

        setEmployee(profileRes.data);
        setMediaToken(accessToken);
        setCompanyLogoUri(normalizeMediaUri(profileRes.data?.company_logo));
        setProfileImageFailed(false);

        // Attendance refresh
        await fetchTodayAttendance();

        // Restore punch state
        const storedPunch = await AsyncStorage.getItem("punchedIn");

        setPunchedIn(storedPunch === "true");

      } catch (err) {
        console.log("INIT ERROR:", err);
      } finally {
        setLoading(false);
      }
    };

    initialize();
  }, []);
console.log("IMAGE URL:", normalizeMediaUri(employee?.profile_pic));
  useEffect(() => {
    const loadCompanyLogoSvg = async () => {
      if (!companyLogoUri?.toLowerCase().endsWith(".svg")) {
        setCompanyLogoSvgXml(null);
        return;
      }

      try {
        const response = await authAxios.get(companyLogoUri, {
          responseType: "text",
        });
        setCompanyLogoSvgXml(response.data);
      } catch (error) {
        console.log("Company logo SVG load failed", error?.message || error);
        setCompanyLogoSvgXml(null);
      }
    };

    loadCompanyLogoSvg();
  }, [companyLogoUri]);

  const today = new Date();
  const todayMonth = today.toLocaleString("en-US", { month: "long" });
  const todayWeekday = today.toLocaleString("en-US", { weekday: "long" });

  const getSegment = (status, index) => {
    const total = dayStatus.length;
    const angle = (360 / total) * index;

    let segmentContent;

    if (status === "half") {
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
            <Circle cx="80" cy="80" r="80" fill="url(#grad)" />
          </Svg>

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
              {companyLogoSvgXml ? (
                <SvgXml
                  xml={companyLogoSvgXml}
                  width={70}
                  height={40}
                />
              ) : companyLogoUri ? (
                <Image
                  source={buildAuthenticatedImageSource({
                    path: employee?.company_logo,
                    token: mediaToken,
                  })}
                  style={styles.logo}
                  onError={() => setCompanyLogoUri(null)}
                />
              ) : null}

              <Text style={styles.helloText}>
                Hello {employee?.name || "User"}
              </Text>
            </View>

            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => navigation.navigate("ProfileScreen")}
            >
              <Image
                source={buildAuthenticatedImageSource({
                  path: profileImageFailed ? null : employee?.profile_pic,
                  token: mediaToken,
                  fallbackUri: defaultAvatar,
                })}
                style={styles.profilePic}
                onError={() => setProfileImageFailed(true)}
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

              <LeaveIcon width={28} height={28} style={{ marginTop: 6 }} />

              <Text style={{
                color: "#fff",
                fontSize: 20,
                fontWeight: "700",
                marginTop: 2,
                marginBottom: -25
              }}>
                {pendingLeaves}
              </Text>

              <Text style={[styles.menuText, { marginTop: 2 }]}>Leave Status</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.menuBox, styles.applyLeaveBox]}
              onPress={() => navigation.navigate("LeaveRequestFormScreen")}
            >
              <Text style={styles.menuText}>Apply leave</Text>
              <Text style={{ color: "#fff", fontSize: 22, marginTop: 4 }}>+</Text>
            </TouchableOpacity>
          </View>

          {punching ? (
            <View style={styles.loaderOverlay}>
              <View style={styles.logoWrapper}>
                <Image
                  source={require("../../../assets/images/logo.png")}
                  style={styles.logoImage}
                  resizeMode="contain"
                />


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
              title={punchedIn ? "Swipe to Punch Out" : "Swipe to Punch In"}
              successTitle={punchedIn ? "Punched Out!" : "Punched In!"}
              onSwipeSuccess={() => {
                if (!punchedIn) {
                  setShowDisclosure(true);
                } else {
                  handlePunch();
                }
              }}
              backgroundColor="#ddd"
              thumbColor={punchedIn ? "#ED2B2B" : "#2F822F"}
              resetAfterSuccess={true}
            />

          )}



          <Pressable
            style={styles.attendanceBox}
            onPress={() => navigation.navigate("AttendanceScreen")}
          >
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
      <LocationDisclosure
        visible={showDisclosure}
        onAgree={() => {
          setShowDisclosure(false);
          handlePunch();
        }}
        onCancel={() => setShowDisclosure(false)}
      />


    </SafeAreaView>
  );
};

export default AttendanceScreen;
