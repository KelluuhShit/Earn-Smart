import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { colors } from '../utils/theme';
import Icon from 'react-native-vector-icons/FontAwesome';
import { firestore } from '../utils/firebase';
import { doc, getDoc } from "firebase/firestore";
import { AuthContext } from '../context/AuthContext';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignInScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [errors, setErrors] = useState({});
  const { setIsAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    const fetchUserData = async () => {
      if (email) {
        try {
          const userDoc = doc(firestore, "users", email.replace('.', '_'));
          const userDocSnapshot = await getDoc(userDoc);
          if (userDocSnapshot.exists()) {
            const userData = userDocSnapshot.data();
            setUsername(userData.username);
          } else {
            setErrors((prev) => ({ ...prev, email: 'Email not found' }));
          }
        } catch (error) {
          console.error("Error fetching user data: ", error);
        }
      }
    };

    fetchUserData();
  }, [email]);

  const handleSignIn = async () => {
    const newErrors = {};
    if (!email) {
      newErrors.email = 'Email is required';
    }
    if (!password) {
      newErrors.password = 'Password is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const userDoc = doc(firestore, "users", email.replace('.', '_'));
      const userDocSnapshot = await getDoc(userDoc);

      if (userDocSnapshot.exists()) {
        const userData = userDocSnapshot.data();
        if (userData.password === password) {
          // Clear errors and display success message
          setErrors({});
          setIsAuthenticated(true);
          await AsyncStorage.setItem('username', userData.username); // Save username to local storage
          console.log("Username saved to AsyncStorage: ", userData.username); // Add logging
          Toast.show({
            type: 'success',
            text1: 'Sign in successful!',
            text2: 'Redirecting...',
            visibilityTime: 5000, // 5 seconds
          });

          // Navigate to the Home screen after a delay
          setTimeout(() => {
            navigation.navigate('Home');
          }, 5000); // 5 seconds delay
        } else {
          setErrors((prev) => ({ ...prev, password: 'Incorrect password' }));
        }
      } else {
        setErrors((prev) => ({ ...prev, email: 'Email not found' }));
      }
    } catch (error) {
      console.error("Error signing in: ", error);
      setErrors((prev) => ({ ...prev, general: 'An error occurred. Please try again.' }));
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Welcome, <Text style={styles.highlight}>{username}</Text>. You have made a great choice by joining EarnSmart. Sign in to continue.</Text>
        <View style={styles.inputContainer}>
          <Icon name="envelope" size={20} color={colors.secondary} style={styles.inputIcon} />
          <TextInput
            style={[styles.input, errors.email && styles.inputError]}
            placeholder="Email"
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              setErrors((prev) => ({ ...prev, email: '' }));
            }}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          {errors.email ? (
            <Icon name="exclamation-circle" size={20} color="#BE3144" style={styles.errorIcon} />
          ) : (
            email && <Icon name="check-circle" size={20} color="green" style={styles.errorIcon} />
          )}
          {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
        </View>
        <View style={styles.inputContainer}>
          <Icon name="lock" size={20} color={colors.secondary} style={styles.inputIcon} />
          <TextInput
            style={[styles.input, errors.password && styles.inputError]}
            placeholder="Password"
            value={password}
            onChangeText={(text) => {
              setPassword(text);
              setErrors((prev) => ({ ...prev, password: '' }));
            }}
            secureTextEntry
          />
          {errors.password ? (
            <Icon name="exclamation-circle" size={20} color="#BE3144" style={styles.errorIcon} />
          ) : (
            password && <Icon name="check-circle" size={20} color="green" style={styles.errorIcon} />
          )}
          {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
        </View>
        <TouchableOpacity style={styles.button} onPress={handleSignIn}>
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>
        {errors.general && <Text style={styles.errorText}>{errors.general}</Text>}
        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.signupText}>Don't have an account? Sign Up</Text>
        </TouchableOpacity>
      </View>
      <Toast />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 20,
    fontFamily: 'Quicksand-Bold',
    textAlign: 'start',
    width: '100%',
  },
  highlight: {
    backgroundColor: colors.secondary, // Highlight color
    color: colors.background, // Text color
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
    position: 'relative',
  },
  input: {
    width: '100%',
    padding: 15,
    borderWidth: 1,
    borderColor: colors.secondary,
    borderRadius: 2,
    paddingLeft: 40, // Add padding to make space for the icon
    fontFamily: 'Quicksand',
  },
  inputIcon: {
    position: 'absolute',
    left: 15,
    top: 15,
  },
  errorIcon: {
    position: 'absolute',
    right: 15,
    top: 15,
  },
  inputError: {
    borderColor: '#BE3144',
  },
  errorText: {
    color: '#BE3144',
    fontFamily: 'Quicksand',
    fontSize: 10,
    marginTop: 5,
  },
  button: {
    backgroundColor: colors.secondary,
    padding: 10,
    borderRadius: 2,
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: colors.background,
    fontSize: 15,
    fontFamily: 'Quicksand-Bold',
  },
  signupText: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily: 'Quicksand',
    textAlign: 'center',
  },
});

export default SignInScreen;