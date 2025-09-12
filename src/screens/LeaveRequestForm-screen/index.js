import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Alert,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './styles';
import Toast from 'react-native-toast-message';
import authAxios from '../../utils/authAxios';
const API_BASE_URL = 'http://178.248.112.16:8000';


export default function LeaveRequestFormScreen() {
  const navigation = useNavigation();

  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  const [showFromPicker, setShowFromPicker] = useState(false);
  const [showToPicker, setShowToPicker] = useState(false);
  const [selectedLeaveType, setSelectedLeaveType] = useState('casual');
  const [toEmail, setToEmail] = useState('');
  const [ccEmail, setCcEmail] = useState('');
  const [reason, setReason] = useState('');
  const [loading, setLoading] = useState(false);

  // Stats
  const [pendingLeaveCount, setPendingLeaveCount] = useState(0);
  const [lopDays, setLopDays] = useState(0);
  const [lopAmount, setLopAmount] = useState(0);

  // const isValidEmail = (email) => {
  //   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //   return emailRegex.test(email);
  // };


  const leaveTypes = [
    { id: 1, type: 'casual' },
    { id: 2, type: 'sick' },
    { id: 3, type: 'earned' },
    { id: 4, type: 'maternity' },
    { id: 5, type: 'others' },
  ];
  // inside your LeaveRequestFormScreen component

  // Reset / clear form function
  const clearForm = () => {
    setFromDate(new Date());
    setToDate(new Date());
    setSelectedLeaveType("casual");
    setToEmail("");
    setCcEmail("");
    setReason("");
  };



  // Fetch summary data from /summary endpoint


  useEffect(() => {
    const fetchLeaveSummary = async () => {
      try {
        const response = await authAxios.get("/leave/summary/");

        if (response.status === 200) {
          const summary = response.data;
          setPendingLeaveCount(summary.pending_count || 0);
          setLopDays(summary.lop_days || 0);
          setLopAmount(summary.lop_amount || 0);
        } else {
          console.warn("Failed to fetch leave summary");
        }
      } catch (err) {
        console.error("❌ Error fetching summary:", err);
      }
    };

    fetchLeaveSummary();
  }, []);


  useEffect(() => {
    const fetchDepartmentHeadEmail = async () => {
      try {
        const response = await authAxios.get("/my-department-head/");
        if (response.status === 200) {
          setToEmail(response.data.email); // Autofill To Email field
        } else {
          console.warn("Failed to fetch department head email");
        }
      } catch (err) {
        console.error("❌ Error fetching department head email:", err);
      }
    };
  
    fetchDepartmentHeadEmail();
  }, []);
  


const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const allowedDomains = ["gmail.com", "yahoo.com", "outlook.com", "hotmail.com", "icloud.com"];

  if (!emailRegex.test(email)) return false;

  const domain = email.split("@")[1];
  return allowedDomains.includes(domain);
};

// 📌 From date validation
const onFromChange = (event, selectedDate) => {
  setShowFromPicker(false);
  if (selectedDate) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (selectedDate < today) {
      Toast.show({
        type: "error",
        text1: "Invalid Date",
        text2: "You cannot select a past date.",text1Style: { fontSize: 18, fontFamily: "Montserrat_700Bold" },
        text2Style: { fontSize: 15, fontFamily: "Raleway_500Medium" },
      });
      return;
    }
    setFromDate(selectedDate);
  }
};

// 📌 To date validation
const onToChange = (event, selectedDate) => {
  setShowToPicker(false);
  if (selectedDate) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
      Toast.show({
        type: "error",
        text1: "Invalid Date",
        text2: "You cannot select a past date.",text1Style: { fontSize: 18, fontFamily: "Montserrat_700Bold" },
        text2Style: { fontSize: 15, fontFamily: "Raleway_500Medium" },
      });
      return;
    }
    if (selectedDate < fromDate) {
      Toast.show({
        type: "error",
        text1: "Invalid Range",
        text2: "To date cannot be earlier than From date.",text1Style: { fontSize: 18, fontFamily: "Montserrat_700Bold" },
        text2Style: { fontSize: 15, fontFamily: "Raleway_500Medium" },
      });
      return;
    }
    setToDate(selectedDate);
  }
};

// 📌 Submit
const submitLeaveRequest = async () => {
  if (!reason || !toEmail) {
    Toast.show({
      type: "error",
      text1: "Validation Error",
      text2: "Please fill all required fields.",
    });
    return;
  }

  if (!isValidEmail(toEmail)) {
    Toast.show({
      type: "error",
      text1: "Invalid Email",
      text2: "Enter a valid Gmail, Yahoo, or Outlook email.",text1Style: { fontSize: 18, fontFamily: "Montserrat_700Bold" },
      text2Style: { fontSize: 15, fontFamily: "Raleway_500Medium" },
    });
    return;
  }

  if (ccEmail && !isValidEmail(ccEmail)) {
    Toast.show({
      type: "error",
      text1: "Invalid CC Email",
      text2: "Enter a valid Gmail, Yahoo, or Outlook email.",text1Style: { fontSize: 18, fontFamily: "Montserrat_700Bold" },
        text2Style: { fontSize: 15, fontFamily: "Raleway_500Medium" },
    });
    return;
  }

  setLoading(true);
  try {
    const response = await authAxios.post("/leave/", {
      leave_type: selectedLeaveType,
      reason,
      from_date: fromDate.toISOString().split("T")[0],
      to_date: toDate.toISOString().split("T")[0],
      to_email: toEmail,
      cc_email: ccEmail,
    });

    if (response.status === 201 || response.status === 200) {
      Toast.show({
        type: "success",
        text1: "Leave Request Submitted",
        text2: "Your request has been sent successfully!",
      });
      navigation.navigate("LeavePendingScreen");
    } else {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: response.data?.detail || "Something went wrong.",
      });
    }
  } catch (error) {
    console.error(error);
    Toast.show({
      type: "error",
      text1: "Network Error",
      text2: "Unable to connect to server.",
    });
  } finally {
    setLoading(false);
  }
};



  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Leave Request</Text>
      </View>

      <View style={styles.separator} />

      <ScrollView contentContainerStyle={styles.content}>
        {/* Leave Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>Pending Leaves</Text>
            <Text style={styles.statValue}>{pendingLeaveCount}</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>Loss of Pay Taken</Text>
            <Text style={styles.statValue}>₹ {lopAmount}-{lopDays}</Text>
          </View>
        </View>

        {/* Date Pickers */}
        <View style={styles.section}>
          <View style={styles.dateRow}>
            <View style={styles.dateInput}>
              <Text style={styles.inputLabel}>From</Text>
              <TouchableOpacity style={styles.dateField} onPress={() => setShowFromPicker(true)}>
                <Text style={styles.dateText}>{fromDate.toLocaleDateString()}</Text>
                <Ionicons name="calendar" size={20} color="#ccc" />
              </TouchableOpacity>
            </View>

            <View style={styles.dateInput}>
              <Text style={styles.inputLabel}>To</Text>
              <TouchableOpacity style={styles.dateField} onPress={() => setShowToPicker(true)}>
                <Text style={styles.dateText}>{toDate.toLocaleDateString()}</Text>
                <Ionicons name="calendar" size={20} color="#ccc" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {showFromPicker && (
          <DateTimePicker value={fromDate} mode="date" display="default" onChange={onFromChange} />
        )}
        {showToPicker && (
          <DateTimePicker value={toDate} mode="date" display="default" onChange={onToChange} />
        )}

        {/* Leave Type Picker */}
        <View style={styles.section}>
          <Text style={styles.inputLabel}>Leave Type</Text>
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={selectedLeaveType}
              onValueChange={(value) => setSelectedLeaveType(value)}
              style={styles.picker}
              dropdownIconColor="#ccc"
            >
              {leaveTypes.map((item) => (
                <Picker.Item key={item.id} label={item.type} value={item.type} />
              ))}
            </Picker>
          </View>
        </View>

        {/* To Email */}
        <View style={styles.section}>
          <Text style={styles.inputLabel}>To</Text>
          <TextInput
            style={styles.input}
            placeholder="Department Lead Email"
            placeholderTextColor="#889"
            value={toEmail}
            onChangeText={setToEmail}
            keyboardType="email-address"
          />
        </View>

        {/* CC Email */}
        <View style={styles.section}>
          <Text style={styles.inputLabel}>C.C</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Email"
            placeholderTextColor="#889"
            value={ccEmail}
            onChangeText={setCcEmail}
            keyboardType="email-address"
          />
        </View>

        {/* Reason */}
        <View style={styles.section}>
          <Text style={styles.inputLabel}>Reason</Text>
          <TextInput
            style={styles.textArea}
            placeholder="Enter Reason"
            placeholderTextColor="#889"
            multiline
            value={reason}
            onChangeText={setReason}
          />
        </View>
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.deleteButton} onPress={clearForm}>
          <Ionicons name="trash" size={24} color="#ff3333" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.applyButton}
          onPress={submitLeaveRequest}
          disabled={loading}
        >
          <Text style={styles.applyButtonText}>
            {loading ? "Applying..." : "Apply Leave"}
          </Text>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  );
}
