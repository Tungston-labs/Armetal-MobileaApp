import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from './styles';

const ProfileScreen = () => {
  const navigation = useNavigation();

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
        <Text style={styles.headerTitle}>Profile</Text>
      </View>

      {/* Content */}
      <View style={styles.content}>
        {/* Profile Image */}
        <View style={styles.profileSection}>
          <Image
            source={{ uri: 'https://i.pravatar.cc/150?img=31' }}
            style={styles.profileImage}
          />
        </View>

        {/* Options */}
        <TouchableOpacity
          style={styles.optionCard}
          onPress={() => navigation.navigate('SalarySlipScreen')}
        >
          <Ionicons name="receipt-outline" size={22} color="#ccc" />
          <Text style={styles.optionText}>Salary slip</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.optionCard}
          onPress={() => navigation.navigate('DocumentsScreen')}
        >
          <Ionicons name="document-attach-outline" size={22} color="#ccc" />
          <Text style={styles.optionText}>Documents</Text>
        </TouchableOpacity>



        <TouchableOpacity
          style={styles.optionCard}
          onPress={() => navigation.navigate('CreateNewPasswordScreen')}
        >
          <Ionicons name="key-outline" size={22} color="#ccc" />
          <Text style={styles.optionText}>Change Password</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.optionCard}
          onPress={() => navigation.navigate('LoginScreen')}
        >
          <Ionicons name="log-out-outline" size={22} color="#ccc" />
          <Text style={styles.optionText}>Log out</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;
