import React, { useState } from 'react';
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
import styles from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';


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

  const leaveTypes = [
    { id: 1, type: 'casual' },
    { id: 2, type: 'sick' },
    { id: 3, type: 'earned' },
    { id: 4, type: 'maternity' },
    { id: 5, type: 'others' },
  ];




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


      const response = await fetch('http://192.168.29.146:8000/api/leave/', {
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
      onPress: () => navigation.navigate("LeavePendingScreen"), // Ensures return + refresh
    },
  ]);
}
 else {
        const err = await response.json();
        console.log(err);
        Alert.alert('Error', 'Something went wrong while submitting.');
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
        {/* Stat Boxes */}
        <View style={styles.statsContainer}>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>Pending Leaves</Text>
            <Text style={styles.statValue}>20</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>Loss of Pay Taken</Text>
            <Text style={styles.statValue}>0</Text>
          </View>
        </View>

        {/* Dates */}
        <View style={styles.section}>
          <View style={styles.dateRow}>
            <View style={styles.dateInput}>
              <Text style={styles.inputLabel}>From</Text>
              <TouchableOpacity
                style={styles.dateField}
                onPress={() => setShowFromPicker(true)}
              >
                <Text style={styles.dateText}>{fromDate.toLocaleDateString()}</Text>
                <Ionicons name="calendar" size={20} color="#ccc" />
              </TouchableOpacity>
            </View>

            <View style={styles.dateInput}>
              <Text style={styles.inputLabel}>To</Text>
              <TouchableOpacity
                style={styles.dateField}
                onPress={() => setShowToPicker(true)}
              >
                <Text style={styles.dateText}>{toDate.toLocaleDateString()}</Text>
                <Ionicons name="calendar" size={20} color="#ccc" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {showFromPicker && (
          <DateTimePicker
            value={fromDate}
            mode="date"
            display="default"
            onChange={onFromChange}
          />
        )}
        {showToPicker && (
          <DateTimePicker
            value={toDate}
            mode="date"
            display="default"
            onChange={onToChange}
          />
        )}

        {/* Leave Type Dropdown */}
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
