import React, { useState, useCallback ,useEffect} from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
  FlatList,
  RefreshControl,
  Platform,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import styles from "./styles";
import authAxios from "../../utils/authAxios";
import SwipeLoader from "../../components/SwipeLoader";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { SafeAreaView } from "react-native-safe-area-context";


const STATUS_LABELS = {
  Approve: "Approved",
  "In Verification": "In Verification",
  "On Hold": "On Hold",
};
const STATUS_STYLES = {
  Approve: { color: "#2ecc71", background: "rgba(46, 204, 113, 0.15)" },
  "In Verification": { color: "#FF2304", background: "#2E254C" },
  "On Hold": { color: "#ff9800", background: "rgba(249, 115, 22, 0.15)" },
  Default: { color: "#ccc", background: "rgba(204, 204, 204, 0.15)" },
};

export default function ReimbursementlistScreen({ navigation, route }) {
  const [reimbursements, setReimbursements] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [bill, setBill] = useState(null);
  const insets = useSafeAreaInsets();


  // fetch reimbursements
  const fetchReimbursements = async () => {
    try {
      if (!refreshing) setLoading(true);
      const res = await authAxios.get("/reimbursements/my-reimbursements/");
      setReimbursements(res.data.results || res.data);
    } catch (err) {
      // console.error("Failed to fetch reimbursements:", err);
      Alert.alert("Error", "Failed to fetch reimbursements.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

useEffect(() => {
  fetchReimbursements();
}, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchReimbursements();
  }, []);


  const pickImage = async () => {
    try {
      if (bill) {
        Alert.alert("Limit Reached", "You can only upload one bill.");
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });

      if (!result.canceled) {
        setBill(result.assets[0]);
      }
    } catch (err) {
      console.error(err);
      Alert.alert("Error", "Failed to pick image.");
    }
  };

  // render each reimbursement card
  const renderItem = ({ item }) => {
    const styleConfig = STATUS_STYLES[item.status] || STATUS_STYLES.Default;
    return (
      <TouchableOpacity
        style={styles.card}
        activeOpacity={0.8}
        onPress={() =>
          navigation.navigate("ReimbursementScreen", { reimbursementId: item.id })
        }
      >

        <View
          style={[
            styles.statusBadge,
            { borderColor: styleConfig.color, backgroundColor: styleConfig.background },
          ]}
        >
          <Text style={[styles.statusText, { color: styleConfig.color }]}>
            {STATUS_LABELS[item.status] || item.status}
          </Text>
        </View>

        <View style={styles.cardRow}>
          <View>
            <Text style={styles.label}>Expense Category</Text>
            <Text style={styles.category}>{item.expense_category}</Text>
          </View>
          <Text style={styles.amount}>Amount :{item.amount}</Text>
        </View>

        <View style={styles.noteBox}>
          <Text style={styles.label}>Note</Text>
          <Text style={styles.note}>{item.note}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
     <SafeAreaView style={styles.container} edges={["bottom"]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Reimbursement</Text>
      </View>

      <View style={{ padding: 5 }}>


        {bill && (
          <View style={styles.imageWrapper}>
            <Image source={{ uri: bill.uri }} style={styles.billImage} />
            <TouchableOpacity
              style={styles.closeIcon}
              onPress={() => setBill(null)}
            >
              <Ionicons name="close-circle" size={22} color="red" />
            </TouchableOpacity>
          </View>
        )}
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
              colors={["#ffffff", "#d3d3d3"]}
              tintColor="#ffffff"
              progressBackgroundColor={
                Platform.OS === "android" ? "#f5f5f5" : "transparent"
              }
            />
          }
          ListEmptyComponent={
            <Text
              style={{ color: "#888", textAlign: "center", marginTop: 20 }}
            >
              No reimbursements found.
            </Text>
          }
        />
      )}

      {/* FAB */}
      <TouchableOpacity
        style={[styles.fab, { bottom: styles.fab.bottom + insets.bottom }]}
        onPress={() => navigation.navigate("ReimbursementForm")}
      >

        <Ionicons name="add" size={24} color="white" />
      </TouchableOpacity>

    </SafeAreaView>
  );
}
