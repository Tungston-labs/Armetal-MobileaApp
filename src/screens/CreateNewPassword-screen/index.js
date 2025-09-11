import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';

export default function CreateNewPasswordScreen() {
  const navigation = useNavigation();

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const showToast = (type, text1, text2) => {
    Toast.show({
      type,
      text1,
      text2,
      position: 'bottom',
    });
  };

  const handleSetPassword = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      showToast('error', 'Validation Error', 'All fields are required.');
      return;
    }

    if (newPassword !== confirmPassword) {
      showToast('error', 'Validation Error', 'New password and confirmation do not match.');
      return;
    }

    try {
      const token = await AsyncStorage.getItem('accessToken');
      const response = await axios.post(
        'http://178.248.112.16:8001/api/change-password/',
        {
          old_password: currentPassword,
          new_password: newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      showToast('success', 'Success', 'Password changed successfully.');
      setTimeout(() => {
        navigation.goBack();
      }, 1500);
    } catch (error) {
      if (error.response) {
        console.error(error.response.data);
        showToast('error', 'Error', error.response.data.detail || 'Password change failed.');
      } else {
        console.error(error.message);
        showToast('error', 'Error', 'Something went wrong.');
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#151D34" />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="#fff"  />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.title}>Create a New Password</Text>
        <Text style={styles.subtitle}>
          Update your password to keep your{'\n'}account secure.
        </Text>

        {/* Current password */}
        <Text style={styles.label}>Current password</Text>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="******"
            placeholderTextColor="#aaa"
            secureTextEntry={!showCurrent}
            value={currentPassword}
            onChangeText={setCurrentPassword}
          />
          <TouchableOpacity onPress={() => setShowCurrent(!showCurrent)}>
            <Ionicons
              name={showCurrent ? 'eye-off' : 'eye'}
              size={22}
              color="#aaa"
            />
          </TouchableOpacity>
        </View>

        {/* New password */}
        <Text style={styles.label}>Enter new password</Text>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="******"
            placeholderTextColor="#aaa"
            secureTextEntry={!showNew}
            value={newPassword}
            onChangeText={setNewPassword}
          />
          <TouchableOpacity onPress={() => setShowNew(!showNew)}>
            <Ionicons
              name={showNew ? 'eye-off' : 'eye'}
              size={22}
              color="#aaa"
            />
          </TouchableOpacity>
        </View>

        {/* Confirm password */}
        <Text style={styles.label}>Confirm Password</Text>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="******"
            placeholderTextColor="#aaa"
            secureTextEntry={!showConfirm}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
          <TouchableOpacity onPress={() => setShowConfirm(!showConfirm)}>
            <Ionicons
              name={showConfirm ? 'eye-off' : 'eye'}
              size={22}
              color="#aaa"
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSetPassword}>
          <Text style={styles.buttonText}>Set new password</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
