import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styles from './styles';

export default function LeaveHeader({ navigation, selectedTab, avatarUri = 'https://i.pravatar.cc/150' }) {
  const tabs = [
    { label: 'All', screen: 'LeaveAllScreen' },
    { label: 'Approved', screen: 'LeaveApproveScreen' },
    { label: 'Rejected', screen: 'LeaveRejectedScreen' },
    { label: 'Pending', screen: 'LeavePendingScreen' },
  ];

  return (
    <View> 
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Leave Request</Text>
          <View style={styles.counters}>
            <Text style={styles.counterText}>Pending leave 10</Text>
            <Text style={styles.counterText}>Leave taken 10</Text>
          </View>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('ProfileScreen')}>
        <Image source={{ uri: avatarUri }} style={styles.avatar} />
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
