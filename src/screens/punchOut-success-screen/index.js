import React from 'react';
import {
  View,
  Text,
  Image,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import styles from './styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
const calendarData = ['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'];
const dates = ['12', '13', '14', '15', '16', '17'];

const PunchOutSuccessScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerWrapper}>
        <ScrollView
          contentContainerStyle={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          {/* Home Header */}
          <View style={styles.homeBox}>
            <View style={styles.homeContent}>
              <View>
                <Text style={styles.homeTitle}>Home</Text>
                <Text style={styles.welcomeText}>
                  Hey Ajay kumar{'\n'}welcome back!
                </Text>
              </View>
              <Image source={avatar} style={styles.profilePic} />
            </View>
          </View>

          {/* Department Section */}
          <Text style={styles.sectionTitle}>Department</Text>
          <View style={styles.departmentCard}>
            <Text style={styles.departmentName}>Q&A Testing</Text>
            <Text style={styles.teamLeadLabel}>Team lead</Text>
            <View style={styles.leadContainer}>
              <Image source={avatar} style={styles.avatar} />
              <Text style={styles.leadName}>Abdul Rahuman</Text>
            </View>
          </View>

          {/* Attendance */}
          <Text style={styles.sectionTitle}>Attendance</Text>
          <View style={styles.calendarRow}>
            {calendarData.map((day, index) => (
              <View
                key={index}
                style={[styles.dayBox, index === 1 && styles.activeDay]}
              >
                <Text style={[styles.dayText, index === 1 && styles.activeDayText]}>
                  {day}
                </Text>
                <Text style={[styles.dateText, index === 1 && styles.activeDateText]}>
                  {dates[index]} Mar
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
          <View style={styles.attendanceBox}>
            <Text style={styles.attendanceTitle}>Thursday 13 march</Text>
            <View style={styles.timeRow}>
              <Text style={styles.timeLabel}>Time in :</Text>
              <Text style={styles.timeValue}>------</Text>
            </View>
            <View style={styles.timeRow}>
              <Text style={styles.timeLabel}>Time Out :</Text>
              <Text style={styles.timeValue}>------</Text>
            </View>
            <View style={styles.line} />
            <View style={styles.totalHoursRow}>
              <Ionicons name="time-outline" size={20} color="#fff" />
              <Text style={styles.totalHoursText}> Total hours</Text>
              <Text style={styles.hours}>00:00 Hrs</Text>
            </View>
          </View>

          {/* Swipe Button */}
          <TouchableOpacity style={styles.swipeButton}>
            <Ionicons name="arrow-forward-circle" size={28} color="#0E53CC" />
            <Text style={styles.swipeText}> Swipe to punch in</Text>
          </TouchableOpacity>
        </ScrollView>

        {/* Bottom Tab */}
        <View style={styles.bottomTab}>
          <Ionicons name="home" size={24} color="#fff" />
          <Ionicons name="calendar-outline" size={24} color="#fff" />
          <Ionicons name="document-text-outline" size={24} color="#fff" />
          <Ionicons name="person-outline" size={24} color="#fff" />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default PunchOutSuccessScreen;
