import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from './styles';
import authAxios from '../../utils/authAxios';

const ProfileScreen = () => {
  const navigation = useNavigation();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await authAxios.get('/profile/');
        setProfile(response.data);
      } catch (error) {
        console.error('Failed to load profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

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
        {/* Loading Indicator */}
        {loading ? (
          <ActivityIndicator size="large" color="#000" />
        ) : (
          <>
            {/* Profile Image */}
            <View style={styles.profileSection}>
              {profile?.profile_pic ? (
                <Image
                  source={{ uri: profile.profile_pic }}
                  style={styles.profileImage}
                />
              ) : (
                <Ionicons
                  name="person-circle-outline"
                  size={100}
                  color="#ccc"
                  style={styles.profileImage}
                />
              )}
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
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;
