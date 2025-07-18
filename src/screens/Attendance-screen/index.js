import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import styles from './styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation, useRoute } from '@react-navigation/native';
// import BottomNavbar from '../BottomNavbar';

const AttendanceScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const { sessions = [], totalHours = '00:00 Hrs', timeIn, timeOut, date = '---' } = route.params || {};

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
        <Image
          source={{ uri: 'https://cdn-icons-png.flaticon.com/512/149/149071.png' }}
          style={styles.profileImage}
        />
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

      {/* <BottomNavbar navigation={navigation} route={route} /> */}
    </SafeAreaView>
  );
};

export default AttendanceScreen;
