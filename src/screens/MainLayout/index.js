import React, { useState } from "react";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import BottomNavbar from "../BottomNavbar";

import PunchinScreen from "../punch-in-screen";
import CalendarScreen from "../calendar-screen";
import LeaveAllScreen from "../LeaveAll-screen";
import TaskUpdateScreen from "../TaskUpdate-screen";
import ReimbursementlistScreen from "../reimbursements-list-screen";
import styles from "./style";

const MainLayout = () => {
  const [activeTab, setActiveTab] = useState("PunchinScreen");
  const navigation = useNavigation();

  const renderScreen = () => {
    switch (activeTab) {
      case "PunchinScreen":
        return <PunchinScreen />;
      case "CalendarScreen":
        return <CalendarScreen />;
      case "LeaveAllScreen":
        return <LeaveAllScreen />;
      case "TaskUpdateScreen":
        return <TaskUpdateScreen />;
      case "ReimbursementlistScreen":
        return <ReimbursementlistScreen />;
      default:
        return <PunchinScreen />;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.screenWrapper}>{renderScreen()}</View>
      <BottomNavbar
        navigation={navigation}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
    </View>
  );
};

export default MainLayout;
