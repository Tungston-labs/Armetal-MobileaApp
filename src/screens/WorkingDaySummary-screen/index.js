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


// Dynamically create the dayStatus array (demo)
const dayStatus = [
  'present', 'present', 'present', 'present', 'present',
  'present', 'present', 'present', 'present', 'present',
  'holiday', 'holiday',
  'absent', 'absent', 'absent',
  'halfday', 'halfday',
  ...Array(daysInMonth - 17).fill('remaining'),
];

const getSegment = (status, index) => {
  const total = dayStatus.length;
  const angle = (360 / total) * index;

  if (status === 'halfday') {
    return (
      <View
        key={index}
        style={{
          transform: [{ rotate: `${angle}deg` }, { translateY: -100 }],
          position: 'absolute',
          width: 7,
          height: 9,
          flexDirection: 'row',
        }}
      >
        <View style={{ backgroundColor: '#00FF00', width: 4, height: 9 }} />
        <View style={{ backgroundColor: '#FF0000', width: 4, height: 9 }} />
      </View>
    );
  }

  let color = '#FFFFFF'; // default: remaining
  if (status === 'present') color = '#00FF00';
  else if (status === 'absent') color = '#FF0000';
  else if (status === 'holiday') color = '#FFD700';

  return (
    <View
      key={index}
      style={[
        styles.segment,
        {
          backgroundColor: color,
          transform: [
            { rotate: `${angle}deg` },
            { translateY: -100 },
          ],
        },
      ]}
    />
  );
};

export default function WorkingDaySummary() {
  const navigation = useNavigation();
  const route = useRoute();

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Working Day Summary</Text>
      </View>

      {/* Radial Circle */}
      <View style={styles.circleWrapper}>
        {dayStatus.map((status, index) => getSegment(status, index))}
        <View style={styles.circle}>
          <Text style={styles.dayText}>Monday</Text>
          <Text style={styles.monthText}>July</Text>
          <Text style={styles.dateText}>31</Text>
        </View>
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
          { label: 'Present Days', value: '10', color: '#15B03E' },
          { label: 'Holiday', value: '2', color: '#EFAF00' },
          { label: 'Absent Days', value: '3', color: '#FF2304' },
          {
            label: 'Absent Half day',
            value: '2',
            colorHalf: ['#15B03E', '#FF2304'],
          },
          {
            label: 'Remaining Working Days',
            value: `${daysInMonth - 17}`,
            color: '#FFFFFF',
          },
        ].map((item, idx) => (
          <View style={styles.statusRow} key={idx}>
            {item.color ? (
              <View
                style={[styles.colorBar, { backgroundColor: item.color }]}
              />
            ) : (
              <View style={styles.halfBarWrapper}>
                <View
                  style={[styles.halfBar, { backgroundColor: item.colorHalf[0] }]}
                />
                <View
                  style={[styles.halfBar, { backgroundColor: item.colorHalf[1] }]}
                />
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
