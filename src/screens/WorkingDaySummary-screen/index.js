import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import styles from "./styles";
import BottomNavbar from "../BottomNavbar";
import authAxios from "@/src/utils/authAxios";
import { useSafeAreaInsets } from "react-native-safe-area-context";
// import { LinearGradient } from "expo-linear-gradient";
// import { BlurView } from "expo-blur";
import Svg, { Defs, RadialGradient, Stop, Circle } from "react-native-svg";

function formatHours(decimalHours) {
  const h = Math.floor(decimalHours);           // integer hours
  const m = Math.round((decimalHours - h) * 60); // minutes
  return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
}
// Get number of days in a given date's month
function getDaysInMonth(dateStr) {
  const date = new Date(dateStr);
  if (isNaN(date)) {
    throw new Error("Invalid date format. Use YYYY-MM-DD.");
  }

  const year = date.getFullYear();
  const month = date.getMonth(); // 0-indexed: January is 0

  return new Date(year, month + 1, 0).getDate();
}

export default function WorkingDaySummary() {
  const navigation = useNavigation();
  const route = useRoute();
  const insets = useSafeAreaInsets();
  const [dayStatus, setDayStatus] = useState([]);
  const [summary, setSummary] = useState(null);

  const today = new Date();
  const todayMonth = today.toLocaleString("en-US", { month: "long" });
  const todayWeekday = today.toLocaleString("en-US", { weekday: "long" });

  useEffect(() => {
    const fetchDayStatus = async () => {
      try {
        const response = await authAxios.get("/employee-monthly-summary/");
        const data = response.data;
        setSummary(data); // store full API response for summary section

        // Default every working day to 'working'
        const statusMap = {};
        data.total_working_days_dates.forEach((date) => {
          statusMap[date] = "working";
        });

        // Mark present, absent, holidays (only if not half-day)
        data.present_days_dates.forEach((date) => {
          if (!statusMap[date]?.includes("half")) statusMap[date] = "present";
        });
        data.absent_days_dates.forEach((date) => {
          if (!statusMap[date]?.includes("half")) statusMap[date] = "absent";
        });
        data.holidays_dates.forEach((date) => {
          if (!statusMap[date]?.includes("half")) statusMap[date] = "holiday";
        });

        // Finally, mark half-days (overrides present/absent)
        data.half_days_dates.forEach((date) => {
          statusMap[date] = "half";
        });

        // Add Sundays as holiday if not already present
        const month = data.total_working_days_dates[0].slice(0, 7); // "YYYY-MM"
        const year = parseInt(month.split("-")[0], 10);
        const monthIndex = parseInt(month.split("-")[1], 10) - 1;
        const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();

        for (let day = 1; day <= daysInMonth; day++) {
          const dateStr = `${year}-${String(monthIndex + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
          const dayOfWeek = new Date(year, monthIndex, day).getDay();
          if (dayOfWeek === 0 && !statusMap[dateStr]) { // Sunday
            statusMap[dateStr] = "holiday";
          }
        }

        // Convert to ordered array
        const allDates = [];
        for (let day = 1; day <= daysInMonth; day++) {
          allDates.push(`${year}-${String(monthIndex + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`);
        }
        const orderedStatuses = allDates.map(date => statusMap[date] || "working");

        setDayStatus(orderedStatuses);
      } catch (error) {
        console.error("Failed to fetch day status:", error);
        setDayStatus([]);
      }
    };

    fetchDayStatus();
  }, []);


  const getSegment = (status, index) => {
    const total = dayStatus.length;
    const angle = (360 / total) * index;

    if (status === "half") {
      return (
        <View
          key={index}
          style={[
            styles.segment,
            { transform: [{ rotate: `${angle}deg` }, { translateY: -85 }] },
          ]}
        >
          <View style={styles.halfSegmentContainer}>
            <View style={[styles.halfSegment, { backgroundColor: "#15B03E" }]} />
            <View style={[styles.halfSegment, { backgroundColor: "#FF2304" }]} />
          </View>
        </View>
      );
    }

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

  return (
    <View style={{ flex: 1, backgroundColor: "#151D34" }}>

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#fff" style={{ marginTop: 36, marginLeft: 12, }} />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Working Day Summary</Text>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 150 }}
        showsVerticalScrollIndicator={false}
      >


        {/* Circle */}
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

        {/* Summary */}
        {summary && (
          <View style={styles.summaryCard}>
            <View style={styles.row}>
              <Text style={styles.label}>Total Working Days</Text>
              <Text style={styles.value}>{summary.total_working_days}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.subLabel}>Total Work Hours (This Month) </Text>
              <Text style={styles.subValue}>
                {formatHours(summary.total_working_hours)} Hrs
              </Text>
            </View>

            {/* Divider line */}
            <View style={styles.divider} />

            <View style={styles.centerRow}>
              <Ionicons name="time-outline" size={24} color="#fff" />
              <Text style={styles.centerText}>
                {formatHours(summary.total_working_hours)} Hrs
              </Text>
            </View>
          </View>
        )}

        {/* Status Summary */}
        {summary && (
          <View style={styles.statusCard}>
            {[
              {
                label: "Full Days",
                value: summary.present_days_count,
                borderColor: "#15B03E",
              },
              {
                label: "Holiday",
                value: summary.holidays_count,
                borderColor: "#4C4C4C",
              },
              {
                label: "Absent Days",
                value: summary.absent_days_count,
                borderColor: "#FF2304",
              },
              {
                label: "Half day",
                value: summary.half_days_count,
                borderColor: "half",
              },
              {
                label: "Remaining Working Days",
                value: summary.remaining_working_days_count,
                borderColor: "#FFFFFF",
              },
            ].map((item, idx) => (
              <View
                style={[
                  styles.statusRow,
                  item.borderColor === "half"
                    ? { borderLeftWidth: 3, borderLeftColor: "transparent" }
                    : { borderLeftWidth: 3, borderLeftColor: item.borderColor },
                ]}
                key={idx}
              >
                {item.borderColor === "half" && (
                  <View style={styles.halfBorderWrapper}>
                    <View
                      style={[styles.halfBorder, { backgroundColor: "#15B03E" }]}
                    />
                    <View
                      style={[styles.halfBorder, { backgroundColor: "#FF2304" }]}
                    />
                  </View>
                )}
                <Text style={styles.statusLabel}>{item.label}</Text>
                <Text style={styles.statusValue}>{item.value}</Text>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
      <View
        style={[
          styles.bottomNavbarContainer,
        ]}
      >
        <BottomNavbar navigation={navigation} route={route} />
      </View>
    </View>
  );
}
