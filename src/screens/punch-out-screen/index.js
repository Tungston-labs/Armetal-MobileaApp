import React from "react";
import {
  View,
  Text,
  Image,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import styles from "./styles";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useSelector } from "react-redux";
import BottomNavbar from "../BottomNavbar";

// ✅ Fallback avatar
const defaultAvatar = "https://cdn-icons-png.flaticon.com/512/149/149071.png";

const calendarData = [
  { day: "Mon", date: "12", month: "Mar" },
  { day: "Tue", date: "13", month: "Mar" },
  { day: "Wed", date: "14", month: "Mar" },
  { day: "Thu", date: "15", month: "Mar" },
  { day: "Fri", date: "16", month: "Mar" },
  { day: "Sat", date: "17", month: "Mar" },
];

const PunchoutScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  // ✅ Get avatar safely from Redux
  const avatar = useSelector((state) => state.user?.avatar || defaultAvatar);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        {/* Header */}
        <View style={styles.homeBox}>
          <View style={styles.headerRow}>
            <View>
              <TouchableOpacity
                onPress={() => navigation.navigate("PunchinScreen")}
              >
                <Text style={styles.homeTitle}>Home</Text>
              </TouchableOpacity>

              <View style={{ marginTop: 6 }}>
                <Text style={styles.welcomeText}>Hey Ajay kumar</Text>
                <Text style={styles.welcomeText}>welcome back!</Text>
              </View>
            </View>
            <Image source={{ uri: avatar }} style={styles.profilePic} />
          </View>
        </View>

        {/* Department */}
        <Text style={styles.sectionTitle}>Department</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("DepartmentScreen")}
        >
          <View style={styles.departmentCard}>
            <Text style={styles.departmentName}>Q&A Testing</Text>
            <View style={styles.leadContainer}>
              <Image source={{ uri: avatar }} style={styles.avatar} />
              <Text style={styles.leadName}>Abdul Rahuman</Text>
            </View>
          </View>
        </TouchableOpacity>

        {/* Attendance Calendar */}
        <Text style={styles.sectionTitle}>Attendance</Text>
        <View style={styles.calendarRow}>
          {calendarData.map((item, index) => (
            <View
              key={index}
              style={[styles.dayBox, index === 1 && styles.activeDay]}
            >
              <Text
                style={[styles.dayText, index === 1 && styles.activeDayText]}
              >
                {item.day}
              </Text>
              <Text
                style={[styles.dateText, index === 1 && styles.activeDateText]}
              >
                {item.date}
              </Text>
              <Text
                style={[styles.dateText, index === 1 && styles.activeDateText]}
              >
                {item.month}
              </Text>
              {index === 0 && (
                <Ionicons
                  name="checkmark-circle"
                  color="#0ED2F6"
                  size={20}
                  style={{ marginTop: 4 }}
                />
              )}
            </View>
          ))}
        </View>

        {/* Attendance Box */}
        <TouchableOpacity
          onPress={() => navigation.navigate("AttendanceScreen")}
        >
          <View style={styles.attendanceBox}>
            <Text style={styles.attendanceTitle}>Thursday 13 March</Text>

            <View style={styles.timeRow}>
              <Text style={styles.label}>Punch in</Text>
              <Text style={styles.timeLabel}>Time in :</Text>
              <Text style={styles.timeValue}>8:30 AM</Text>
            </View>

            <View style={styles.timeRow}>
              <Text style={styles.labelDisabled}>Punch Out</Text>
              <Text style={styles.timeLabelDisabled}>Time Out :</Text>
              <Text style={styles.timeValueDisabled}>------</Text>
            </View>

            <View style={styles.line} />

            <View style={styles.totalHoursRow}>
              <Ionicons name="time-outline" size={20} color="#fff" />
              <Text style={styles.totalHoursText}>Total hours</Text>
              <Text style={styles.hours}>00:00 Hrs</Text>
            </View>
          </View>
        </TouchableOpacity>

        {/* Swipe to punch out */}
        <TouchableOpacity style={styles.swipeButton}>
          <Ionicons name="arrow-forward-circle" size={28} color="#0E53CC" />
          <Text style={styles.swipeText}> Swipe to punch out</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Bottom Tab */}
      <BottomNavbar navigation={navigation} route={route} />
    </SafeAreaView>
  );
};

export default PunchoutScreen;
