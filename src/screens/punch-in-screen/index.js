import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation, useRoute } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "./styles";
import BottomNavbar from "../BottomNavbar";
import SwipeButton from "../../components/swipe/index"
import authAxios from "@/src/utils/authAxios";

const defaultAvatar = "https://cdn-icons-png.flaticon.com/512/149/149071.png";

const AttendanceScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sessions, setSessions] = useState([]);
  const [totalHours, setTotalHours] = useState("00:00 Hrs");
  const [punching, setPunching] = useState(false);
  const [token, setToken] = useState(null);
  const [isPunchedIn, setIsPunchedIn] = useState(false);

  const handleSwipe = () => {
    const nextState = !isPunchedIn;
    setIsPunchedIn(nextState);
    //Alert.alert('Success', nextState ? 'Punched In' : 'Punched Out');
  };

  const API_BASE_URL = "http://178.248.112.16:8000";

  const fetchTodayAttendance = async (authToken) => {
    try {
      const res = await authAxios.get(`/attendance/today/` );

      const data = res.data;
      setSessions(data.sessions || []);

      const hours = parseFloat(data.total_hours || 0);
      const h = Math.floor(hours);
      const m = Math.round((hours - h) * 60);
      setTotalHours(`${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")} Hrs`);
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





const handlePunch = async () => {
  setPunching(true);
  try {
    const response = await authAxios.post(`/attendance/swipe/`, {});
    await fetchTodayAttendance();

    setTimeout(() => {
      const latest = getLatestSession();
      setIsPunchedIn(latest?.time_in && !latest?.time_out);
    }, 200);
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
    } catch (err) {
      console.error("Init error:", err.message);
    } finally {
      setLoading(false);
    }
  })();
}, []);

const today = new Date();
const todayMonth = today.toLocaleString("en-US", { month: "short" });

const yesterday = new Date(today);
yesterday.setDate(today.getDate() - 1);

const calendarData = Array.from({ length: 6 }, (_, i) => {
  const date = new Date();
  date.setDate(today.getDate() - 1 + i);
  return {
    day: date.toLocaleString("en-US", { weekday: "short" }),
    date: date.getDate(),
    isToday: date.toDateString() === today.toDateString(),
    isYesterday: date.toDateString() === yesterday.toDateString(),
  };
});


  const timeIn = sessions[0]?.time_in || "------";
  const lastOut = getLatestSession()?.time_out;
  const timeOut = lastOut  ? lastOut : "------";
  //lastOut.substring(0, 5) 
  console.log("lastOut",lastOut)
  // : 
  // //console.log("uuu",lastOut)
  // "------";
//console.log("lastOut",lastOut)
  const avatarSource = employee?.profile_pic
    ? { uri: `${API_BASE_URL}${employee.profile_pic}` }
    : { uri: defaultAvatar };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={{ textAlign: "center", marginTop: 50 }}>Loading...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerWrapper}>
        <ScrollView contentContainerStyle={styles.scrollView} showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View style={styles.homeBox}>
            <View style={styles.homeContent}>
              <View>
                <Text style={styles.homeTitle}>Home</Text>
                <Text style={styles.welcomeText}>
                  Hey {employee?.name}{"\n"}welcome back!
                </Text>
              </View>
              <TouchableOpacity
            onPress={() => navigation.navigate("ProfileScreen")}
          >
              <Image source={avatarSource} style={styles.profilePic} /></TouchableOpacity>
            </View>
          </View>

          {/* Department - Clickable */}
          <TouchableOpacity
            onPress={() => navigation.navigate("DepartmentScreen", { department: employee?.department })}
          >
            <Text style={styles.sectionTitle}>Department</Text>
            <View style={styles.departmentCard}>
              <Text style={styles.departmentName}>{employee?.department?.name || "N/A"}</Text>
              <Text style={styles.teamLeadLabel}>Team lead</Text>
              <View style={styles.leadContainer}>
                <Image source={avatarSource} style={styles.avatar} />
                <Text style={styles.leadName}>{employee?.department?.head || "N/A"}</Text>
              </View>
            </View>
          </TouchableOpacity>

          {/* Attendance calendar */}
          <TouchableOpacity onPress={() => navigation.navigate("AttendanceScreen", {
            sessions,
            totalHours,
            timeIn,
            timeOut,
            date: today.toDateString(),
          })}>
            <Text style={styles.sectionTitle}>Attendance</Text>
          <View style={styles.calendarRow}>
  {calendarData.map((item, index) => (
    <View
      key={index}
      style={[
        styles.dayBox,
        item.isYesterday && { backgroundColor: '#3352BA' },
        item.isToday && { backgroundColor: '#FFFFFF' },
      ]}
    >
      <Text
        style={[
          styles.dayText,
          item.isYesterday && { color: '#FFFFFF' },
          item.isToday && { color: '#000000' },
        ]}
      >
        {item.day}
      </Text>
      <Text
        style={[
          styles.dateText,
          item.isYesterday && { color: '#FFFFFF' },
          item.isToday && { color: '#000000' },
        ]}
      >
        {item.date} {todayMonth}
      </Text>
      {item.isYesterday && (
        <Ionicons
          name="checkmark-circle"
          color="#FFFFFF"
          size={20}
          style={{ marginTop: 4 }}
        />
      )}
    </View>
  ))}
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
    {timeIn ? new Date(timeIn).toLocaleTimeString() : '-- --'}
  </Text>
</View>

<View style={styles.timeRow}>
  <Text style={styles.timeLabel}>Time Out :</Text>
  <Text style={styles.timeValue}>
    {timeOut ? new Date(timeOut).toLocaleTimeString() : '-- --'}
  </Text>
</View>
              <View style={styles.line} />
              <View style={styles.totalHoursRow}>
                <Ionicons name="time-outline" size={20} color="#fff" />
                <Text style={styles.totalHoursText}> Total hours</Text>
                <Text style={styles.hours}>{totalHours}</Text>
              </View>
            </View>
          </TouchableOpacity>

          {/* Swipe Button */}
          {/* <TouchableOpacity style={styles.swipeButton} onPress={handlePunch} disabled={punching}>
            <Ionicons name="arrow-forward-circle" size={28} color="#0E53CC" />
            <Text style={styles.swipeText}>
              {punching
                ? "Processing..."
                : isCurrentlyPunchedIn()
                ? "Swipe to punch out"
                : "Swipe to punch in"}
            </Text>
          </TouchableOpacity> */}

{/* 
<SwipeButton
        title={isPunchedIn ? 'Swipe to Punch Out' : 'Swipe to Punch In'}
        successTitle={isPunchedIn ? 'Punched Out!' : 'Punched In!'}
        onSwipeSuccess={handleSwipe}
        backgroundColor="#ddd"
        thumbColor={isPunchedIn ? '#e53935' : '#43a047'}
      /> */}
     {/* <SwipeButton
  title={isCurrentlyPunchedIn() ? 'Swipe to Punch Out' : 'Swipe to Punch In'}
  successTitle={isCurrentlyPunchedIn() ? 'Punched Out!' : 'Punched In!'}
  onSwipeSuccess={() => {
    if (!punching) {
      handlePunch(); // hit backend
    }
  }}
  backgroundColor="#ddd"
  thumbColor={isCurrentlyPunchedIn() ? '#e53935' : '#43a047'}
  resetAfterSuccess={true}
/>*/}
<SwipeButton
  title={isCurrentlyPunchedIn() ? 'Swipe to Punch Out' : 'Swipe to Punch In'}
  successTitle={isCurrentlyPunchedIn() ? 'Punched Out!' : 'Punched In!'}
  onSwipeSuccess={() => {
    
      handlePunch();
    
  }}
  backgroundColor="#ddd"
  thumbColor={isCurrentlyPunchedIn() ? '#172554' : '#4375a0ff'}
  resetAfterSuccess={true}
/>

        </ScrollView>
      </View>
      <BottomNavbar navigation={navigation} route={route} />
    </SafeAreaView>
  );
};

export default AttendanceScreen;
