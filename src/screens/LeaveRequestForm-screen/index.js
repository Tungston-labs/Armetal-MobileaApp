import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Modal
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from './styles';
import Toast from 'react-native-toast-message';
import authAxios from '../../utils/authAxios';
import DatePickerModal from "./DatePickerModal";
import { useColorScheme } from 'react-native';

export default function LeaveRequestFormScreen() {
  const navigation = useNavigation();
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  const [showFromPicker, setShowFromPicker] = useState(false);
  const [showToPicker, setShowToPicker] = useState(false);
  const [showLeaveTypePicker, setShowLeaveTypePicker] = useState(false);

  const [selectedLeaveType, setSelectedLeaveType] = useState('casual');
  const [fromType, setFromType] = useState('full');
  const [toType, setToType] = useState('full');

  const [toEmail, setToEmail] = useState('');
  const [ccEmail, setCcEmail] = useState('');
  const [reason, setReason] = useState('');
  const [loading, setLoading] = useState(false);

  const [pendingLeaveCount, setPendingLeaveCount] = useState(0);
  const [lopDays, setLopDays] = useState(0);
  const [lopAmount, setLopAmount] = useState(0);
  const [showFromTypePicker, setShowFromTypePicker] = useState(false);
  const [showToTypePicker, setShowToTypePicker] = useState(false);

  const leaveTypes = [
    { id: 1, type: 'casual' },
    { id: 2, type: 'sick' },
    { id: 3, type: 'earned' },
    { id: 4, type: 'maternity' },
    { id: 5, type: 'others' },
  ];

  const halfDayTypes = [
    { id: 1, label: 'Forenoon', value: 'forenoon' },
    { id: 2, label: 'Afternoon', value: 'afternoon' },
    { id: 3, label: 'Full Day', value: 'full' },
  ];

  const getHalfDayLabel = (value) =>
    halfDayTypes.find((h) => h.value === value)?.label ?? 'Full Day';

  const clearForm = () => {
    setFromDate(new Date());
    setToDate(new Date());
    setSelectedLeaveType('casual');
    setFromType('full');
    setToType('full');
    setToEmail('');
    setCcEmail('');
    setReason('');
  };

  useEffect(() => {
    const fetchLeaveSummary = async () => {
      try {
        const response = await authAxios.get('/leave/summary/');
        if (response.status === 200) {
          const summary = response.data;
          setPendingLeaveCount(summary.total_leave || 0);
          setLopDays(summary.lop_days || 0);
          setLopAmount(summary.lop_amount || 0);
        }
      } catch (err) {
        console.error('❌ Error fetching summary:', err);
      }
    };
    fetchLeaveSummary();
  }, []);

  useEffect(() => {
    const fetchDepartmentHeadEmail = async () => {
      try {
        const response = await authAxios.get('/my-department-head/');
        if (response.status === 200) {
          setToEmail(response.data.email);
        }
      } catch (err) {
        console.error('❌ Error fetching department head email:', err);
      }
    };
    fetchDepartmentHeadEmail();
  }, []);

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const allowedDomains = ['gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com', 'icloud.com'];
    if (!emailRegex.test(email)) return false;
    const domain = email.split('@')[1];
    return allowedDomains.includes(domain);
  };

  const onFromChange = (event, selectedDate) => {
    setShowFromPicker(false);
    if (selectedDate) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate < today) {
        Toast.show({ type: 'error', text1: 'Invalid Date', text2: 'You cannot select a past date.' });
        return;
      }
      setFromDate(selectedDate);
    }
  };

  const onToChange = (event, selectedDate) => {
    setShowToPicker(false);
    if (selectedDate) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate < today) {
        Toast.show({ type: 'error', text1: 'Invalid Date', text2: 'You cannot select a past date.' });
        return;
      }
      if (selectedDate < fromDate) {
        Toast.show({ type: 'error', text1: 'Invalid Range', text2: 'To date cannot be earlier than From date.' });
        return;
      }
      setToDate(selectedDate);
    }
  };

  const submitLeaveRequest = async () => {
    if (!reason || !toEmail) {
      Toast.show({ type: 'error', text1: 'Validation Error', text2: 'Please fill all required fields.' });
      return;
    }

    if (!isValidEmail(toEmail)) {
      Toast.show({ type: 'error', text1: 'Invalid Email', text2: 'Enter a valid Gmail, Yahoo, or Outlook email.' });
      return;
    }

    if (ccEmail && !isValidEmail(ccEmail)) {
      Toast.show({ type: 'error', text1: 'Invalid CC Email', text2: 'Enter a valid Gmail, Yahoo, or Outlook email.' });
      return;
    }

    setLoading(true);
    try {
      const response = await authAxios.post('/leave/', {
        leave_type: selectedLeaveType,
        reason,
        from_date: fromDate.toISOString().split('T')[0],
        to_date: toDate.toISOString().split('T')[0],
        from_date_type: fromType,
        to_date_type: toType,
        to_email: toEmail,
        cc_email: ccEmail,
      });

      Toast.show({ type: 'success', text1: 'Leave Request Submitted', text2: 'Your request has been sent successfully!' });
      navigation.navigate('LeavePendingScreen');
    } catch (error) {
      if (error.response) {
        Toast.show({ type: 'error', text1: 'Error', text2: error.response.data?.detail || 'Something went wrong.' });
      } else if (error.request) {
        Toast.show({ type: 'error', text1: 'Network Error', text2: 'No response from server.' });
      } else {
        Toast.show({ type: 'error', text1: 'Unexpected Error', text2: error.message });
      }
    } finally {
      setLoading(false);
    }
  };

  const pickerModalStyle = {
    backgroundColor: isDarkMode ? '#151D34' : '#fff',
  };

  const pickerTextColor = isDarkMode ? '#fff' : '#000';

  return (
    <>
      <SafeAreaView style={{ flex: 0, backgroundColor: '#262D40' }} edges={['top']} />
      <SafeAreaView style={styles.container} edges={['left', 'right', 'bottom']}>
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name="arrow-back" size={24} color="#fff" style={{ marginBottom: 16 }} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Leave Request</Text>
          </View>

          <View style={styles.separator} />

          <KeyboardAwareScrollView contentContainerStyle={styles.content} enableOnAndroid={true} extraScrollHeight={80} keyboardShouldPersistTaps="handled">
            {/* Stats */}
            <View style={styles.statsContainer}>
              <View style={styles.statBox}>
                <Text style={styles.statLabel}>Pending Leaves</Text>
                <Text style={styles.statValue}>{pendingLeaveCount}</Text>
              </View>
              <View style={styles.statBox}>
                <Text style={styles.statLabel}>Loss of Pay Taken</Text>
                <Text style={styles.statValue}>₹ {lopAmount} - {lopDays}</Text>
              </View>
            </View>

            <View style={styles.divider} />

            {/* Dates & Half Days */}
            <View style={styles.section}>
              <View style={styles.dateRow}>
                {/* From */}
                <View style={styles.dateInput}>
                  <Text style={styles.inputLabel}>From</Text>
                  <TouchableOpacity style={styles.dateField} onPress={() => setShowFromPicker(true)}>
                    <Text style={styles.dateText}>{fromDate.toLocaleDateString()}</Text>
                    <Ionicons name="calendar" size={20} color="#ccc" />
                  </TouchableOpacity>
                  <DatePickerModal visible={showFromPicker} date={fromDate} onClose={() => setShowFromPicker(false)} onChange={(date) => setFromDate(date)} />

                  <Text style={[styles.inputLabel, { marginTop: 15 }]}>From Leave Type</Text>
                  <View style={styles.leaveTypeBox}>
                    <TouchableOpacity style={styles.pickerPreview} onPress={() => setShowFromTypePicker(true)}>
                      <Text style={styles.pickerPreviewText}>{getHalfDayLabel(fromType)}</Text>
                      <Ionicons name="chevron-down" size={18} color="#ccc" />
                    </TouchableOpacity>

                    <Modal visible={showFromTypePicker} transparent animationType="slide" onRequestClose={() => setShowFromTypePicker(false)}>
                      <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPressOut={() => setShowFromTypePicker(false)}>
                        <View style={[styles.modalContent, pickerModalStyle]}>
                          <Picker
                            selectedValue={fromType}
                            onValueChange={(value) => { if (value) setFromType(value); setShowFromTypePicker(false); }}
                            dropdownIconColor={pickerTextColor}
                            style={{ color: pickerTextColor }}
                          >
                            {halfDayTypes.map((item) => (
                              <Picker.Item key={item.id} label={item.label} value={item.value} color={pickerTextColor} />
                            ))}
                          </Picker>
                        </View>
                      </TouchableOpacity>
                    </Modal>
                  </View>
                </View>

                {/* To */}
                <View style={styles.dateInput}>
                  <Text style={styles.inputLabel}>To</Text>
                  <TouchableOpacity style={styles.dateField} onPress={() => setShowToPicker(true)}>
                    <Text style={styles.dateText}>{toDate.toLocaleDateString()}</Text>
                    <Ionicons name="calendar" size={20} color="#ccc" />
                  </TouchableOpacity>
                  <DatePickerModal visible={showToPicker} date={toDate} onClose={() => setShowToPicker(false)} onChange={(date) => setToDate(date)} />

                  <Text style={[styles.inputLabel, { marginTop: 15 }]}>To Leave Type</Text>
                  <View style={styles.leaveTypeBox}>
                    <TouchableOpacity style={styles.pickerPreview} onPress={() => setShowToTypePicker(true)}>
                      <Text style={styles.pickerPreviewText}>{getHalfDayLabel(toType)}</Text>
                      <Ionicons name="chevron-down" size={18} color="#ccc" />
                    </TouchableOpacity>

                    <Modal visible={showToTypePicker} transparent animationType="slide" onRequestClose={() => setShowToTypePicker(false)}>
                      <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPressOut={() => setShowToTypePicker(false)}>
                        <View style={[styles.modalContent, pickerModalStyle]}>
                          <Picker
                            selectedValue={toType}
                            onValueChange={(value) => { if (value) setToType(value); setShowToTypePicker(false); }}
                            dropdownIconColor={pickerTextColor}
                            style={{ color: pickerTextColor }}
                          >
                            {halfDayTypes.map((item) => (
                              <Picker.Item key={item.id} label={item.label} value={item.value} color={pickerTextColor} />
                            ))}
                          </Picker>
                        </View>
                      </TouchableOpacity>
                    </Modal>
                  </View>
                </View>
              </View>
            </View>

            {/* Leave Type */}
            <View style={styles.section}>
              <Text style={styles.inputLabel}>Leave Type</Text>
              <View style={styles.leaveTypeBox}>
                <TouchableOpacity style={styles.pickerPreview} onPress={() => setShowLeaveTypePicker(true)}>
                  <Text style={styles.pickerPreviewText}>{selectedLeaveType?.toUpperCase()}</Text>
                  <Ionicons name="chevron-down" size={18} color="#ccc" />
                </TouchableOpacity>

                <Modal visible={showLeaveTypePicker} transparent animationType="slide" onRequestClose={() => setShowLeaveTypePicker(false)}>
                  <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPressOut={() => setShowLeaveTypePicker(false)}>
                    <View style={[styles.modalContent, pickerModalStyle]}>
                      <Picker
                        selectedValue={selectedLeaveType}
                        onValueChange={(value) => { if (value) setSelectedLeaveType(value); setShowLeaveTypePicker(false); }}
                        dropdownIconColor={pickerTextColor}
                        style={{ color: pickerTextColor }}
                      >
                        {leaveTypes.map((item) => (
                          <Picker.Item key={item.id} label={item.type} value={item.type} color={pickerTextColor} />
                        ))}
                      </Picker>
                    </View>
                  </TouchableOpacity>
                </Modal>
              </View>
            </View>

            {/* To / CC / Reason */}
            <View style={styles.section}>
              <Text style={styles.inputLabel}>To</Text>
              <TextInput style={styles.input} placeholder="Department Lead Email" placeholderTextColor="#889" value={toEmail} onChangeText={setToEmail} keyboardType="email-address" />
            </View>

            <View style={styles.section}>
              <Text style={styles.inputLabel}>C.C</Text>
              <TextInput style={styles.input} placeholder="Enter Email" placeholderTextColor="#889" value={ccEmail} onChangeText={setCcEmail} keyboardType="email-address" />
            </View>

            <View style={styles.section}>
              <Text style={styles.inputLabel}>Reason</Text>
              <TextInput style={styles.textArea} placeholder="Enter Reason" placeholderTextColor="#889" multiline value={reason} onChangeText={setReason} />
            </View>
          </KeyboardAwareScrollView>

          {/* Footer */}
          <View style={styles.footer}>
            <TouchableOpacity style={styles.deleteButton} onPress={clearForm}>
              <Ionicons name="trash" size={24} color="#ff3333" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.applyButton} onPress={submitLeaveRequest} disabled={loading}>
              <Text style={styles.applyButtonText}>{loading ? 'Applying...' : 'Apply Leave'}</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
}
