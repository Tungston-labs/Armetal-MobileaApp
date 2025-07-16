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
  Alert,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';
import styles from './styles';

export default function SetNewPasswordScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const email = route.params?.email;

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleResetPassword = async () => {
    if (!password || !confirmPassword) {
      Alert.alert('Error', 'Please fill out all fields.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match.');
      return;
    }

    try {
      const response = await axios.post('http://178.248.112.16:8000/api/forgot-password/reset/', {
        email,
        new_password: password,
        confirm_password: confirmPassword,
      });

      Alert.alert('Success', 'Password reset successful.');
      navigation.navigate('LoginScreen');
    } catch (error) {
      console.error('Reset Error:', error.response?.data || error.message);
      Alert.alert('Error', error.response?.data?.detail || 'Failed to reset password.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0B1437" />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={28} color="#fff" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <Text style={styles.title}>Set new password</Text>
        <Text style={styles.subtitle}>Enter your new password</Text>

        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="******"
          placeholderTextColor="#aaa"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <Text style={styles.label}>Confirm Password</Text>
        <TextInput
          style={styles.input}
          placeholder="******"
          placeholderTextColor="#aaa"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />

        <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
          <Text style={styles.buttonText}>Reset password</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
