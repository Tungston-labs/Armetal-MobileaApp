import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from './styles';
import BottomNavbar from '../BottomNavbar';
// import axios from 'axios';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import authAxios from '../../utils/authAxios';
import { useFonts, Montserrat_400Regular, Montserrat_500Medium, Montserrat_700Bold } from '@expo-google-fonts/montserrat';
export default function RequestRejected({ navigation, route }) {
  const { leaveId } = route.params; // 👈 Receive leaveId from navigation
  const [leave, setLeave] = useState(null);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);


  const API_BASE_URL = 'http://178.248.112.16:8001';

  const formatTime = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true, // set to false if you prefer 24-hour format
    });
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await authAxios.get(`${API_BASE_URL}/api/profile/`);
        setProfile(response.data);
      } catch (error) {
        console.error("Error fetching profile:", error);
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'Could not fetch profile.',
        });
      }
    };

    fetchProfile();
  }, []);



  useEffect(() => {
    const fetchLeaveDetail = async () => {
      try {
        const response = await authAxios.get(`${API_BASE_URL}/api/leave/emp/${leaveId}/`);
        setLeave(response.data);
      } catch (error) {
        console.error('Failed to fetch rejected leave details:', error);
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'Could not load rejected leave details.',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchLeaveDetail();
  }, [leaveId]);

  const [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_700Bold,
  });
  if (loading || !leave) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={{ textAlign: 'center', marginTop: 30 }}>
          Loading leave details...
        </Text>
      </SafeAreaView>
    );
  }


  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.topHeader}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Request detail</Text>
        <TouchableOpacity onPress={() => navigation.navigate('ProfileScreen')}>
          <Image
            source={{
              uri: profile?.profile_pic
                ? `${API_BASE_URL}${profile.profile_pic}`
                : "https://cdn-icons-png.flaticon.com/512/149/149071.png",
            }}
            style={styles.avatar}
          />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.card}>
          <View style={styles.statusBadge}>
            <Text style={styles.statusText}>{leave.status.charAt(0).toUpperCase() + leave.status.slice(1).toLowerCase()}
            </Text>
          </View>

          <View style={styles.row}>
            <View style={styles.column}>
              <Text style={styles.label}>From</Text>
              <Text style={styles.value}>{leave.from_date}</Text>
            </View>
            <View style={styles.column}>
              <Text style={styles.label}>To</Text>
              <Text style={styles.value}>{leave.to_date}</Text>
            </View>

            <View style={styles.column}>
              <Text style={styles.label}>Time</Text>
              <Text style={styles.value}>{formatTime(leave.created_at)}</Text>


            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionLabel}>Leave Type</Text>
            <Text style={styles.sectionValue}>{leave.leave_type}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionLabel}>Reason</Text>
            <Text style={styles.reasonText}>{leave.reason}</Text>
          </View>
        </View>
      </ScrollView>

      <BottomNavbar navigation={navigation} route={route} />
    </SafeAreaView>
  );
}
