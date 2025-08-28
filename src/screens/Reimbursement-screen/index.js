import React from "react";
import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // for back arrow
import styles from "./styles";
import BottomNavbar from "../BottomNavbar";

const ReimbursementScreen = ({ navigation, route }) => {
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
        {/* Card */}
        <View style={styles.card}>
          {/* Expense Category + Status */}
          <View style={styles.rowBetween}>
            <View>
              <Text style={styles.label}>Expense Category</Text>
              <Text style={styles.expenseText}>Enter Expense</Text>
            </View>
            <View style={styles.statusBadge}>
              <Text style={styles.statusText}>Approved</Text>
            </View>
          </View>

          {/* Date */}
          <View style={styles.section}>
            <Text style={styles.label}>Date</Text>
            <Text style={styles.value}>12 Jan 2025</Text>
          </View>

          {/* To */}
          <View style={styles.section}>
            <Text style={styles.label}>To</Text>
            <Text style={styles.value}>Ajay@gmail.com</Text>
          </View>

          {/* Note */}
          <View style={styles.section}>
            <Text style={styles.label}>Note</Text>
            <Text style={styles.noteText}>
              Lorem ipsum dolor sit amet consectetur. Et convallis ut lacinia
              purus. Enim luctus arcu enim eleifend ante amet. Se...
            </Text>
          </View>

          {/* Amount */}
          <View style={styles.section}>
            <Text style={styles.label}>Amount in AED</Text>
            <Text style={styles.value}>AED 204</Text>
          </View>

          {/* Bills */}
          <View style={styles.section}>
            <Text style={styles.label}>Bills</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {[1, 2, 3, 4, 5].map((item, index) => (
                <Image
                  key={index}
                  source={{ uri: "https://via.placeholder.com/80x100" }}
                  style={styles.billImage}
                />
              ))}
            </ScrollView>
          </View>

          {/* Cancel Button */}
          <TouchableOpacity style={styles.cancelButton} activeOpacity={0.8}>
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
