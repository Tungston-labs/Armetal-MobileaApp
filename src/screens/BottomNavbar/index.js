import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from './styles';

const BottomNavbar = ({ navigation, route }) => {
  return (
    <View style={styles.bottomTab}>
      <TouchableOpacity onPress={() => navigation.navigate('PunchinScreen')}>
        <View
          style={
            route.name === 'PunchinScreen'
              ? styles.tabIconActive
              : styles.tabIconNormal
          }
        >
          <Ionicons name="home" size={24} color="#fff" />
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('CalendarScreen')}>
        <View
          style={
            route.name === 'CalendarScreen'
              ? styles.tabIconActive
              : styles.tabIconNormal
          }
        >
          <Ionicons name="calendar-outline" size={24} color="#fff" />
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('LeaveAllScreen')}>
        <View
          style={
            route.name === 'LeaveAllScreen'
              ? styles.tabIconActive
              : styles.tabIconNormal
          }
        >
          <Ionicons name="document-text-outline" size={24} color="#fff" />
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('TaskUpdateScreen')}>
        <View
          style={
            route.name === 'TaskUpdateScreen'
              ? styles.tabIconActive
              : styles.tabIconNormal
          }
        >
          <Ionicons name="folder-outline" size={24} color="#fff" />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default BottomNavbar;
