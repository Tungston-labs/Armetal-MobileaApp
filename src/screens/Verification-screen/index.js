// index.js
import React, { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from './styles';

export default function VerificationScreen() {
  const navigation = useNavigation();
  const [otp, setOtp] = useState(['', '', '', '', '']);
  const inputs = useRef([]);

  const handleOtpChange = (text, index) => {
    if (text.length > 1) {
      // Handle paste
      const chars = text.slice(0, 5).split('');
      const newOtp = otp.map((_, i) => chars[i] || '');
      setOtp(newOtp);
      // Focus last filled
      const lastIndex = Math.min(chars.length - 1, 4);
      inputs.current[lastIndex]?.focus();
      return;
    }

    // Only accept digits
    if (!/^\d*$/.test(text)) return;

    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    if (text && index < 4) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = ({ nativeEvent }, index) => {
    if (nativeEvent.key === 'Backspace') {
      if (otp[index] === '') {
        // Go back
        if (index > 0) {
          inputs.current[index - 1]?.focus();
          const newOtp = [...otp];
          newOtp[index - 1] = '';
          setOtp(newOtp);
        }
      } else {
        // Just clear current
        const newOtp = [...otp];
        newOtp[index] = '';
        setOtp(newOtp);
      }
    }
  };

  const handleContinue = () => {
    console.log('Entered OTP:', otp.join(''));
    navigation.navigate('SetNewPasswordScreen');
  };

  const handleResend = () => {
    console.log('Resend OTP');
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
        <Text style={styles.subtitle}>We sent a code to Dummy@gmail.com</Text>

        <View style={styles.otpContainer}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              style={styles.otpInput}
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
          <Text style={styles.resendText}>Resent OTP</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

