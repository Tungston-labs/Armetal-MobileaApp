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
import SwipeLoader from "../../components/SwipeLoader"
const defaultAvatar = require('../../assets/avatar.png');

const DepartmentScreen = () => {
  const navigation = useNavigation();
  const [members, setMembers] = useState([]);
  const [departmentName, setDepartmentName] = useState('');
  const [departmentHead, setDepartmentHead] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchDepartmentMembers = async () => {
    try {
      setLoading(true);
      const res = await authAxios.get('/employees/my-department/');
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

  const getFullImageUrl = (url) => {
    if (!url) return null;
    return url.startsWith('http') ? url : `http://178.248.112.16:8001${url}`;
  };

  const renderMember = ({ item }) => (
    <View style={styles.memberItem}>
      <Image
        source={item.profile_pic ? { uri: getFullImageUrl(item.profile_pic) } : defaultAvatar}
        style={styles.avatar}
      />
      <Text style={styles.memberName}>{item.name}</Text>
    </View>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <SwipeLoader size="large" color="#3352BA" style={{ marginTop: 50 }} />
      </SafeAreaView>
    );
  }

  return (
     <>
      {/* Background behind notch */}
      <SafeAreaView style={{ flex: 0, backgroundColor: '#262D40' }} edges={['top']} />
    
      {/* Main container (below the notch) */}
      <SafeAreaView style={styles.container} edges={['left', 'right', 'bottom']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
                <Ionicons
                  name="arrow-back"
                  size={24}
                  color="#fff"
                  style={{ marginBottom: 16 }}
                />
              </TouchableOpacity>
        <Text style={styles.headerTitle}>Team</Text>
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
                ? { uri: getFullImageUrl(departmentHead.profile_pic) }
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
    </>
  );
};

export default DepartmentScreen;
