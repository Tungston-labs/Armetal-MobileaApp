import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Alert,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from './styles';
import axios from 'axios';

const ForgotPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');

  const handleResetPassword = async () => {
    if (!email) {
      Alert.alert('Validation Error', 'Please enter your email address.');
      return;
    }

    try {
      const response = await axios.post('http://192.168.29.146:8000/api/forgot-password/send-otp/', {
        email,
      });

      // Optional: show success message
      Alert.alert('Success', 'OTP sent to your email.');

      // Navigate to OTP screen and pass email if needed
      navigation.navigate('VerificationScreen', { email });
    } catch (error) {
      console.error('Error sending OTP:', error.response?.data || error.message);
      Alert.alert('Error', 'Failed to send OTP. Please try again.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0B1437" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>Forgot password ?</Text>
        <Text style={styles.subtitle}>
          No worries we will send you{'\n'}reset instructions
        </Text>

        <Text style={styles.label}>Your Email Address</Text>
        <TextInput
          style={styles.input}
          placeholder="Your Email Address"
          placeholderTextColor="#aaa"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />

        <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
          <Text style={styles.buttonText}>Reset password</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ForgotPasswordScreen;
