
import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import styles from './styles';

import HomeIcon from '../../../assets/images/home.svg';
import CalendarIcon from '../../../assets/images/calendar.svg';
import FileIcon from '../../../assets/images/filr.svg';  
import FolderIcon from '../../../assets/images/folder.svg';
import BillIcon from '../../../assets/images/bill.svg';

const ICON_SIZE = 35; 

const BottomNavbar = ({ navigation, route }) => {
  return (
    <View style={styles.bottomTab}>
      {/* Punchin */}
      <TouchableOpacity onPress={() => navigation.navigate('PunchinScreen')}>
        <View
          style={
            route.name === 'PunchinScreen'
              ? styles.tabIconActive
              : styles.tabIconNormal
          }
        >
          <HomeIcon width={ICON_SIZE} height={ICON_SIZE}  />
        </View>
      </TouchableOpacity>

      {/* Calendar */}
      <TouchableOpacity onPress={() => navigation.navigate('CalendarScreen')}>
        <View
          style={
            route.name === 'CalendarScreen'
              ? styles.tabIconActive
              : styles.tabIconNormal
          }
        >
          <CalendarIcon width={ICON_SIZE} height={ICON_SIZE}  />
        </View>
      </TouchableOpacity>

      {/* Leave */}
      <TouchableOpacity onPress={() => navigation.navigate('LeaveAllScreen')}>
        <View
          style={
            route.name === 'LeaveAllScreen'
              ? styles.tabIconActive
              : styles.tabIconNormal
          }
        >
          <FileIcon width={ICON_SIZE} height={ICON_SIZE}  />
        </View>
      </TouchableOpacity>

      {/* Task Update */}
      <TouchableOpacity onPress={() => navigation.navigate('TaskUpdateScreen')}>
        <View
          style={
            route.name === 'TaskUpdateScreen'
              ? styles.tabIconActive
              : styles.tabIconNormal
          }
        >
          <FolderIcon width={ICON_SIZE} height={ICON_SIZE} fill="#fff" />
        </View>
      </TouchableOpacity>

      {/* Reimbursement */}
      <TouchableOpacity
        onPress={() => navigation.navigate('ReimbursementlistScreen')}
      >
        <View
          style={
            route.name === 'ReimbursementlistScreen'
              ? styles.tabIconActive
              : styles.tabIconNormal
          }
        >
          <BillIcon width={ICON_SIZE} height={ICON_SIZE} fill="#fff" />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default BottomNavbar;
