import React from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';

// ✅ Add this line
const avatar = require('../../assets/avatar.png'); // or use a placeholder URI

const teamMembers = [
  { id: '1', name: 'Allison Lipshutz', avatar },
  { id: '2', name: 'Cristofer Siphron', avatar },
  { id: '3', name: 'Cristofer Bator', avatar },
  { id: '4', name: 'Allison Lipshutz', avatar },
  { id: '5', name: 'Carter Kenter', avatar },
  { id: '6', name: 'Allison Lipshutz', avatar },
  { id: '7', name: 'Carter Kenter', avatar },
  { id: '8', name: 'Carter Kenter', avatar },
  { id: '9', name: 'Carter Kenter', avatar },
  { id: '10', name: 'Gustavo Lipshutz', avatar },
];

const DepartmentScreen = () => {
  const navigation = useNavigation();

  const renderMember = ({ item }) => (
    <View style={styles.memberItem}>
      <Image source={item.avatar} style={styles.avatar} />
      <Text style={styles.memberName}>{item.name}</Text>
    </View>
  );

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
        <Text style={styles.teamTitle}>Q&A Testing</Text>
        <Text style={styles.teamLeadLabel}>Team lead</Text>
        <View style={styles.teamLeadInfo}>
          <Image source={avatar} style={styles.leadAvatar} />
          <Text style={styles.teamLeadName}>Abdul Rahuman</Text>
        </View>
        <View style={styles.memberRow}>
          <Text style={styles.memberCount}>Members Count</Text>
          <Text style={styles.count}>45</Text>
        </View>
      </LinearGradient>

      {/* Members List */}
      <Text style={styles.membersHeader}>Team Members</Text>
      <FlatList
        data={teamMembers}
        keyExtractor={(item) => item.id}
        renderItem={renderMember}
        contentContainerStyle={styles.memberList}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default DepartmentScreen;
