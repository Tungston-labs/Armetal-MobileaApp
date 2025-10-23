import React, { useState } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import styles from "./styles";
import BottomNavbar from "../BottomNavbar";
import HolidayTab from "./holiday-list-screen";
import ReminderTab from "./schedule-reminder-screen.js";
import SwipeLoader from "../../components/SwipeLoader"
import { Ionicons, AntDesign } from '@expo/vector-icons';
const CalendarScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const [activeTab, setActiveTab] = useState(route.params?.openTab || "holiday");
  const [loading, setLoading] = useState(false); 

  React.useEffect(() => {
    if (route.params?.openTab) {
      setActiveTab(route.params.openTab);
    }
  }, [route.params?.openTab]);

  // optional: simulate loading when switching tabs
  const handleTabChange = (tab) => {
    setLoading(true);
    setActiveTab(tab);
    // simulate async fetch
    setTimeout(() => setLoading(false), 500);
  };

  return (
    <>
      <View style={styles.container}>
        {/* Header */}
      <View style={styles.header}>
  <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
    <Ionicons name="arrow-back" size={24} color="#fff" />
  </TouchableOpacity>
  <Text style={styles.headerTitle}>Calendar</Text>
  <View style={{ width: 24 }} />
</View>


        {/* Tabs */}
        <View style={styles.tabsContainer}>
          <TouchableOpacity
            onPress={() => handleTabChange("holiday")}
            style={[
              styles.tabButton,
              activeTab === "holiday" && styles.activeTab,
            ]}
          >
            <Text style={styles.tabText}>Public Holiday</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleTabChange("reminder")}
            style={[
              styles.tabButton,
              activeTab === "reminder" && styles.activeTab,
            ]}
          >
            <Text style={styles.tabText}>Schedule Reminder</Text>
          </TouchableOpacity>
        </View>

        {/* Tab Content */}
        {loading ? (
          <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <SwipeLoader size="large" color="#3352BA" />
          </View>
        ) : activeTab === "holiday" ? (
          <HolidayTab />
        ) : (
          <ReminderTab />
        )}
      </View>

      <View style={styles.bottomNavbarContainer}>
        <BottomNavbar navigation={navigation} route={route} />
      </View>
    </>
  );
};

export default CalendarScreen;
