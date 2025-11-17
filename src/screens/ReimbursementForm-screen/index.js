import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { Picker } from "@react-native-picker/picker";
import Toast from "react-native-toast-message";   
import authAxios from "../../utils/authAxios";
import styles from "./styles";
import BottomNavbar from "../BottomNavbar";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";
import { Modal } from "react-native";
import DatePickerModal from "../LeaveRequestForm-screen/DatePickerModal";
const ReimbursementForm = ({ navigation, route }) => {
  const [expenseCategory, setExpenseCategory] = useState("");
  // const [toMail, setToMail] = useState("");
  const [note, setNote] = useState("");
  const [date, setDate] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [amount, setAmount] = useState("");
  const [showCategoryPicker, setShowCategoryPicker] = useState(false);

  const [bill, setBill] = useState(null);
  const [loading, setLoading] = useState(false);

  const EXPENSE_CATEGORIES = [
    "TRAVEL", "MEALS", "ACCOMMODATION", "SUPPLIES",
    "TRAINING", "ENTERTAINMENT", "BILLS", "HEALTHCARE", "MISC", "OTHERS"
  ];

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
    });
    if (!result.canceled) {
      const file = result.assets[0];
      setBill({ uri: file.uri, name: "bill.jpg", type: "image/jpeg" });
    }
  };

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      const formatted = selectedDate.toISOString().split("T")[0];
      setDate(formatted);
    }
  };

  const validateEmail = (email) => {
    const allowedDomains = ["gmail.com", "yahoo.com", "outlook.com", "hotmail.com"];
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(email)) return false;

    const domain = email.split("@")[1];
    return allowedDomains.includes(domain);
  };

  const handleSubmit = async () => {
    if (!expenseCategory || !amount || !date || !bill) {
      return Toast.show({
        type: "error",
        text1: "Validation Error",
        text2: "Please fill all required fields and upload a bill.",
      });
    }
    const today = new Date().toISOString().split("T")[0];
    if (date > today) {
      return Toast.show({
        type: "error",
        text1: "Invalid Date",
        text2: "Date cannot be in the future.",
      });
    }
    const formData = new FormData();
    formData.append("expense_category", expenseCategory);
    formData.append("note", note);
    formData.append("date", date);
    formData.append("amount", amount);
    formData.append("uploaded_images", bill);

    setLoading(true);
    try {
      await authAxios.post("/reimbursements/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      Toast.show({
        type: "success",
        text1: "Success",
        text2: "Reimbursement submitted successfully!",
        text1Style: { fontSize: 18, fontFamily: "Montserrat_700Bold" },
        text2Style: { fontSize: 15, fontFamily: "Raleway_500Medium" },
      });

      navigation.navigate("ReimbursementlistScreen", { refresh: true });
    } catch (err) {
      console.error("Failed to submit reimbursement:", err);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Failed to submit reimbursement.",
        text1Style: { fontSize: 18, fontFamily: "Montserrat_700Bold" },
        text2Style: { fontSize: 14, fontFamily: "Raleway_500Medium" },
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Background behind notch */}
      <SafeAreaView
        style={{ flex: 0, backgroundColor: "#262D40" }}
        edges={["top"]}
      />

      {/* Main screen (below the notch) */}
      <SafeAreaView
        style={styles.container}
        edges={["left", "right", "bottom"]}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons
              name="arrow-back"
              size={24}
              color="#fff"
              style={{ marginBottom: 16 }}
            />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Reimbursement</Text>
        </View>

        {/* BODY CONTENT */}
        <KeyboardAwareScrollView contentContainerStyle={styles.scrollContent}>
          {/* Expense Category */}
          <Text style={styles.label}>Expense Category</Text>
          <TouchableOpacity
            style={styles.customPickerField}
            onPress={() => setShowCategoryPicker(true)}
          >
            <Text style={styles.customPickerText}>
              {expenseCategory || "Select category"}
            </Text>

            <Ionicons name="add" size={20} color="#fff" />
          </TouchableOpacity>
          <Modal
            visible={showCategoryPicker}
            transparent
            animationType="slide"
            onRequestClose={() => setShowCategoryPicker(false)}
          >
            <TouchableOpacity
              style={styles.modalOverlay}
              activeOpacity={1}
              onPressOut={() => setShowCategoryPicker(false)}
            >
              <View style={styles.modalContent}>
                <Picker
                  selectedValue={expenseCategory}
                  onValueChange={(value) => {
                    if (value) setExpenseCategory(value);
                    setShowCategoryPicker(false);
                  }}
                >
                  <Picker.Item label="Select category" value="" enabled={false} />
                  {EXPENSE_CATEGORIES.map((cat) => (
                    <Picker.Item key={cat} label={cat} value={cat} />
                  ))}
                </Picker>
              </View>
            </TouchableOpacity>
          </Modal>

          {/* Upload */}
          <TouchableOpacity
            style={styles.uploadButton}
            activeOpacity={0.8}
            onPress={pickImage}
          >
            <Ionicons name="add" size={20} color="#fff" />
            <Text style={styles.uploadButtonText}>Upload Image</Text>
          </TouchableOpacity>
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
          {/* Note */}
          <Text style={styles.label}>Add note</Text>
          <TextInput
            placeholder="Enter note"
            placeholderTextColor="#8A8F9E"
            style={styles.textArea}
            multiline
            value={note}
            onChangeText={setNote}
          />
          {/* Date + Amount */}
          <View style={styles.row}>
            <View style={styles.halfInputContainer}>
              <Text style={styles.label}>Date</Text>
              <TouchableOpacity
                onPress={() => setShowDatePicker(true)}
                style={styles.input}
              >
                <Text style={{ color: date ? "#fff" : "#8A8F9E" }}>
                  {date || "Select Date"}
                </Text>
              </TouchableOpacity>
              <DatePickerModal
                visible={showDatePicker}
                date={date ? new Date(date) : new Date()}
                onChange={(selected) => {
                  const formatted = selected.toISOString().split("T")[0];
                  setDate(formatted);
                  setShowDatePicker(false);
                }}
                onClose={() => setShowDatePicker(false)}
              />
            </View>
            <View style={styles.halfInputContainer}>
              <Text style={styles.label}>Enter Amount (AED)</Text>
              <TextInput
                placeholder="0.00"
                placeholderTextColor="#8A8F9E"
                style={styles.input}
                keyboardType="numeric"
                value={amount}
                onChangeText={setAmount}
              />
            </View>
          </View>
          {/* Submit */}
          <TouchableOpacity
            style={[styles.submitButton, loading && { opacity: 0.6 }]}
            disabled={loading}
            onPress={handleSubmit}
            activeOpacity={0.8}
          >
            <Text style={styles.submitButtonText}>
              {loading ? "Submitting..." : "Submit"}
            </Text>
          </TouchableOpacity>
        </KeyboardAwareScrollView>
        {/* Bottom Navbar */}
        {!loading && (
          <View style={{ position: "absolute", left: 0, right: 0, bottom: 0 }}>
            <BottomNavbar navigation={navigation} route={route} />
          </View>
        )}
      </SafeAreaView>
    </>

  );
};
export default ReimbursementForm;
