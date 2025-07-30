import RNFS from 'react-native-fs';
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  Alert,
  Linking,
  Modal,
  Pressable,
  PermissionsAndroid,
   Platform
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import authAxios from '../../utils/authAxios';
const allMonths = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

const availableYears = ['2023', '2024', '2025', '2026', '2027', '2028', '2029', '2030'];

const SalarySlipScreen = () => {
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState('');
  const [selectedYear, setSelectedYear] = useState('2025');
  const [salaryData, setSalaryData] = useState([]);
  const [yearDropdownVisible, setYearDropdownVisible] = useState(false);

   const fetchSalaryRecords = async () => {
    try {
      const response = await authAxios.get(
        `/employee/payslips/?year=${selectedYear}`
      );
      setSalaryData(response.data || []);
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Could not load salary data');
    }
  };

  useEffect(() => {
    fetchSalaryRecords();
  }, [selectedYear]);

  const combinedList = allMonths.map((monthName, index) => {
    const monthIndex = index + 1;
    const matchedRecord = salaryData.find((item) => Number(item.month) === monthIndex);
    return {
      month: monthName,
      monthNumber: monthIndex,
      year: selectedYear,
      hasData: !!matchedRecord,
    };
  });

  const filtered = combinedList.filter((item) =>
    item.month.toLowerCase().includes(searchText.toLowerCase())
  );
const requestStoragePermission = async () => {
  if (Platform.OS === 'android' && Platform.Version < 33) {
    try {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      ]);

      return (
        granted['android.permission.WRITE_EXTERNAL_STORAGE'] === PermissionsAndroid.RESULTS.GRANTED &&
        granted['android.permission.READ_EXTERNAL_STORAGE'] === PermissionsAndroid.RESULTS.GRANTED
      );
    } catch (err) {
      console.warn(err);
      return false;
    }
  } else {
    // Android 13+ or iOS — permissions are managed differently
    return true;
  }
};

const handleDownload = async (monthNumber) => {
  try {
    const token = await AsyncStorage.getItem('accessToken');
    const paddedMonth = monthNumber < 10 ? `0${monthNumber}` : `${monthNumber}`;


    const downloadUrl = `/employee/payslip/download/?month=${paddedMonth}&year=${selectedYear}`;
    const filePath = `${RNFS.DownloadDirectoryPath}/Payslip_${paddedMonth}_${selectedYear}.pdf`;

    const hasPermission = await requestStoragePermission();
    if (!hasPermission) {
      Alert.alert('Permission Denied', 'Storage permission is required to download files.');
      return;
    }

    const options = {
      fromUrl: downloadUrl,
      toFile: filePath,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const result = await RNFS.downloadFile(options).promise;

    if (result.statusCode === 200) {
      Alert.alert('Success', 'Payslip downloaded successfully.');
    } else {
      console.log(result);
      Alert.alert('Error', 'Download failed. Try again.');
    }

  } catch (err) {
    console.error(err);
    Alert.alert('Error', 'Could not download payslip');
  }
};


  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Salary Slip</Text>
      </View>

      {/* Search & Year Filter */}
      <View style={styles.searchRow}>
        <View style={styles.searchBox}>
          <Ionicons name="search" size={18} color="#ccc" />
          <TextInput
            placeholder="Search Month"
            placeholderTextColor="#ccc"
            style={styles.searchInput}
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>

        <TouchableOpacity
          style={styles.dropdownBox}
          onPress={() => setYearDropdownVisible(true)}
        >
          <Text style={styles.dropdownText}>{selectedYear}</Text>
          <Ionicons name="chevron-down" size={16} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.searchIconBox} onPress={fetchSalaryRecords}>
          <Ionicons name="search" size={22} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Year Modal */}
      <Modal visible={yearDropdownVisible} transparent animationType="fade">
        <TouchableOpacity
          style={{ flex: 1, justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}
          activeOpacity={1}
          onPressOut={() => setYearDropdownVisible(false)}
        >
          <View style={{ backgroundColor: '#fff', margin: 40, borderRadius: 10, padding: 20 }}>
            {availableYears.map((year) => (
              <Pressable
                key={year}
                style={{ paddingVertical: 10 }}
                onPress={() => {
                  setSelectedYear(year);
                  setYearDropdownVisible(false);
                }}
              >
                <Text style={{ fontSize: 16 }}>{year}</Text>
              </Pressable>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Month List */}
      <FlatList
        data={filtered}
        keyExtractor={(item) => `${item.month}-${item.year}`}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View>
              <Text style={styles.monthText}>{item.month}</Text>
              <Text style={styles.yearText}>{item.year}</Text>
            </View>
            {item.hasData ? (
              <TouchableOpacity onPress={() => handleDownload(item.monthNumber)}>
                <Ionicons name="download-outline" size={22} color="#fff" />
              </TouchableOpacity>
            ) : (
              <Ionicons name="close-circle-outline" size={22} color="#888" />
            )}
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default SalarySlipScreen;
