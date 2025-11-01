import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import styles from './styles';
import authAxios from '../../utils/authAxios';

const API_BASE_URL = 'http://178.248.112.16:8000';
const defaultAvatar = "https://cdn-icons-png.flaticon.com/512/149/149071.png";

export default function LeaveHeader() {
  const navigation = useNavigation();
  const route = useRoute();
  const [summary, setSummary] = useState(null);
  const [profilePic, setProfilePic] = useState(null);
  const [loading, setLoading] = useState(true);

  const tabs = [
    { label: 'All', screen: 'LeaveAllScreen' },
    { label: 'Approved', screen: 'LeaveApproveScreen' },
    { label: 'Rejected', screen: 'LeaveRejectedScreen' },
    { label: 'Pending', screen: 'LeavePendingScreen' },
  ];

  // Determine active tab from route
  const tabMap = {
    LeaveAllScreen: 'All',
    LeaveApproveScreen: 'Approved',
    LeaveRejectedScreen: 'Rejected',
    LeavePendingScreen: 'Pending',
  };
  const activeTab = tabMap[route.name] || 'All';

  const getProfileUri = (pic) => {
    if (!pic) return defaultAvatar;
    if (pic.startsWith("http")) return pic;
    const path = pic.startsWith("/") ? pic : `/media/${pic}`;
    return `${API_BASE_URL}${path}`;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const summaryRes = await authAxios.get("/leave/summary/");
        setSummary(summaryRes.data);

        const profileRes = await authAxios.get("/profile/");
        setProfilePic(getProfileUri(profileRes.data?.profile_pic));
      } catch (error) {
        //console.error("Error fetching data:", error.message);
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
            <Text style={styles.counterText}>Pending leave    {summary?.total_leave || 0}</Text>
            <Text style={styles.counterText}>Leave taken      {summary?.approved_count || 0}</Text>
          </View>
        </View>
        {/* <TouchableOpacity onPress={() => navigation.navigate("ProfileScreen")}>
          <Image source={{ uri: profilePic }} style={styles.avatar} />
        </TouchableOpacity> */}
      </View>

      {/* Tabs */}
      <View style={styles.tabs}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.label}
            onPress={() => navigation.navigate(tab.screen)}
            style={styles.tabButton}
          >
            <Text style={activeTab === tab.label ? styles.tabSelected : styles.tab}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}
