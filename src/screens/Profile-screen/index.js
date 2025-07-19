import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from './styles';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const defaultAvatar = 'https://cdn-icons-png.flaticon.com/512/149/149071.png';
const API_BASE_URL = 'http://178.248.112.16:8000';

const ProfileScreen = () => {
  const navigation = useNavigation();
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = await AsyncStorage.getItem('accessToken');
        if (!token) {
          Alert.alert('Error', 'Access token not found');
          return;
        }

        const response = await axios.get(`${API_BASE_URL}/api/profile/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setEmployee(response.data);
      } catch (error) {
        console.error('Error fetching profile:', error.message);
        Alert.alert('Error', 'Failed to load profile');
      }
    };

    fetchProfile();
  }, []);

  const profileImage = employee?.profile_pic
    ? { uri: `${API_BASE_URL}${employee.profile_pic}` }
    : { uri: defaultAvatar };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
      </View>

      {/* Content */}
      <View style={styles.content}>
        {/* Profile Image */}
        <View style={styles.profileSection}>
          <Image
            source={profileImage}
            style={styles.profileImage}
          />
        </View>

        {/* Options */}
        <TouchableOpacity
          style={styles.optionCard}
          onPress={() => navigation.navigate('SalarySlipScreen')}
        >
          <Ionicons name="receipt-outline" size={22} color="#ccc" />
          <Text style={styles.optionText}>Salary slip</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.optionCard}
          onPress={() => navigation.navigate('DocumentsScreen')}
        >
          <Ionicons name="document-attach-outline" size={22} color="#ccc" />
          <Text style={styles.optionText}>Documents</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.optionCard}
          onPress={() => navigation.navigate('CreateNewPasswordScreen')}
        >
          <Ionicons name="key-outline" size={22} color="#ccc" />
          <Text style={styles.optionText}>Change Password</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.optionCard}
          onPress={() => navigation.navigate('LoginScreen')}
        >
          <Ionicons name="log-out-outline" size={22} color="#ccc" />
          <Text style={styles.optionText}>Log out</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;
