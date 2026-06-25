import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
} from "react-native";
import LeaveHeader from "../LeaveHeader-screen";
import styles from './styles';
const regularisationData = [
  {
    id: 1,
    type: "Late Punch In",
    date: "22 Jun 2026",
    reason: "Heavy traffic due to rain.",
    status: "Pending",
  },
  {
    id: 2,
    type: "Missed Punch Out",
    date: "20 Jun 2026",
    reason: "Forgot to punch out before leaving office.",
    status: "Approved",
  },
  {
    id: 3,
    type: "Missed Punch In",
    date: "18 Jun 2026",
    reason: "Mobile application was not responding.",
    status: "Rejected",
  },
  {
    id: 4,
    type: "Early Punch Out",
    date: "15 Jun 2026",
    reason: "Doctor appointment.",
    status: "Pending",
  },
];

export default function RegularisationListScreen({
  data = regularisationData,
}) {
  const [activeTab, setActiveTab] = useState("All");

  const filteredData =
    activeTab === "All"
      ? data
      : data.filter(
          (item) =>
            item.status.toLowerCase() ===
            activeTab.toLowerCase()
        );

  const getStatusColor = (status) => {
    switch (status) {
      case "Approved":
        return "#22C55E";
      case "Rejected":
        return "#EF4444";
      default:
        return "#F59E0B";
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.title}>{item.type}</Text>

      <Text style={styles.label}>
        Date: <Text style={styles.value}>{item.date}</Text>
      </Text>

      <Text style={styles.label}>
        Reason: <Text style={styles.value}>{item.reason}</Text>
      </Text>

      <View
        style={[
          styles.badge,
          { backgroundColor: getStatusColor(item.status) },
        ]}
      >
        <Text style={styles.badgeText}>{item.status}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <LeaveHeader
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 16 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}