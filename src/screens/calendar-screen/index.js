import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation, useRoute } from "@react-navigation/native";
import HolidayTab from "./holiday-list-screen";
import ReminderTab from "./schedule-reminder-screen.js";
import styles from "./styles";
import BottomNavbar from "../BottomNavbar";

const CalendarScreen = () => {
  const navigation = useNavigation();
const route = useRoute();
const [activeTab, setActiveTab] = useState(route.params?.openTab || "holiday");

React.useEffect(() => {
  if (route.params?.openTab) {
    setActiveTab(route.params.openTab);
  }
}, [route.params?.openTab]);
  return (
    <>
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
       
        <Text style={styles.headerTitle}>Calendar</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <TouchableOpacity
          onPress={() => setActiveTab("holiday")}
          style={[
            styles.tabButton,
            activeTab === "holiday" && styles.activeTab,
          ]}
        >
          <Text style={styles.tabText}>Public Holiday</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setActiveTab("reminder")}
          style={[
            styles.tabButton,
            activeTab === "reminder" && styles.activeTab,
          ]}
        >
          <Text style={styles.tabText}>Schedule Reminder</Text>
        </TouchableOpacity>
      </View>
.
      {/* Tab Content */}
      {activeTab === "holiday" ? <HolidayTab /> : <ReminderTab />}
    </View>
      <View style={styles.bottomNavbarContainer}>
        <BottomNavbar navigation={navigation} route={route} />
      </View>
      </>
  );
};

export default CalendarScreen;
