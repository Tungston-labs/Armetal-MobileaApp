import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import styles from "./styles";
import BottomNavbar from "../BottomNavbar";
import authAxios from "../../utils/authAxios";

const STATUS_COLORS = {
  "Approve": "#2ecc71",          // green
  "In Verification": "#facc15",  // yellow
  "On Hold": "#f97316",          // orange
  "Default": "#ccc",             // fallback color
};
const STATUS_LABELS = {
  "Approve": "Approved",
  "In Verification": "In Verification",
  "On Hold": "On Hold",
};

export default function ReimbursementlistScreen({ navigation, route }) {
  const [reimbursements, setReimbursements] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchReimbursements = async () => {
    setLoading(true);
    try {
      const res = await authAxios.get("/reimbursements/my-reimbursements/");
      setReimbursements(res.data.results || res.data);
    } catch (err) {
      console.error("Failed to fetch reimbursements:", err);
      Alert.alert("Error", "Failed to fetch reimbursements.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Refresh whenever screen comes into focus
  useFocusEffect(
    useCallback(() => {
      fetchReimbursements();
    }, [])
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Reimbursement</Text>
      </View>

      {/* Content */}
      {loading ? (
        <ActivityIndicator size="large" color="#000" style={{ marginTop: 50 }} />
      ) : (
        <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
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
                <View style={[styles.statusBadge, { borderColor: statusColor }]}>
                  <Text style={[styles.statusText, { color: statusColor }]}>
                    {STATUS_LABELS[item.status] || item.status}
                  </Text>

                </View>

                <View style={styles.cardRow}>
                  <View>
                    <Text style={styles.label}>Expense Category</Text>
                    <Text style={styles.category}>{item.expense_category}</Text>
                  </View>
                  <Text style={styles.amount}>AED {item.amount}</Text>
                </View>

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
