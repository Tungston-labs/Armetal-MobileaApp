// index.js
import React from 'react';
import { View, Text, SafeAreaView, FlatList, Image, TouchableOpacity, ScrollView } from 'react-native';
import styles from './styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation, useRoute } from '@react-navigation/native';
import BottomNavbar from '../BottomNavbar';

const attendanceData = [
  { id: '1', punchIn: '12:25 AM', punchOut: '12:45 PM' },
  { id: '2', punchIn: '12:25 PM', punchOut: '12:45 PM' },
  { id: '3', punchIn: '12:25 AM', punchOut: '12:45 PM' },
  { id: '4', punchIn: '12:25 PM', punchOut: '12:45 PM' },
  { id: '5', punchIn: '12:25 AM', punchOut: '-- --' },
];

const AttendanceScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const renderItem = ({ item }) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{item.punchIn}</Text>
      <Text style={styles.cell}>{item.punchOut}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerWrapper}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Attendance details</Text>
          <TouchableOpacity onPress={() => navigation.navigate('ProfileScreen')}>
          <Image
            source={{ uri: 'https://cdn-icons-png.flaticon.com/512/149/149071.png' }}
            style={styles.profileImage}
          />
          </TouchableOpacity>
        </View>

        

        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.card}>
            <View style={styles.tableHeader}>
              <Text style={styles.headerCell}>Punch in</Text>
              <Text style={styles.headerCell}>Punch Out</Text>
            </View>
            <FlatList
              data={attendanceData}
              renderItem={renderItem}
              keyExtractor={item => item.id}
              scrollEnabled={false}
            />
          </View>
        </ScrollView>
      </View>

      {/* Bottom Nav stays at the bottom */}
      <BottomNavbar navigation={navigation} route={route} />
    </SafeAreaView>
  );
};

export default AttendanceScreen;
