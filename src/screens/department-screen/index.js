import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const defaultAvatar = require('../../assets/avatar.png'); // fallback image

const DepartmentScreen = () => {
  const navigation = useNavigation();
  const [members, setMembers] = useState([]);
  const [departmentName, setDepartmentName] = useState('');
  const [loading, setLoading] = useState(true);

  const API_URL = 'http://178.248.112.16:8000/api/employees/my-department/';

  const fetchDepartmentMembers = async () => {
    try {
      const token = await AsyncStorage.getItem('accessToken');
      if (!token) {
        console.warn('Access token not found');
        return;
      }

      const res = await axios.get(API_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setMembers(res.data || []);
      if (res.data.length > 0) {
        setDepartmentName(res.data[0].department || 'Department');
      }
    } catch (error) {
      console.error('Error fetching department members:', error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDepartmentMembers();
  }, []);

  const renderMember = ({ item }) => (
    <View style={styles.memberItem}>
      <Image
        source={item.profile_pic ? { uri: item.profile_pic } : defaultAvatar}
        style={styles.avatar}
      />
      <Text style={styles.memberName}>{item.name}</Text>
    </View>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#3352BA" style={{ marginTop: 50 }} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Department</Text>
      </View>

      {/* Team Card */}
      <LinearGradient
        colors={['#172554', '#3352BA']}
        start={{ x: 0.8, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.teamCard}
      >
        <Text style={styles.teamTitle}>{departmentName}</Text>
        <Text style={styles.teamLeadLabel}>Team lead</Text>
        <View style={styles.teamLeadInfo}>
          <Image source={defaultAvatar} style={styles.leadAvatar} />
          <Text style={styles.teamLeadName}>N/A</Text>
        </View>
        <View style={styles.memberRow}>
          <Text style={styles.memberCount}>Members Count</Text>
          <Text style={styles.count}>{members.length}</Text>
        </View>
      </LinearGradient>

      {/* Members List */}
      <Text style={styles.membersHeader}>Team Members</Text>
      <FlatList
        data={members}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderMember}
        contentContainerStyle={styles.memberList}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default DepartmentScreen;
