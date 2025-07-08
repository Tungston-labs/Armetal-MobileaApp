import React from "react";
import {
  View,
  Text,
  Image,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import styles from "./styles";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation, useRoute } from "@react-navigation/native";
import BottomNavbar from "../BottomNavbar";

const defaultAvatar = "https://cdn-icons-png.flaticon.com/512/149/149071.png";

const PunchoutScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const {
    timeIn = "------",
    date = "Today",
    department = "N/A",
    leadName = "N/A",
    avatar = defaultAvatar,
    employeeName = "User",
    totalHours = "00:00 Hrs",
  } = route.params || {};

  const handlePunchOut = () => {
    Alert.alert("Punch Out", "Punch out successful!");
    // You can trigger an API call here if needed
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        {/* Header */}
        <View style={styles.homeBox}>
          <View style={styles.headerRow}>
            <View>
              <TouchableOpacity onPress={() => navigation.navigate("PunchinScreen")}>
                <Text style={styles.homeTitle}>Home</Text>
              </TouchableOpacity>
              <View style={{ marginTop: 6 }}>
                <Text style={styles.welcomeText}>Hey {employeeName}</Text>
                <Text style={styles.welcomeText}>welcome back!</Text>
              </View>
            </View>
            <Image source={{ uri: avatar }} style={styles.profilePic} />
          </View>
        </View>

        {/* Department */}
        <Text style={styles.sectionTitle}>Department</Text>
        <View style={styles.departmentCard}>
          <Text style={styles.departmentName}>{department}</Text>
          <View style={styles.leadContainer}>
            <Image source={{ uri: avatar }} style={styles.avatar} />
            <Text style={styles.leadName}>{leadName}</Text>
          </View>
        </View>

        {/* Attendance */}
        <Text style={styles.sectionTitle}>Attendance</Text>
        <View style={styles.attendanceBox}>
          <Text style={styles.attendanceTitle}>{date}</Text>

          <View style={styles.timeRow}>
            <Text style={styles.label}>Punch in</Text>
            <Text style={styles.timeLabel}>Time in :</Text>
            <Text style={styles.timeValue}>{timeIn}</Text>
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
            <Text style={styles.hours}>{totalHours}</Text>
          </View>
        </View>

        {/* Punch out swipe */}
        <TouchableOpacity style={styles.swipeButton} onPress={handlePunchOut}>
          <Ionicons name="arrow-forward-circle" size={28} color="#0E53CC" />
          <Text style={styles.swipeText}> Swipe to punch out</Text>
        </TouchableOpacity>
      </ScrollView>

      <BottomNavbar navigation={navigation} route={route} />
    </SafeAreaView>
  );
};

export default PunchoutScreen;
