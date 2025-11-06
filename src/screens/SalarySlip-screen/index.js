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
  Modal,
  Pressable,
  ActivityIndicator,
  Platform,
  PermissionsAndroid
} from 'react-native';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import authAxios from '../../utils/authAxios';
import SwipeLoader from "../../components/SwipeLoader";
import Share from 'react-native-share';
  
import FileViewer from 'react-native-file-viewer';

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
  const [loading, setLoading] = useState(false);  
  const [downloading, setDownloading] = useState({}); 

  const fetchSalaryRecords = async () => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem('accessToken');
      console.log("Access token:", token);
      console.log("Axios baseURL:", authAxios.defaults.baseURL);
      const response = await authAxios.get(`/employee/payslips/?year=${selectedYear}`);
      setSalaryData(response.data || []);
    } catch (error) {
      console.log("Salary API error:", error.response?.data || error.message);
      console.log("❌ Status:", error.response?.status);
  console.log("❌ Response:", error.response?.data);
  console.log("❌ Headers:", error.response?.headers);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSalaryRecords();
  }, [selectedYear]);

  // Only show fully verified payslips
  const combinedList = salaryData
    .filter(item => item.fully_verified)
    .map((item) => {
      const monthIndex = Number(item.month);
      return {
        month: allMonths[monthIndex - 1],
        monthNumber: monthIndex,
        year: selectedYear,
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
    }
    return true;
  };


  
  const handleDownload = async (monthNumber) => {
    try {
      setDownloading((prev) => ({ ...prev, [monthNumber]: true }));
  
      const token = await AsyncStorage.getItem('accessToken');
      const paddedMonth = monthNumber < 10 ? `0${monthNumber}` : `${monthNumber}`;
      const url = `${authAxios.defaults.baseURL}/employee/payslip/download/?month=${paddedMonth}&year=${selectedYear}`;
  
      const fileName = `Payslip_${paddedMonth}_${selectedYear}.pdf`;
      const filePath = `${RNFS.DocumentDirectoryPath}/${fileName}`;
  
      // 🔽 Download the PDF file
      const result = await RNFS.downloadFile({
        fromUrl: url,
        toFile: filePath,
        headers: { Authorization: `Bearer ${token}` },
      }).promise;
  
      if (result.statusCode === 200) {
        console.log('✅ File saved:', filePath);
  
        const exists = await RNFS.exists(filePath);
        if (!exists) throw new Error('File not found after download');
  
        // 🔓 Open the PDF file with default viewer
        await FileViewer.open(filePath, {
          showOpenWithDialog: true, // gives user "Open with..." dialog on Android
          showAppsSuggestions: true,
        });
  
      } else {
        throw new Error(`Download failed with status ${result.statusCode}`);
      }
    } catch (err) {
      console.error('❌ Download error:', err);
      Alert.alert('Error', 'Could not download or open payslip');
    } finally {
      setDownloading((prev) => ({ ...prev, [monthNumber]: false }));
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
          <Ionicons name="search" size={25} color="#ccc" />
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
          <MaterialIcons name="arrow-drop-down" size={24} color="#fff" />
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

      {/* Loader / Empty / List */}
      {loading ? (
        <SwipeLoader text="Loading salary data..." />
      ) : filtered.length === 0 ? (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <Text style={{ color: "#ccc", fontSize: 16, fontFamily: 'Montserrat_400Regular' }}>
            No verified payslips available for {selectedYear}.
          </Text>
        </View>
      ) : (
        <FlatList
          data={filtered}
          keyExtractor={(item) => `${item.month}-${item.year}`}
          contentContainerStyle={styles.listContainer}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Ionicons name="reader" size={25} color="#ccc" style={{ marginRight: 5 }} />
                <View>
                  <Text style={styles.monthText}>{item.month}</Text>
                  <Text style={styles.yearText}>{item.year}</Text>
                </View>
              </View>

              <TouchableOpacity onPress={() => handleDownload(item.monthNumber)}>
                {downloading[item.monthNumber] ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  <MaterialCommunityIcons name="tray-arrow-down" size={22} color="#fff" />
                )}
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
};

export default SalarySlipScreen;
