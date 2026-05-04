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
import handleGeneratePDF from './payslip_pdf'
  
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
      const response = await authAxios.get(`/employee/payslips/?year=${selectedYear}`);
      
      
      setSalaryData(response.data || []);
    } catch (error) {
      console.log("Salary API error:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSalaryRecords();
  }, [selectedYear]);

  
  const combinedList = salaryData
  .filter(item => item.fully_verified)
  .map((item) => {
    
    let monthIndex = parseInt(item.month, 10);
    let monthName = allMonths[monthIndex - 1];

    // Fallback: if API already returns month name
    if (!monthName && typeof item.month === 'string') {
      monthName = item.month.charAt(0).toUpperCase() + item.month.slice(1);
    }

    return {
      ...item,
      month: monthName || 'Unknown',
      monthNumber: monthIndex || null,
      year: selectedYear,
    };
  });


    const filtered = combinedList.filter((item) =>
      (item.month || '').toString().toLowerCase().includes(searchText.toLowerCase())
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
  
  return (
    <View style={styles.container}>
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

              <TouchableOpacity onPress={() => handleGeneratePDF(item)}>
  <Text><MaterialCommunityIcons name="tray-arrow-down" size={22} color="#fff" /></Text>
</TouchableOpacity>


            </View>
          )}
        />
      )}
    </View>
  );
};

export default SalarySlipScreen;
