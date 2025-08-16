import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import styles from './styles';
import BottomNavbar from '../BottomNavbar';
                  

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

// Base date - You can replace this with a prop or a dynamic date
const baseDate = "2016-02-12"; // YYYY-MM-DD format
const daysInMonth = getDaysInMonth(baseDate);

// ✅ Standardized dayStatus array like first code
const dayStatus = [
  'present', 'present', 'present', 'present', 'present', 'present',
  'holiday', 'present', 'present', 'absent',
  'present', 'present', 'holiday', 'present', 'present',
  'present', 'present', 'absent', 'present', 'holiday',
  'present', 'present', 'present', 'absent', 'present',
  'holiday', 'present', 'present', 'present', 'absent'
];

// ✅ SAME getSegment function as first code
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

export default function WorkingDaySummary() {
  const navigation = useNavigation();
  const route = useRoute();

  const today = new Date();
  const todayMonth = today.toLocaleString("en-US", { month: "long" });
  const todayWeekday = today.toLocaleString("en-US", { weekday: "long" });

  return (
    <ScrollView style={styles.container}>
     
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()} // Goes to previous screen
        >
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Working Day Summary</Text>
      </View>

      {/* ✅ Radial Circle SAME AS FIRST CODE */}
      <View style={{ alignItems: "center" }}>
        <TouchableOpacity
          style={styles.circleWrapper}
          activeOpacity={0.8}
        >
          {dayStatus.map((status, index) => getSegment(status, index))}
          <View style={styles.circle}>
            <Text style={styles.dayText}>{todayWeekday}</Text>
            <Text style={styles.monthText}>{todayMonth}</Text>
            <Text style={styles.dateText}>{today.getDate()}</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Summary */}
      <View style={styles.summaryCard}>
        <View style={styles.row}>
          <Text style={styles.label}>Total Working Days</Text>
          <Text style={styles.value}>{daysInMonth}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.subLabel}>Total Work Hours (This Month)</Text>
          <Text style={styles.subValue}>95.23 Hrs</Text>
        </View>
        <View style={styles.centerRow}>
          <Ionicons name="time-outline" size={20} color="#fff" />
          <Text style={styles.centerText}>35.22 Hrs</Text>
        </View>
      </View>

      {/* Status Summary */}
      <View style={styles.statusCard}>
        {[
          { label: 'Present Days', value: '10', borderColor: '#15B03E' },
          { label: 'Holiday', value: '2', borderColor: '#4C4C4C' },
          { label: 'Absent Days', value: '3', borderColor: '#FF2304' },
          { label: 'Absent Half day', value: '2', borderColor: 'half' },
          {
            label: 'Remaining Working Days',
            value: `${daysInMonth - 17}`,
            borderColor: '#FFFFFF',
          },
        ].map((item, idx) => (
          <View
            style={[
              styles.statusRow,
              item.borderColor === 'half'
                ? { borderLeftWidth: 3, borderLeftColor: 'transparent' }
                : { borderLeftWidth: 3, borderLeftColor: item.borderColor }
            ]}
            key={idx}
          >
            {item.borderColor === 'half' && (
              <View style={styles.halfBorderWrapper}>
                <View style={[styles.halfBorder, { backgroundColor: '#15B03E' }]} />
                <View style={[styles.halfBorder, { backgroundColor: '#FF2304' }]} />
              </View>
            )}
            <Text style={styles.statusLabel}>{item.label}</Text>
            <Text style={styles.statusValue}>{item.value}</Text>
          </View>
        ))}
      </View>

      <View style={styles.bottomNavbarContainer}>
        <BottomNavbar navigation={navigation} route={route} />
      </View>
    </ScrollView>
  );
}
