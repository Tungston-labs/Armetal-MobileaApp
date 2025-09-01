import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { Picker } from "@react-native-picker/picker"; 
import authAxios from "../../utils/authAxios"; 
import styles from "./styles";

const ReimbursementForm = ({ navigation }) => {
  const [expenseCategory, setExpenseCategory] = useState("");
  const [toMail, setToMail] = useState("");
  const [note, setNote] = useState("");
  const [date, setDate] = useState("");
  const [amount, setAmount] = useState("");
  const [bill, setBill] = useState(null);
  const [loading, setLoading] = useState(false);

  const EXPENSE_CATEGORIES = ["TRAVEL", "MEALS", "ACCOMMODATION", "SUPPLIES","TRAINING","ENTERTAINMENT","BILLS","HEALTHCARE","MISC"];
  

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

  const handleSubmit = async () => {
    if (!expenseCategory || !toMail || !amount || !date || !bill) {
      return Alert.alert("Error", "Please fill all required fields and upload a bill.");
    }
  
    const formData = new FormData();
    formData.append("expense_category", expenseCategory);
    formData.append("to_mail", toMail);
    formData.append("note", note);
    formData.append("date", date);
    formData.append("amount", amount);
    formData.append("uploaded_images", bill);
  
    setLoading(true);
    try {
      await authAxios.post("/reimbursements/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
  
      Alert.alert("Success", "Reimbursement submitted successfully!");
  
      // ✅ Go back AND notify list to refresh
      navigation.navigate("ReimbursementlistScreen", { refresh: true });
    } catch (err) {
      console.error("Failed to submit reimbursement:", err);
      Alert.alert("Error", "Failed to submit reimbursement.");
    } finally {
      setLoading(false);
    }
  };
  

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
        {/* Expense Category Dropdown */}
        <Text style={styles.label}>Expense Category</Text>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={expenseCategory}
            onValueChange={(value) => setExpenseCategory(value)}
            style={{ color: "#fff" }}
          >
            <Picker.Item label="Select category" value="" />
            {EXPENSE_CATEGORIES.map((cat) => (
              <Picker.Item key={cat} label={cat} value={cat} />
            ))}
          </Picker>
        </View>

        {/* To */}
        <Text style={styles.label}>To</Text>
        <TextInput
          placeholder="Enter Mail ID"
          placeholderTextColor="#8A8F9E"
          style={styles.input}
          value={toMail}
          onChangeText={setToMail}
        />

        {/* Upload Button */}
        <TouchableOpacity style={styles.uploadButton} activeOpacity={0.8} onPress={pickImage}>
          <Ionicons name="add" size={20} color="#fff" />
          <Text style={styles.uploadButtonText}>Upload Bill</Text>
        </TouchableOpacity>

        {/* Display selected image */}
        {bill && <Image source={{ uri: bill.uri }} style={[styles.billImage, { marginTop: 12 }]} />}

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

        {/* Date & Amount Row */}
        <View style={styles.row}>
          <View style={styles.halfInputContainer}>
            <Text style={styles.label}>Date</Text>
            <TextInput
              placeholder="yyyy-mm-dd"
              placeholderTextColor="#8A8F9E"
              style={styles.input}
              value={date}
              onChangeText={setDate}
            />
          </View>

          <View style={styles.halfInputContainer}>
            <Text style={styles.label}>Enter Amount</Text>
            <TextInput
              placeholder="250"
              placeholderTextColor="#8A8F9E"
              style={styles.input}
              keyboardType="numeric"
              value={amount}
              onChangeText={setAmount}
            />
          </View>
        </View>

        {/* Submit Button */}
        <TouchableOpacity style={styles.submitButton} activeOpacity={0.8} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>{loading ? "Submitting..." : "Submit"}</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default ReimbursementForm;
