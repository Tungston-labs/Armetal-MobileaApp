import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import styles from "./styles";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation, useRoute } from "@react-navigation/native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import authAxios from "../../utils/authAxios";
import BottomNavbar from "../BottomNavbar";
import SwipeLoader from "../../components/SwipeLoader";

/* ──────────────────────────────────────────────
   iOS SAFE DATE PARSER (DO NOT MODIFY)
────────────────────────────────────────────── */
const parseDateSafe = (value) => {
  if (!value) return null;

  // Timestamp (seconds or milliseconds)
  if (typeof value === "number") {
    return new Date(value < 1e12 ? value * 1000 : value);
  }

  if (typeof value === "string") {
    let v = value.trim();

    // dd-mm-yyyy hh:mm:ss → yyyy-mm-ddThh:mm:ssZ
    if (/^\d{2}-\d{2}-\d{4}/.test(v)) {
      const [d, m, y, h = "00", mi = "00", s = "00"] =
        v.replace(/[-:]/g, " ").split(/\s+/);
      v = `${y}-${m}-${d}T${h}:${mi}:${s}Z`;
    }

    // yyyy-mm-dd hh:mm:ss → yyyy-mm-ddThh:mm:ssZ
    if (/^\d{4}-\d{2}-\d{2}\s/.test(v)) {
      v = v.replace(" ", "T") + "Z";
    }

    // yyyy-mm-ddThh:mm:ss → add timezone
    if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/.test(v)) {
      v += "Z";
    }

    const date = new Date(v);
    return isNaN(date.getTime()) ? null : date;
  }

  return null;
};

/* ──────────────────────────────────────────────
   SCREEN
────────────────────────────────────────────── */
const AttendanceScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const [sessions, setSessions] = useState([]);
  const [totalHours, setTotalHours] = useState("00:00 Hrs");
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);

  const [selectedDate, setSelectedDate] = useState(() => {
    const { date } = route.params || {};
    return date ? new Date(date) : new Date();
  });

  /* ──────────────────────────────────────────────
     FETCH ATTENDANCE
  ─────────────────────────────────────────────── */
  const fetchAttendanceData = async () => {
    try {
      setLoading(true);

      const formattedDate = selectedDate.toLocaleDateString("en-CA");
      const res = await authAxios.get("/attendance/today", {
        params: { date: formattedDate },
      });
      console.log("ATTENDANCE API RESPONSE:", JSON.stringify(res.data, null, 2));

      const sessionData = Array.isArray(res.data.sessions)
        ? res.data.sessions
        : [];

      setSessions(sessionData);

      // ✅ TOTAL HOURS — iOS SAFE
      let totalMinutes = 0;

      sessionData.forEach((s) => {
        const start = parseDateSafe(s.time_in);
        const end = parseDateSafe(s.time_out);

        if (start && end) {
          totalMinutes += Math.max(
            0,
            (end.getTime() - start.getTime()) / 60000
          );
        }
      });

      const h = Math.floor(totalMinutes / 60);
      const m = Math.round(totalMinutes % 60);

      setTotalHours(
        `${h.toString().padStart(2, "0")}:${m
          .toString()
          .padStart(2, "0")} Hrs`
      );
    } catch (e) {
      setSessions([]);
      setTotalHours("00:00 Hrs");
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

  /* ──────────────────────────────────────────────
     TIME FORMAT — iOS SAFE
  ─────────────────────────────────────────────── */
  const formatTime = (value) => {
    const d = parseDateSafe(value);
    if (!d) return "-- --";

    const hours = d.getUTCHours();
    const minutes = d.getUTCMinutes();

    const h12 = hours % 12 || 12;
    const ampm = hours >= 12 ? "PM" : "AM";

    return `${h12.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")} ${ampm}`;
  };

  const renderItem = ({ item }) => (
    <View style={styles.row}>
      <Text style={[styles.cell, { color: "#00FF26" }]}>
        {formatTime(item.time_in)}
      </Text>
      <Text
        style={[
          styles.cell,
          { color: item.time_out ? "#FF2304" : "#ccc" },
        ]}
      >
        {formatTime(item.time_out)}
      </Text>
    </View>
  );

  /* ────────────────────────────────────────────── */
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
      <SafeAreaView style={{ flex: 0, backgroundColor: "#262D40" }} />
      <SafeAreaView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Attendance details</Text>
        </View>

        {/* Date Picker */}
        <TouchableOpacity
          style={styles.dateCard}
          onPress={() => setDatePickerVisible(true)}
        >
          <Ionicons name="calendar-outline" size={29} color="#fff" />
          <View style={{ marginLeft: 8, flex: 1 }}>
            <Text style={styles.selectDateText}>Select a day</Text>
            <Text style={styles.selectedDate}>
              {selectedDate
                .toLocaleDateString("en-GB")
                .replace(/\//g, ".")}
            </Text>
          </View>
          <Ionicons name="chevron-down" size={18} color="#fff" />
        </TouchableOpacity>

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

        {/* Table */}
        <View style={styles.tableContainer}>
          <View style={styles.tableHeader}>
            <Text style={styles.headerCell}>Punch In</Text>
            <Text style={styles.headerCell}>Punch Out</Text>
          </View>

          <View style={styles.divider} />

          <FlatList
            data={sessions}
            renderItem={renderItem}
            keyExtractor={(_, i) => i.toString()}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={handleRefresh}
              />
            }
          />
        </View>

        {/* Bottom */}
        <View style={styles.bottomNavbarContainer}>
          <View style={styles.totalHoursCard}>
            <Text style={styles.totalHoursLabel}>
              Total working hour
            </Text>
            <Text style={styles.totalHoursValue}>{totalHours}</Text>
          </View>
          <BottomNavbar navigation={navigation} route={route} />
        </View>
      </SafeAreaView>
    </>
  );
};

export default AttendanceScreen;
