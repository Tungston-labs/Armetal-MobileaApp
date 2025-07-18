import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import authAxios from '../utils/auth';

const DepartmentScreen = () => {
  const [departments, setDepartments] = useState([]);
  const [newDepartment, setNewDepartment] = useState('');

  const fetchDepartments = async () => {
    try {
      const res = await authAxios.get('/departments/');
      setDepartments(res.data);
    } catch (error) {
      console.error('Error fetching departments:', error);
    }
  };

  const addDepartment = async () => {
    if (!newDepartment.trim()) {
      Alert.alert('Validation', 'Department name cannot be empty');
      return;
    }

    try {
      await authAxios.post('/departments/', { name: newDepartment });
      setNewDepartment('');
      fetchDepartments();
    } catch (error) {
      console.error('Error adding department:', error);
    }
  };

  const deleteDepartment = async (id) => {
    Alert.alert('Confirm Delete', 'Are you sure you want to delete?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Delete',
        onPress: async () => {
          try {
            await authAxios.delete(`/departments/${id}/`);
            fetchDepartments();
          } catch (error) {
            console.error('Error deleting department:', error);
          }
        },
        style: 'destructive',
      },
    ]);
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Department Management</Text>

      <View style={styles.inputRow}>
        <TextInput
          value={newDepartment}
          onChangeText={setNewDepartment}
          placeholder="Enter department name"
          style={styles.input}
        />
        <TouchableOpacity style={styles.addButton} onPress={addDepartment}>
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={departments}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.departmentRow}>
            <Text style={styles.departmentText}>{item.name}</Text>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => deleteDepartment(item.id)}
            >
              <Text style={styles.deleteButtonText}>X</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No departments found.</Text>
        }
      />
    </View>
  );
};

export default DepartmentScreen;
