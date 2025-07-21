import React, { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import styles from './styles';

export default function VerificationScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const email = route.params?.email; // Passed from ForgotPasswordScreen

  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const inputs = useRef([]);

  const handleOtpChange = (text, index) => {
    if (text.length > 1) {
      const chars = text.slice(0, 6).split('');
      const newOtp = otp.map((_, i) => chars[i] || '');
      setOtp(newOtp);
      inputs.current[Math.min(chars.length - 1, 5)]?.focus();
      return;
    }

    if (!/^\d*$/.test(text)) return;

    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    if (text && index < 5) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = ({ nativeEvent }, index) => {
    if (nativeEvent.key === 'Backspace') {
      if (otp[index] === '' && index > 0) {
        inputs.current[index - 1]?.focus();
        const newOtp = [...otp];
        newOtp[index - 1] = '';
        setOtp(newOtp);
      } else {
        const newOtp = [...otp];
        newOtp[index] = '';
        setOtp(newOtp);
      }
    }
  };

  const handleContinue = async () => {
    const enteredOtp = otp.join('');
    if (enteredOtp.length < 6) {
      Alert.alert('Error', 'Please enter a 6-digit OTP.');
      return;
    }

    try {
      const response = await axios.post('http://178.248.112.16:8000/api/forgot-password/verify-otp/', {
        email,
        otp: enteredOtp,
      });

      // ✅ On success, move to password reset
      Alert.alert('Verified', 'OTP verified successfully.');
      navigation.navigate('SetNewPasswordScreen', { email });
    } catch (error) {
      console.error(error.response?.data || error.message);
      Alert.alert('Verification Failed', 'Invalid or expired OTP.');
    }
  };

  const handleResend = async () => {
    try {
      await axios.post('http://178.248.112.16:8000/api/forgot-password/send-otp/', { email });
      Alert.alert('OTP Sent', 'A new OTP has been sent to your email.');
    } catch (error) {
      console.error(error.response?.data || error.message);
      Alert.alert('Error', 'Failed to resend OTP.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={28} color="#fff" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <Text style={styles.title}>Verification</Text>
        <Text style={styles.subtitle}>We sent a code to {email || 'your email'}</Text>

        <View style={styles.otpContainer}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              style={[styles.otpInput, { width: 45 }]} // Shrink width for 6 boxes
              keyboardType="number-pad"
              maxLength={1}
              value={digit}
              onChangeText={(text) => handleOtpChange(text, index)}
              onKeyPress={(e) => handleKeyPress(e, index)}
              ref={(ref) => (inputs.current[index] = ref)}
              returnKeyType="next"
              autoCorrect={false}
              autoCapitalize="none"
            />
          ))}
        </View>

        <TouchableOpacity style={styles.button} onPress={handleContinue}>
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleResend}>
          <Text style={styles.resendText}>Resend OTP</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
