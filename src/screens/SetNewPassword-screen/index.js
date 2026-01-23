

// index.js
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';
import styles from './styles';
import Toast from 'react-native-toast-message';

export default function SetNewPasswordScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const email = route.params?.email;

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL;

  const handleResetPassword = async () => {
    if (!password || !confirmPassword) {
      Toast.show({
        type: 'error',
        text1: 'Validation Error',
        text2: 'Please fill out all fields.',
        text1Style: { fontSize: 18, fontFamily: "Montserrat_700Bold" },
        text2Style: { fontSize: 15, fontFamily: "Raleway_500Medium" },
      });
      return;
    }
    if (password !== confirmPassword) {
      Toast.show({
        type: 'error',
        text1: 'Validation Error',
        text2: 'Passwords do not match.',
        text1Style: { fontSize: 18, fontFamily: "Montserrat_700Bold" },
        text2Style: { fontSize: 15, fontFamily: "Raleway_500Medium" },
      });
      return;
    }

    try {
      const response = await axios.post(`${BASE_URL}/api/forgot-password/reset/`, {
        email,
        new_password: password,
        confirm_password: confirmPassword,
      });

      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Password reset successful.',
        text1Style: { fontSize: 18, fontFamily: "Montserrat_700Bold" },
        text2Style: { fontSize: 15, fontFamily: "Raleway_500Medium" },
      });
      navigation.navigate('LoginScreen');
    } catch (error) {
      console.error('Reset Error:', error.response?.data || error.message);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: error.response?.data?.detail || 'Failed to reset password.',
        text1Style: { fontSize: 18, fontFamily: "Montserrat_700Bold" },
        text2Style: { fontSize: 15, fontFamily: "Raleway_500Medium" },
      });
    }
  };

  return (




    <SafeAreaView style={styles.container}>


      

      <StatusBar barStyle="light-content" backgroundColor="#0B1437" />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="#fff" marginTop="20" />
        </TouchableOpacity>
      </View>



      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}
      >
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >

          <Text style={styles.title}>Set new password</Text>
          <Text style={styles.subtitle}>Enter your new password</Text>

          {/* Password Input */}
          <Text style={styles.label}>Password</Text>
          <View style={{ position: 'relative' }}>
            <TextInput
              style={styles.input}
              placeholder="******"
              placeholderTextColor="#aaa"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
              style={{
                position: 'absolute',
                right: 15,
                top: Platform.OS === 'ios' ? 14 : 12,
              }}
            >
              <Ionicons
                name={showPassword ? 'eye' : 'eye-off'}
                size={22}
                color="#555"
              />
            </TouchableOpacity>
          </View>

          {/* Confirm Password Input */}
          <Text style={styles.label}>Confirm Password</Text>
          <View style={{ position: 'relative' }}>
            <TextInput
              style={styles.input}
              placeholder="******"
              placeholderTextColor="#aaa"
              secureTextEntry={!showConfirmPassword}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
            <TouchableOpacity
              onPress={() => setShowConfirmPassword(!showConfirmPassword)}
              style={{
                position: 'absolute',
                right: 15,
                top: Platform.OS === 'ios' ? 14 : 12,
              }}
            >
              <Ionicons
                name={showConfirmPassword ? 'eye' : 'eye-off'}
                size={22}
                color="#555"
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
            <Text style={styles.buttonText}>Reset password</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
