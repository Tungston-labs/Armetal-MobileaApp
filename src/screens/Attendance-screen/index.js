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

    if (selected > today) {
      return;
    }

    setSelectedDate(selected);
    setShowCalendar(false);
  };

  useEffect(() => {
    fetchTodayAttendance();
  }, [selectedDate]);

  const fetchTodayAttendance = async () => {
    try {
      const formattedDate = selectedDate
        .toLocaleDateString("en-CA"); // gives YYYY-MM-DD in local timezone
  
      const res = await authAxios.get(`/attendance/today`, {
        params: { date: formattedDate },
      });
  
      const data = res.data;
      setSessions(data.sessions || []);
      console.log("Fetched Sessions:", data.sessions);
  
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
          hour12: true, // <-- shows AM/PM
        })
      : "-- --";
    console.log("Session item:", item);

    const punchOut = item.time_out
      ? new Date(item.time_out).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true, // <-- shows AM/PM
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

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const formatDate = (date) => {
    return new Intl.DateTimeFormat("en-GB").format(date);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons
            name="arrow-back"
            size={24}
            color="#fff"
            style={{ marginTop: 6 }}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Attendance details</Text>
        {loading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Image source={{ uri: profilePic }} style={styles.profileImage} />
        )}
      </View>

      {/* Date Selector */}
      <TouchableOpacity
        style={styles.dateCard}
        onPress={() => setShowCalendar(!showCalendar)}
      >
        <Ionicons
          name="calendar"
          size={22}
          color="#fff"
          style={{ marginRight: 10 }}
        />
        <View style={{ flex: 1 }}>
          <Text style={styles.dateLabel}>Select a day</Text>
          <Text style={styles.selectedDate}>{formatDate(selectedDate)}</Text>
        </View>
        <Ionicons
          name={showCalendar ? "chevron-up" : "chevron-down"}
          size={20}
          color="#fff"
        />
      </TouchableOpacity>

      {showCalendar && (
        <>
          <View style={styles.calendarWrapper}>
            <View style={styles.calendarContainer}>
              <Calendar
                key={calendarMonth.toISOString()}
                current={`${calendarMonth.getFullYear()}-${String(
                  calendarMonth.getMonth() + 1
                ).padStart(2, "0")}-01`}
                onDayPress={handleDateSelect}
                monthFormat={"MMMM yyyy"}
                hideExtraDays={true}
                maxDate={new Date().toISOString().split("T")[0]}
                hideArrows={true}
                dayComponent={({ date, state }) => {
                  const isSunday = new Date(date.dateString).getDay() === 0;
                  return (
                    <TouchableOpacity
                      onPress={() =>
                        handleDateSelect({
                          dateString: date.dateString,
                          timestamp: new Date(date.dateString).getTime(),
                        })
                      }
                    >
                      <Text
                        style={{
                          textAlign: "center",
                          padding: 8,
                          borderRadius: 8,
                          backgroundColor:
                            formatDate(selectedDate) ===
                            formatDate(new Date(date.dateString))
                              ? "#2814e0ff"
                              : "transparent",
                          color: isSunday
                            ? "#FF4B4B"
                            : state === "disabled"
                            ? "#3e4e6c"
                            : "#fff",
                        }}
                      >
                        {date.day}
                      </Text>
                    </TouchableOpacity>
                  );
                }}
                renderHeader={(date) => {
                  const month = monthNames[date.getMonth()];
                  const year = date.getFullYear();

                  return (
                    <View style={styles.calendarHeader}>
                      <View style={styles.monthWithArrow}>
                        <TouchableOpacity
                          onPress={() => {
                            const newDate = new Date(calendarMonth);
                            newDate.setMonth(newDate.getMonth() - 1);
                            setCalendarMonth(newDate);
                          }}
                        >
                          <Ionicons
                            name="chevron-back"
                            size={22}
                            color="#fff"
                          />
                        </TouchableOpacity>
                        <Text style={styles.monthText}>{month}</Text>
                        <TouchableOpacity
                          onPress={() => {
                            const newDate = new Date(calendarMonth);
                            newDate.setMonth(newDate.getMonth() + 1);
                            setCalendarMonth(newDate);
                          }}
                        >
                          <Ionicons
                            name="chevron-forward"
                            size={22}
                            color="#fff"
                          />
                        </TouchableOpacity>
                      </View>
                      
                      <TouchableOpacity
                        onPress={() => setYearPickerVisible(true)}
                      >
                        <Text style={styles.yearText}>{year}</Text>
                      </TouchableOpacity>
                    </View>
                  );
                }}
                theme={{
                  backgroundColor: "#172554",
                  calendarBackground: "#172554",
                  textSectionTitleColor: "#fff",
                  selectedDayBackgroundColor: "#2814e0ff",
                  selectedDayTextColor: "#fff",
                  todayTextColor: "#fff",
                  dayTextColor: "#fff",
                  textDisabledColor: "#3e4e6c",
                  arrowColor: "#fff",
                }}
                style={styles.calendar}
              />

              {/* Year Picker Modal */}
              {yearPickerVisible && (
                <Modal transparent animationType="fade">
                  <View style={styles.modalOverlay}>
                    <View style={styles.yearPickerContainer}>
                      <FlatList
                        data={Array.from({ length: 20 }, (_, i) => 2010 + i)}
                        keyExtractor={(item) => item.toString()}
                        renderItem={({ item }) => (
                          <TouchableOpacity
                            onPress={() => {
                              const updated = new Date(calendarMonth);
                              updated.setFullYear(item);
                              setCalendarMonth(updated); // This re-renders calendar
                              setYearPickerVisible(false);
                            }}
                          >
                            <Text style={styles.yearItem}>{item}</Text>
                          </TouchableOpacity>
                        )}
                      />
                    </View>
                  </View>
                </Modal>
              )}
            </View>
          </View>

          {/* Action Buttons */}
          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setShowCalendar(false)}
            >
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.doneButton}
              onPress={() => setShowCalendar(false)}
            >
              <Text style={styles.doneText}>Done</Text>
            </TouchableOpacity>
          </View>
        </>
      )}

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
        />
      </View>

      {/* Bottom Navigation */}
      <View style={styles.bottomNavbarContainer}>
        <BottomNavbar navigation={navigation} route={route} />
      </View>
    </SafeAreaView>
  );
};

export default AttendanceScreen;
