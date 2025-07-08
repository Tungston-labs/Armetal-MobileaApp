// import React, { useState } from 'react';
// import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
// import CheckBox from '@react-native-community/checkbox';
// import { useNavigation } from '@react-navigation/native';
// import styles from './styles';


// const LoginScreen = () => {
//   const [rememberMe, setRememberMe] = useState(false);
//   const navigation = useNavigation();

//   const handleLogin = () => {
//     // perform login logic...
//     navigation.navigate('PunchinScreen');
//   };

// const logo = require('../../assets/logo.png'); // adjust path if needed

//   return (
//     <View style={styles.container}>
//       <View style={styles.logoContainer}>
//         <Image source={logo} style={styles.logo} resizeMode="contain" />
//       </View>

//       <View style={styles.formContainer}>
//         <Text style={styles.title}>Log in</Text>
//         <Text style={styles.subtitle}>Stay on top of your day – log in now.</Text>

//         <Text style={styles.label}>Username</Text>
//         <TextInput style={styles.input} placeholder="Username" placeholderTextColor="#999" />

//         <Text style={styles.label}>Password</Text>
//         <TextInput
//           style={styles.input}
//           placeholder="Password"
//           secureTextEntry
//           placeholderTextColor="#999"
//         />

//         <View style={styles.rememberMeContainer}>
//           <CheckBox
//             value={rememberMe}
//             onValueChange={setRememberMe}
//             tintColors={{ true: '#000', false: '#999' }}
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
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';

const LoginScreen = () => {
  const [rememberMe, setRememberMe] = useState(false);
  const navigation = useNavigation();

  const handleLogin = () => {
    // perform login logic...
    navigation.navigate('PunchinScreen');
  };

  const handleForgotPassword = () => {
    navigation.navigate('ForgotPasswordScreen');
  };

  const logo = require('../../assets/logo.png'); // adjust path if needed

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={logo} style={styles.logo} resizeMode="contain" />
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.title}>Log in</Text>
        <Text style={styles.subtitle}>Stay on top of your day – log in now.</Text>

        <Text style={styles.label}>Username</Text>
        <TextInput style={styles.input} placeholder="Username" placeholderTextColor="#999" />

        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          placeholderTextColor="#999"
        />

        <TouchableOpacity
          style={styles.forgotPasswordContainer}
          onPress={handleForgotPassword}
        >
          <Text style={styles.forgotPasswordText}>Forgot password ?</Text>
        </TouchableOpacity>

        <View style={styles.rememberMeContainer}>
          <CheckBox
            value={rememberMe}
            onValueChange={setRememberMe}
            tintColors={{ true: '#000', false: '#999' }}
          />
          <Text style={styles.rememberMeText}>Remember me</Text>
        </View>

        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Log in</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;
