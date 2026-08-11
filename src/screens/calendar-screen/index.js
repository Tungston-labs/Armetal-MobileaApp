import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import styles from "./styles";
import HolidayTab from "./holiday-list-screen";
import ReminderTab from "./schedule-reminder-screen.js";
const CalendarScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const [activeTab, setActiveTab] = useState(route.params?.openTab || "holiday");

  React.useEffect(() => {
    if (route.params?.openTab) {
      setActiveTab(route.params.openTab);
    }
  }, [route.params?.openTab]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

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
        {activeTab === "holiday" ? (
          <HolidayTab />
        ) : (
          <ReminderTab />
        )}
      </View>

      {/* <View style={styles.bottomNavbarContainer}>
        <BottomNavbar navigation={navigation} route={route} />
      </View> */}
    </>
  );
};

export default CalendarScreen;
