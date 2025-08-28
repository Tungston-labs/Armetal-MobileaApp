import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons"; 
import styles from "./styles";
import BottomNavbar from "../BottomNavbar";
import authAxios from "../../utils/authAxios";

const STATUS_COLORS = {
  "Approve": "#2ecc71",
  "In Verification": "#facc15",
  "On Hold": "#f97316",
  "Default": "#ccc",
};

const ReimbursementScreen = ({ navigation, route }) => {
  const { reimbursementId } = route.params;
  const [reimbursement, setReimbursement] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchReimbursement = async () => {
    setLoading(true);
    try {
      const res = await authAxios.get(
        `/reimbursements/my-reimbursements/${reimbursementId}/`
      );
      setReimbursement(res.data);
    } catch (err) {
      console.error("Failed to fetch reimbursement:", err);
      Alert.alert("Error", "Failed to fetch reimbursement.");
      navigation.goBack();
    } finally {
      setLoading(false);
    }
  };

  const deleteReimbursement = async () => {
    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to cancel this reimbursement?",
      [
        { text: "No" },
        {
          text: "Yes",
          onPress: async () => {
            try {
              await authAxios.delete(
                `/reimbursements/my-reimbursements/${reimbursementId}/`
              );
              Alert.alert("Deleted", "Reimbursement cancelled successfully.");
              navigation.goBack();
            } catch (err) {
              console.error("Failed to delete reimbursement:", err);
              Alert.alert("Error", "Failed to cancel reimbursement.");
            }
          },
        },
      ]
    );
  };

  useEffect(() => {
    fetchReimbursement();
  }, []);

  if (loading || !reimbursement) {
    return (
      <View style={[styles.container, { justifyContent: "center", alignItems: "center" }]}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  const statusColor = STATUS_COLORS[reimbursement.status] || STATUS_COLORS.Default;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={0.7}>
          <Ionicons name="arrow-back" size={22} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Reimbursement</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.card}>
          {/* Expense Category + Status */}
          <View style={styles.rowBetween}>
            <View>
              <Text style={styles.label}>Expense Category</Text>
              <Text style={styles.expenseText}>{reimbursement.expense_category}</Text>
            </View>
            <View style={[styles.statusBadge, { borderColor: statusColor }]}>
              <Text style={[styles.statusText, { color: statusColor }]}>
                {reimbursement.status}
              </Text>
            </View>
          </View>

          {/* Date */}
          <View style={styles.section}>
            <Text style={styles.label}>Date</Text>
            <Text style={styles.value}>{reimbursement.date}</Text>
          </View>

          {/* To */}
          <View style={styles.section}>
            <Text style={styles.label}>To</Text>
            <Text style={styles.value}>{reimbursement.to_mail}</Text>
          </View>

          {/* Note */}
          <View style={styles.section}>
            <Text style={styles.label}>Note</Text>
            <Text style={styles.noteText}>{reimbursement.note}</Text>
          </View>

          {/* Amount */}
          <View style={styles.section}>
            <Text style={styles.label}>Amount in AED</Text>
            <Text style={styles.value}>AED {reimbursement.amount}</Text>
          </View>

          {/* Bills */}
          {reimbursement.bills && reimbursement.bills.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.label}>Bills</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {reimbursement.bills.map((bill, index) => (
                  <Image
                    key={index}
                    source={{ uri: bill.url }}
                    style={styles.billImage}
                  />
                ))}
              </ScrollView>
            </View>
          )}

          {/* Cancel Button */}
          <TouchableOpacity
            style={styles.cancelButton}
            activeOpacity={0.8}
            onPress={deleteReimbursement}
          >
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Bottom Navbar */}
      <View style={styles.bottomNavbarContainer}>
        <BottomNavbar navigation={navigation} route={route} />
      </View>
    </View>
  );
};

export default ReimbursementScreen;
