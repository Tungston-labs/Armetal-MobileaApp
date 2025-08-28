import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";
import styles from "./styles";
import BottomNavbar from "../BottomNavbar";
import authAxios from "../../utils/authAxios"; // your axios instance

// Add this at the top of your component file
const STATUS_COLORS = {
  "Approve": "#2ecc71",          // green
  "In Verification": "#facc15",  // yellow
  "On Hold": "#f97316",           // orange
  "Default": "#ccc",              // fallback color
};

export default function ReimbursementlistScreen({ navigation, route }) {
  const [reimbursements, setReimbursements] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchReimbursements = async () => {
    setLoading(true);
    try {
      const res = await authAxios.get("/reimbursements/my-reimbursements/");
      setReimbursements(res.data.results || res.data); // handle pagination or plain list
    } catch (err) {
      console.error("Failed to fetch reimbursements:", err);
      Alert.alert("Error", "Failed to fetch reimbursements.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReimbursements();
  }, []);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Reimbursement</Text>
      </View>

      {/* Scrollable Content */}
      {loading ? (
        <ActivityIndicator size="large" color="#000" style={{ marginTop: 50 }} />
      ) : (
        <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Map through reimbursements */}
        {reimbursements.map((item) => {
          const statusColor = STATUS_COLORS[item.status] || STATUS_COLORS.Default;
          return (
            <TouchableOpacity
              key={item.id}
              style={styles.card}
              activeOpacity={0.8}
              onPress={() =>
                navigation.navigate("ReimbursementScreen", { reimbursementId: item.id })
              }
            >
              {/* Status Badge */}
              <View style={[styles.statusBadge, { borderColor: statusColor }]}>
                <Text style={[styles.statusText, { color: statusColor }]}>
                  {item.status}
                </Text>
              </View>
      
              {/* Category & Amount */}
              <View style={styles.cardRow}>
                <View>
                  <Text style={styles.label}>Expense Category</Text>
                  <Text style={styles.category}>{item.expense_category}</Text>
                </View>
                <Text style={styles.amount}>AED {item.amount}</Text>
              </View>
      
              {/* Note */}
              <View style={styles.noteBox}>
                <Text style={styles.label}>Note</Text>
                <Text style={styles.note}>{item.note}</Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
      
      )}

      {/* Fixed Button */}
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
