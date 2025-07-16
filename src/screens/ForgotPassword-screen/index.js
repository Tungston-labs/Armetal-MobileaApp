// index.js
import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from './styles';

const ForgotPasswordScreen = ({ navigation }) => {
  
  const handleResetPassword = () => {
    navigation.navigate('VerificationScreen');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0B1437" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>Forgot password ?</Text>
        <Text style={styles.subtitle}>
          No worries we will send you{'\n'}reset instructions
        </Text>

        <Text style={styles.label}>Your Email Address</Text>
        <TextInput
          style={styles.input}
          placeholder="Your Email Address"
          placeholderTextColor="#aaa"
          keyboardType="email-address"
        />

        <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
          <Text style={styles.buttonText}>Reset password</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ForgotPasswordScreen;
