import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './styles';
import authAxios from '../../utils/authAxios';

const API_BASE_URL = 'http://178.248.112.16:8000';
const defaultAvatar = "https://cdn-icons-png.flaticon.com/512/149/149071.png";

export default function LeaveHeader() {
  const navigation = useNavigation();
  const route = useRoute();

  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  const tabs = [
    { label: 'All', screen: 'LeaveAllScreen' },
    { label: 'Approved', screen: 'LeaveApproveScreen' },
    { label: 'Rejected', screen: 'LeaveRejectedScreen' },
    { label: 'Pending', screen: 'LeavePendingScreen' },
  ];

  const tabMap = {
    LeaveAllScreen: 'All',
    LeaveApproveScreen: 'Approved',
    LeaveRejectedScreen: 'Rejected',
    LeavePendingScreen: 'Pending',
  };

  const activeTab = tabMap[route.name] || 'All';

  useEffect(() => {
    const load = async () => {
      try {
        const sumRes = await authAxios.get("/leave/summary/");
        setSummary(sumRes.data);
      } catch (err) {}
      finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <>
     
      <SafeAreaView 
        edges={['top']}
        style={{
          backgroundColor: '#262D40',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50
        }}
      >
        <View style={[styles.header, { paddingTop: 0 }]}>
          {loading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <View>
              <Text style={styles.headerTitle}>Leave Request</Text>

              <View style={styles.counters}>
                <Text style={styles.counterText}>
                  Pending leave {summary?.total_leave || 0}
                </Text>
                <Text style={styles.counterText}>
                  Leave taken {summary?.approved_count || 0}
                </Text>
              </View>
            </View>
          )}
        </View>
      </SafeAreaView>

      {/* Tabs BELOW the header */}
      <View style={{ marginTop: 90 }}>
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
    </>
  );
}
