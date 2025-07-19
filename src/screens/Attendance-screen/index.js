import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import styles from './styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_BASE_URL = 'http://178.248.112.16:8000';

const AttendanceScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const { sessions = [], totalHours = '00:00 Hrs', date = '---' } = route.params || {};

  const [profilePic, setProfilePic] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfilePic = async () => {
      try {
        const token = await AsyncStorage.getItem('accessToken');
        if (!token) return;

        const response = await axios.get(`${API_BASE_URL}/api/profile/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const imageUrl = response.data?.profile_pic
          ? `${API_BASE_URL}${response.data.profile_pic}`
          : 'https://cdn-icons-png.flaticon.com/512/149/149071.png';

        setProfilePic(imageUrl);
      } catch (error) {
        console.error('Error fetching profile:', error.message);
        setProfilePic('https://cdn-icons-png.flaticon.com/512/149/149071.png');
      } finally {
        setLoading(false);
      }
    };

    fetchProfilePic();
  }, []);

  const renderItem = ({ item, index }) => {
    const punchIn = item.time_in || '-- --';
    const punchOut = item.time_out || '-- --';

    return (
      <View style={styles.row} key={index}>
        <Text style={styles.cell}>{punchIn}</Text>
        <Text style={styles.cell}>{punchOut}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Attendance Details</Text>
        {loading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Image source={{ uri: profilePic }} style={styles.profileImage} />
        )}
      </View>

      {/* Info Header */}
      <View style={styles.infoBox}>
        <Text style={styles.dateText}>Date: {date}</Text>
        <Text style={styles.totalHoursText}>Total Hours: {totalHours}</Text>
      </View>

      {/* Table */}
      <View style={styles.tableContainer}>
        <View style={styles.tableHeader}>
          <Text style={styles.headerCell}>Punch In</Text>
          <Text style={styles.headerCell}>Punch Out</Text>
        </View>
        <FlatList
          data={sessions}
          renderItem={renderItem}
          keyExtractor={(_, index) => index.toString()}
        />
      </View>
    </SafeAreaView>
  );
};

export default AttendanceScreen;
