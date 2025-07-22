// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   Image,
//   Alert,
// } from 'react-native';
// import CheckBox from '@react-native-community/checkbox';
// import axios from 'axios';
// import { useNavigation } from '@react-navigation/native';
// import styles from './styles';
// import { saveTokensToStorage } from '../../utils/auth'; // ✅ import utility

// const LoginScreen = () => {
//   const [rememberMe, setRememberMe] = useState(false);
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const navigation = useNavigation();

//   const handleLogin = async () => {
//     if (!username || !password) {
//       Alert.alert('Error', 'Please enter both username and password.');
//       return;
//     }

//     try {
//       const response = await axios.post('http://178.248.112.16:8000/api/token/', {
//         username,
//         password,
//       });

//       const { access, refresh } = response.data;

//       // ✅ Use utility to save tokens
//       await saveTokensToStorage(access, refresh);

//       navigation.navigate('PunchinScreen');
//     } catch (error) {
//       console.error("Login error:", error);

//       if (error.response) {
//         Alert.alert('Login Failed', 'Invalid username or password.');
//       } else if (error.request) {
//         Alert.alert('Network Error', 'No response from server. Check your network.');
//       } else {
//         Alert.alert('Error', error.message);
//       }
//     }
//   };

//   const handleForgotPassword = () => {
//     navigation.navigate('ForgotPasswordScreen');
//   };

//   const logo = require('../../assets/logo.png');

//   return (
//     <View style={styles.container}>
//       <View style={styles.logoContainer}>
//         <Image source={logo} style={styles.logo} resizeMode="contain" />
//       </View>

//       <View style={styles.formContainer}>
//         <Text style={styles.title}>Log in</Text>
//         <Text style={styles.subtitle}>Stay on top of your day – log in now.</Text>

//         <Text style={styles.label}>Username</Text>
//         <TextInput
//           style={styles.input}
//           placeholder="Username"
//           placeholderTextColor="#999"
//           value={username}
//           onChangeText={setUsername}
//         />

//         <Text style={styles.label}>Password</Text>
//         <TextInput
//           style={styles.input}
//           placeholder="Password"
//           secureTextEntry
//           placeholderTextColor="#999"
//           value={password}
//           onChangeText={setPassword}
//         />

//         <TouchableOpacity
//           style={styles.forgotPasswordContainer}
//           onPress={handleForgotPassword}
//         >
//           <Text style={styles.forgotPasswordText}>Forgot password?</Text>
//         </TouchableOpacity>

//         <View style={styles.rememberMeContainer}>
//           <CheckBox
//             value={rememberMe}
//             onValueChange={setRememberMe}
//           />
//           <Text style={styles.rememberMeText}>Remember me</Text>
//         </View>

//         <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
//           <Text style={styles.loginButtonText}>Log in</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// export default LoginScreen;


import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
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

const LoginScreen = () => {
  const [rememberMe, setRememberMe] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    if (!username || !password) {
      Toast.show({
        type: 'error',
        text1: 'Validation Error',
        text2: 'Please enter both username and password.',
      });
      return;
    }

    try {
      const response = await axios.post('http://178.248.112.16:8000/api/token/', {
        username,
        password,
      });

      const { access, refresh } = response.data;
      await AsyncStorage.setItem('accessToken', access);
      await AsyncStorage.setItem('refreshToken', refresh);
    Toast.show({
        type: 'success',
        text1: 'Login Successful',
        text2: `Welcome, ${username}!`,
      });
      navigation.navigate('PunchinScreen');
    } catch (error) {
      console.log("API Error Message:", error.message);
      console.log("API Error Message:", error);

     
      if (error.response) {
        Toast.show({
          type: 'error',
          text1: 'Login Failed',
          text2: 'Invalid username or password.',
        });
      } else if (error.request) {
        Toast.show({
          type: 'error',
          text1: 'Network Error',
          text2: 'No response from server. Check your network.',
        });
      } else {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: error.message,
        });
      }
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

              <View style={styles.rememberMeContainer}>
                <CheckBox
                  value={rememberMe}
                  onValueChange={setRememberMe}
                />
                <Text style={styles.rememberMeText}>Remember me</Text>
              </View>

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
