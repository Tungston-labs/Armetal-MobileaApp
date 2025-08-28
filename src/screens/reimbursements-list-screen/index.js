import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import styles from "./styles";
import BottomNavbar from "../BottomNavbar";

const reimbursements = [
  {
    id: 1,
    status: "Approved",
    statusColor: "#2ecc71",
    category: "Enter Expense",
    amount: "AED 255",
    note: "Lorem ipsum dolor sit amet consectetur. El convallis ut lacinia purus.",
  },
  {
    id: 2,
    status: "Pending",
    statusColor: "#e74c3c",
    category: "Enter Expense",
    amount: "AED 255",
    note: "Lorem ipsum dolor sit amet consectetur. El convallis ut lacinia purus.",
  },
  {
    id: 3,
    status: "Approved",
    statusColor: "#2ecc71",
    category: "Enter Expense",
    amount: "AED 255",
    note: "Lorem ipsum dolor sit amet consectetur. El convallis ut lacinia purus.",
  },
  {
    id: 4,
    status: "Approved",
    statusColor: "#2ecc71",
    category: "Enter Expense",
    amount: "AED 255",
    note: "Lorem ipsum dolor sit amet consectetur. El convallis ut lacinia purus.",
  },
];

export default function ReimbursementlistScreen({ navigation, route }) {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Reimbursement</Text>
      </View>

      {/* Scrollable Content */}
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {reimbursements.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.card}
            activeOpacity={0.8}
            onPress={() => navigation.navigate("ReimbursementScreen")}
          >
            {/* Status Badge */}
            <View style={[styles.statusBadge, { borderColor: item.statusColor }]}>
              <Text style={[styles.statusText, { color: item.statusColor }]}>
                {item.status}
              </Text>
            </View>

            {/* Category & Amount */}
            <View style={styles.cardRow}>
              <View>
                <Text style={styles.label}>Expense Category</Text>
                <Text style={styles.category}>{item.category}</Text>
              </View>
              <Text style={styles.amount}>{item.amount}</Text>
            </View>

            {/* Note */}
            <View style={styles.noteBox}>
              <Text style={styles.label}>Note</Text>
              <Text style={styles.note}>{item.note}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Fixed Button */}
      {/* <TouchableOpacity style={styles.fixedButton}>
        <Text style={styles.fixedButtonText}>+ Reimbursement</Text>
      </TouchableOpacity> */}


      <TouchableOpacity
        style={styles.fixedButton}
        onPress={() => navigation.navigate("ReimbursementForm")}
      >
        <Text style={styles.fixedButtonText}>+ Reimbursement</Text>
      </TouchableOpacity>

      {/* Bottom Navbar */}
      <View style={styles.bottomNavbarContainer}>
        <BottomNavbar navigation={navigation} route={route} />
      </View>
    </View>
  );
}
