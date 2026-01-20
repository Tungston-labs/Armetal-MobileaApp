import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './styles';

import HomeIcon from '../../../assets/images/home.svg';
import CalendarIcon from '../../../assets/images/calendar.svg';
import FileIcon from '../../../assets/images/filr.svg';  
import FolderIcon from '../../../assets/images/folder.svg';
import BillIcon from '../../../assets/images/bill.svg';

const ICON_SIZE = 35;

const BottomNavbar = ({ navigation, route }) => {
  return (
    <SafeAreaView edges={['bottom']} style={styles.safeArea}>
      <View style={styles.bottomTab}>
        <TouchableOpacity onPress={() => navigation.navigate('PunchinScreen')}>
          <View
            style={
              route.name === 'PunchinScreen'
                ? styles.tabIconActive
                : styles.tabIconNormal
            }>
            <HomeIcon width={ICON_SIZE} height={ICON_SIZE} />
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('CalendarScreen')}>
          <View
            style={
              route.name === 'CalendarScreen'
                ? styles.tabIconActive
                : styles.tabIconNormal
            }>
            <CalendarIcon width={ICON_SIZE} height={ICON_SIZE} />
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('LeaveAllScreen')}>
          <View
            style={
              route.name === 'LeaveAllScreen'
                ? styles.tabIconActive
                : styles.tabIconNormal
            }>
            <FileIcon width={ICON_SIZE} height={ICON_SIZE} />
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('TaskUpdateScreen')}>
          <View
            style={
              route.name === 'TaskUpdateScreen'
                ? styles.tabIconActive
                : styles.tabIconNormal
            }>
            <FolderIcon width={ICON_SIZE} height={ICON_SIZE} />
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('ReimbursementlistScreen')}>
          <View
            style={
              route.name === 'ReimbursementlistScreen'
                ? styles.tabIconActive
                : styles.tabIconNormal
            }>
            <BillIcon width={ICON_SIZE} height={ICON_SIZE} />
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default BottomNavbar;
