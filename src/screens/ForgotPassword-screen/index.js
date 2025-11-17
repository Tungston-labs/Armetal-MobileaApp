// index.js
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import styles from './styles';

const ForgotPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async () => {
    if (!email) {
      Alert.alert('Validation Error', 'Please enter your email address.');
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        'http://178.248.112.16:8001/api/forgot-password/send-otp/',
        { email }
      );

      setLoading(false);

      if (response.status === 200) {
        Alert.alert('Success', 'OTP sent to your email.');
        // Navigate to Verification screen with email
        navigation.navigate('VerificationScreen', { email });
      }
    } catch (error) {
      setLoading(false);

      if (error.response) {
        Alert.alert('Error', error.response.data.detail || 'Failed to send OTP.');
      } else {
        Alert.alert('Error', 'Something went wrong. Try again later.');
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0B1437" />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} // move content up
        keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0} // adjust offset if needed
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name="arrow-back" size={24} color="#fff" style={{ marginLeft: 16 }} />
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
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />

            <TouchableOpacity
              style={styles.button}
              onPress={handleResetPassword}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.buttonText}>Reset password</Text>
              )}
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ForgotPasswordScreen;
