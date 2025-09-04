import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  FlatList,
  RefreshControl,
  Platform,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import styles from "./styles";
import BottomNavbar from "../BottomNavbar";
import authAxios from "../../utils/authAxios";
import SwipeLoader from "../../components/SwipeLoader"
const STATUS_COLORS = {
  Approve: "#2ecc71",          // green
  "In Verification": "#facc15", // yellow
  "On Hold": "#f97316",        // orange
  Default: "#ccc",             // fallback color
};

const STATUS_LABELS = {
  Approve: "Approved",
  "In Verification": "In Verification",
  "On Hold": "On Hold",
};

export default function ReimbursementlistScreen({ navigation, route }) {
  const [reimbursements, setReimbursements] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const fetchReimbursements = async () => {
    try {
      if (!refreshing) setLoading(true);
      const res = await authAxios.get("/reimbursements/my-reimbursements/");
      setReimbursements(res.data.results || res.data);
    } catch (err) {
      console.error("Failed to fetch reimbursements:", err);
      Alert.alert("Error", "Failed to fetch reimbursements.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // ✅ Refresh whenever screen comes into focus
  useFocusEffect(
    useCallback(() => {
      fetchReimbursements();
    }, [])
  );

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchReimbursements();
  }, []);

  const renderItem = ({ item }) => {
    const statusColor = STATUS_COLORS[item.status] || STATUS_COLORS.Default;
    return (
      <TouchableOpacity
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
  };

  return (
    
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Reimbursement</Text>
      </View>

      {/* Content */}
      {loading && !refreshing ? (
         <SwipeLoader text="Loading reimbursements..." />
      ) : (
        <FlatList
          data={reimbursements}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={["#ffffff", "#d3d3d3"]} // ✅ Android spinner colors
            tintColor="#ffffff" 
              progressBackgroundColor={
                Platform.OS === "android" ? "#f5f5f5" : "transparent"
              }
            />
          }
          ListEmptyComponent={
            <Text style={{ color: "#888", textAlign: "center", marginTop: 20 }}>
              No reimbursements found.
            </Text>
          }
        />
      )}

      {/* Fixed Button */}
      <TouchableOpacity
        style={styles.fixedButton}
        onPress={() => navigation.navigate("ReimbursementForm")}
      >
        <Text style={styles.fixedButtonText}>+ Reimbursement</Text>
      </TouchableOpacity>

      {/* ✅ Fixed Bottom Navbar */}
      <View style={{ position: "absolute", left: 0, right: 0, bottom: 0 }}>
        <BottomNavbar navigation={navigation} route={route} />
      </View>
    </View>
  );
}
