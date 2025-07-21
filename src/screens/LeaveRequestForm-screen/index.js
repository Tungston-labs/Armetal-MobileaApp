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
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './styles';

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


  const leaveTypes = [
    { id: 1, type: 'casual' },
    { id: 2, type: 'sick' },
    { id: 3, type: 'earned' },
    { id: 4, type: 'maternity' },
    { id: 5, type: 'others' },
  ];

  // Fetch summary data from /summary endpoint
  useEffect(() => {
    const fetchLeaveSummary = async () => {
      try {
        const token = await AsyncStorage.getItem('accessToken');
        const response = await fetch(`${API_BASE_URL}/api/leave/summary/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
  const summary = await response.json();
  setPendingLeaveCount(summary.pending_count || 0);
  setLopDays(summary.lop_days || 0);
  setLopAmount(summary.lop_amount || 0);
}
else {
          console.warn('Failed to fetch leave summary');
        }
      } catch (err) {
        console.error('Error fetching summary:', err);
      }
    };

    fetchLeaveSummary();
  }, []);

  const onFromChange = (event, selectedDate) => {
    setShowFromPicker(false);
    if (selectedDate) setFromDate(selectedDate);
  };

  const onToChange = (event, selectedDate) => {
    setShowToPicker(false);
    if (selectedDate) setToDate(selectedDate);
  };

  const submitLeaveRequest = async () => {
    if (!reason || !toEmail) {
      Alert.alert('Validation Error', 'Please fill all required fields.');
      return;
    }

    setLoading(true);
    try {
      const token = await AsyncStorage.getItem('accessToken');

      const response = await fetch(`${API_BASE_URL}/api/leave/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          leave_type: selectedLeaveType,
          reason,
          from_date: fromDate.toISOString().split('T')[0],
          to_date: toDate.toISOString().split('T')[0],
          to_email: toEmail,
          cc_email: ccEmail,
        }),
      });

      if (response.ok) {
        Alert.alert("Success", "Leave request submitted successfully!", [
          {
            text: "OK",
            onPress: () => navigation.navigate("LeavePendingScreen"),
          },
        ]);
      } else {
        const err = await response.json();
        console.log(err);
        Alert.alert('Error', err?.detail || 'Something went wrong.');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Unable to connect to the server.');
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
            placeholder="Department Lead"
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
        <TouchableOpacity style={styles.deleteButton}>
          <Ionicons name="trash" size={24} color="#ff3333" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.applyButton}
          onPress={submitLeaveRequest}
          disabled={loading}
        >
          <Text style={styles.applyButtonText}>
            {loading ? 'Applying...' : 'Apply Leave'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
