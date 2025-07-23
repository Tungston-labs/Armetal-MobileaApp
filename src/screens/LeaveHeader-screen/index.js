import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import styles from './styles';
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_BASE_URL = 'http://178.248.112.16:8000';

export default function LeaveHeader({ navigation, selectedTab }) {
  const [summary, setSummary] = useState(null);
  const [profilePic, setProfilePic] = useState(null);
  const [loading, setLoading] = useState(true);

  const tabs = [
    { label: 'All', screen: 'LeaveAllScreen' },
    { label: 'Approved', screen: 'LeaveApproveScreen' },
    { label: 'Rejected', screen: 'LeaveRejectedScreen' },
    { label: 'Pending', screen: 'LeavePendingScreen' },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await AsyncStorage.getItem('accessToken');
        if (!token) return;

        // Fetch leave summary
        const summaryRes = await axios.get(`${API_BASE_URL}/api/leave/summary/`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setSummary(summaryRes.data);

        // Fetch profile picture
        const profileRes = await axios.get(`${API_BASE_URL}/api/profile/`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const picUrl = profileRes.data?.profile_pic
          ? `${API_BASE_URL}${profileRes.data.profile_pic}`
          : 'https://cdn-icons-png.flaticon.com/512/149/149071.png';

        setProfilePic(picUrl);
      } catch (error) {
        console.error('Error fetching data:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <View style={styles.header}>
        <ActivityIndicator size="small" color="#fff" />
      </View>
    );
  }

  return (
    <View>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Leave Request</Text>
          <View style={styles.counters}>
            <Text style={styles.counterText}>Pending leave {summary?.pending_count || 0}</Text>
            <Text style={styles.counterText}>Leave taken {summary?.approved_count || 0}</Text>
          </View>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate("ProfileScreen")}>
          <Image
            source={{ uri: profilePic }}
            style={styles.avatar}
          />
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View style={styles.tabs}>
       {tabs.map((tab) => (
  <TouchableOpacity
    key={tab.label}
    onPress={() => navigation.navigate(tab.screen)}
    style={styles.tabButton}
  >
    <Text
      style={selectedTab === tab.label ? styles.tabSelected : styles.tab}
    >
      {tab.label}
    </Text>
  </TouchableOpacity>
))}
      </View>
    </View>
  );
}
