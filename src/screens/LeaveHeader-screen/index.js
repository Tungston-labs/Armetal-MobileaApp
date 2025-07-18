
import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import styles from './styles';
import axios from 'axios'; // Make sure Axios is installed
import AsyncStorage from "@react-native-async-storage/async-storage";


export default function LeaveHeader({ navigation, selectedTab }) {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);


  const tabs = [
    { label: 'All', screen: 'LeaveAllScreen' },
    { label: 'Approved', screen: 'LeaveApproveScreen' },
    { label: 'Rejected', screen: 'LeaveRejectedScreen' },
    { label: 'Pending', screen: 'LeavePendingScreen' },
  ];

  useEffect(() => {
    const fetchLeaveSummary = async () => {
      try {
        const token = await AsyncStorage.getItem('accessToken');

        const response = await axios.get('http://178.248.112.16:8000/api/leave/summary/', {
          headers: {
            Authorization: `Bearer ${token}`

          },
        });
        setSummary(response.data);
      } catch (error) {
        console.error('Error fetching leave summary:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaveSummary();
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
        <TouchableOpacity
          onPress={() => navigation.navigate("ProfileScreen")}
        >
          <Image
            source={{
              uri: summary?.profile_pic || 'https://i.pravatar.cc/150',
            }}
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
