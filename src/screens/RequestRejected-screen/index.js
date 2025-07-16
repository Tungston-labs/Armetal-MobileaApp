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
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function RequestRejected({ navigation, route }) {
  const { leaveId } = route.params; // 👈 Receive leaveId from navigation
  const [leave, setLeave] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaveDetail = async () => {
      try {
        const token = await AsyncStorage.getItem('accessToken');
        const response = await axios.get(
          `http://178.248.112.16:8000/api/leave/emp/${leaveId}/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setLeave(response.data);
      } catch (error) {
        console.error('Failed to fetch rejected leave details:', error);
        Alert.alert('Error', 'Could not load rejected leave details.');
      } finally {
        setLoading(false);
      }
    };

    fetchLeaveDetail();
  }, [leaveId]);

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
          <Image source={{ uri: 'https://i.pravatar.cc/150' }} style={styles.avatar} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.card}>
          <View style={styles.statusBadge}>
            <Text style={styles.statusText}>{leave.status}</Text>
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
              <Text style={styles.value}>11:30 AM</Text> {/* Optional: if backend has time */}
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
