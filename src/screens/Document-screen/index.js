import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';

const DocumentsScreen = () => {
  const navigation = useNavigation();
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const API_BASE_URL = 'http://178.248.112.16:8000';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await AsyncStorage.getItem('accessToken');
        if (!token) {
          Toast.show({
            type: 'error',
            text1: 'Authentication Error',
            text2: 'No access token found',
          });
          return;
        }

        const response = await axios.get(`${API_BASE_URL}/api/profile/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setEmployee(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        Toast.show({
          type: 'error',
          text1: 'Fetch Error',
          text2: 'Could not load document data',
        });
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handlePreview = (imageUrl) => {
    if (!imageUrl) {
      Toast.show({
        type: 'info',
        text1: 'No Image',
        text2: 'No image available to preview.',
      });
      return;
    }

    navigation.navigate('ImagePreview', { imageUrl });
  };

  const renderDocumentRow = (label, imageUrl) => (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity onPress={() => handlePreview(imageUrl)}>
        <Text style={styles.previewLink}>Preview</Text>
      </TouchableOpacity>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  const documents = employee?.documents || {};

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('ProfileScreen')}>
          <Image
            source={
              employee?.profile_pic
                ? { uri: `${API_BASE_URL}${employee.profile_pic}` }
                : require('../../assets/avatar.png') // use a local default image
            }
            style={styles.avatar}
          />
        </TouchableOpacity>
        <Text style={styles.name}>{employee?.name}</Text>
        <Text style={styles.id}>Employee ID: {employee?.employee_id}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Documents</Text>
        {renderDocumentRow('Passport', documents.passport)}
        {renderDocumentRow('Work Permit', documents.work_permit)}
        {renderDocumentRow('Contract', documents.contract)}
        {renderDocumentRow('Insurance', documents.insurance)}
        {renderDocumentRow('Certificate', documents.certificate)}
      </View>

      <Toast />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
    backgroundColor: '#ccc',
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  id: {
    fontSize: 16,
    color: '#666',
  },
  section: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  label: {
    fontSize: 16,
  },
  previewLink: {
    fontSize: 16,
    color: '#007bff',
  },
});

export default DocumentsScreen;
