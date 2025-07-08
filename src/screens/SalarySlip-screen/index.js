import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';

const months = [
  'February',
  'January',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
];

const SalarySlipScreen = () => {
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState('');
  const [selectedYear, setSelectedYear] = useState('2025');

  const filteredMonths = months.filter((month) =>
    month.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Salary slip</Text>
      </View>

      {/* Search Row */}
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

        <TouchableOpacity style={styles.dropdownBox}>
          <Text style={styles.dropdownText}>Year</Text>
          <Ionicons name="chevron-down" size={16} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.searchIconBox}>
          <Ionicons name="search" size={22} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* List */}
      <FlatList
        data={filteredMonths}
        keyExtractor={(item) => item}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View>
              <Text style={styles.monthText}>{item}</Text>
              <Text style={styles.yearText}>{selectedYear}</Text>
            </View>
            <TouchableOpacity>
              <Ionicons name="download-outline" size={22} color="#fff" />
            </TouchableOpacity>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default SalarySlipScreen;
