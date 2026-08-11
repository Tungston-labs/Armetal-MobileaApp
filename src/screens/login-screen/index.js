
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import Toast from 'react-native-toast-message'; 
import { SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { setTokens } from '@/src/redux/features/authSlice';
import { useDispatch } from 'react-redux';

const LoginScreen = () => {
  const [rememberMe, setRememberMe] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const [showPassword, setShowPassword] = useState(false);
      const BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL;

const dispatch=useDispatch();

const handleLogin = async () => {
  if (!username || !password) {

    Toast.show({
      type: "error",
      text1: "Validation Error",
      text2: "Please enter both username and password.",
    });
    return;
  }

  try {
    const response = await axios.post(
      `${BASE_URL}/api/token/`,
      { username, password }
    );

    const { access, refresh, user } = response.data;

    if (!user) throw new Error("User data missing in login response");

    await AsyncStorage.setItem("accessToken", access);
    await AsyncStorage.setItem("refreshToken", refresh);
    await AsyncStorage.setItem("country", user.company.country);

    dispatch(setTokens({ access, refresh }));


  } catch (error) {
    console.log("API Error:", error.message);


    Toast.show({
      type: "error",
      text1: "Login Failed",
      text2: error.response ? "Invalid username or password." : "Network Error",
    });
  }
};





  const handleForgotPassword = () => {
    navigation.navigate('ForgotPasswordScreen');
  };

  const logo = require('../../assets/logo.png');

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#151D34' }}>
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.container}>
            <View style={styles.logoContainer}>
              <Image source={logo} style={styles.logo} resizeMode="contain" />
            </View>

            <View style={styles.formContainer}>
              <Text style={styles.title}>Log in</Text>
              <Text style={styles.subtitle}>Stay on top of your day – log in now.</Text>

              <Text style={styles.label}>Username</Text>
              <TextInput
                style={styles.input}
                placeholder="Username"
                placeholderTextColor="#999"
                value={username}
                onChangeText={setUsername}
              />

              <Text style={styles.label}>Password</Text>
             <View style={styles.inputContainer}>
  <TextInput
    style={styles.input}
    placeholder="Password"
    secureTextEntry={!showPassword}
    placeholderTextColor="#999"
    value={password}
    onChangeText={setPassword}
  />
  <TouchableOpacity
    onPress={() => setShowPassword(!showPassword)}
    style={styles.eyeIcon}
  >
    <Ionicons 
      name={showPassword ? "eye-off" : "eye"}
      size={20}
      color="#999"
    />
  </TouchableOpacity>
</View>
              <TouchableOpacity
                style={styles.forgotPasswordContainer}
                onPress={handleForgotPassword}
              >
                <Text style={styles.forgotPasswordText}>Forgot password ? </Text>
              </TouchableOpacity>

              {/* <View style={styles.rememberMeContainer}>
                <CheckBox
                  value={rememberMe}
                  onValueChange={setRememberMe}
                />
                <Text style={styles.rememberMeText}>Remember me</Text>
              </View> */}

              <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                <Text style={styles.loginButtonText}>Log in</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;
