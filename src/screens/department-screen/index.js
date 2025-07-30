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
import authAxios from '../../utils/authAxios';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import axios from 'axios';

const defaultAvatar = require('../../assets/avatar.png');

const DepartmentScreen = () => {
  const navigation = useNavigation();
  const [members, setMembers] = useState([]);
  const [departmentName, setDepartmentName] = useState('');
  const [departmentHead, setDepartmentHead] = useState(null);
  const [loading, setLoading] = useState(true);

  // const API_URL = 'http://178.248.112.16:8000/api/employees/my-department/';

 const fetchDepartmentMembers = async () => {
    try {
      const res = await authAxios.get('/employees/my-department/'); // ✅ shortened URL
      setMembers(res.data.members || []);
      setDepartmentName(res.data.department || 'Department');
      setDepartmentHead(res.data.head || null);
    } catch (error) {
      console.error('Error fetching department members:', error.message);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchDepartmentMembers();
  }, []);

  const renderMember = ({ item }) => {
  const imageUrl = item.profile_pic?.startsWith('http')
    ? item.profile_pic
    : `http://178.248.112.16:8000${item.profile_pic}`;

  return (
    <View style={styles.memberItem}>
      <Image
        source={item.profile_pic ? { uri: imageUrl } : defaultAvatar}
        style={styles.avatar}
      />
      <Text style={styles.memberName}>{item.name}</Text>
    </View>
  );
};

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
        <Text style={styles.teamLeadLabel}>Team Lead</Text>
        <View style={styles.teamLeadInfo}>
          <Image
            source={
              departmentHead?.profile_pic
                ? { uri: departmentHead.profile_pic }
                : defaultAvatar
            }
            style={styles.leadAvatar}
          />
          <Text style={styles.teamLeadName}>
            {departmentHead?.name || 'Not Assigned'}
          </Text>
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
