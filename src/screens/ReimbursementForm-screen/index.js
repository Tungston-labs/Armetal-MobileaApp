import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "./styles";

const ReimbursementForm = ({ navigation }) => {
  const [bills] = useState([1, 2, 3, 4, 5]); // mock bills

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
        {/* Expense Category */}
        <Text style={styles.label}>Expense Category</Text>
        <TextInput
          placeholder="Enter Expense"
          placeholderTextColor="#8A8F9E"
          style={styles.input}
        />

        {/* To */}
        <Text style={styles.label}>To</Text>
        <TextInput
          placeholder="Enter Mail ID"
          placeholderTextColor="#8A8F9E"
          style={styles.input}
        />

        {/* Upload Button */}
        <TouchableOpacity style={styles.uploadButton} activeOpacity={0.8}>
          <Ionicons name="add" size={20} color="#fff" />
          <Text style={styles.uploadButtonText}>Upload image</Text>
        </TouchableOpacity>

        {/* Bills Preview */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ marginTop: 12 }}
        >
          {bills.map((item, index) => (
            <Image
              key={index}
              source={{ uri: "https://via.placeholder.com/100x120" }}
              style={styles.billImage}
            />
          ))}
        </ScrollView>

        {/* Add Note */}
        <Text style={styles.label}>Add note</Text>
        <TextInput
          placeholder="Enter note"
          placeholderTextColor="#8A8F9E"
          style={styles.textArea}
          multiline
        />

        {/* Date & Amount Row */}
        <View style={styles.row}>
          <View style={styles.halfInputContainer}>
            <Text style={styles.label}>Date</Text>
            <View style={styles.dateInputWrapper}>
              <TextInput
                placeholder="12/12/2025"
                placeholderTextColor="#8A8F9E"
                style={styles.dateInput}
              />
              <Ionicons
                name="calendar-outline"
                size={20}
                color="#8A8F9E"
                style={{ marginRight: 10 }}
              />
            </View>
          </View>

          <View style={styles.halfInputContainer}>
            <Text style={styles.label}>Enter Amount</Text>
            <TextInput
              placeholder="AED 250"
              placeholderTextColor="#8A8F9E"
              style={styles.input}
              keyboardType="numeric"
            />
          </View>
        </View>

        {/* Submit Button */}
        <TouchableOpacity style={styles.submitButton} activeOpacity={0.8}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default ReimbursementForm;
