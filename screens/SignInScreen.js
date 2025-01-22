import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { colors } from '../utils/theme';
import Icon from 'react-native-vector-icons/FontAwesome';
import { firestore } from '../utils/firebase';
import { doc, getDoc } from "firebase/firestore";

const SignInScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchUserData = async () => {
      if (email) {
        const userDoc = doc(firestore, "users", email.replace('.', '_'));
        const userDocSnapshot = await getDoc(userDoc);
        if (userDocSnapshot.exists()) {
          const userData = userDocSnapshot.data();
          setUsername(userData.username);
        } else {
          setErrors((prev) => ({ ...prev, email: 'Email not found' }));
        }
      }
    };

    fetchUserData();
  }, [email]);

  const handleSignIn = () => {
    // Handle sign-in logic here
    if (!email) {
      setErrors((prev) => ({ ...prev, email: 'Email is required' }));
    }
    if (!password) {
      setErrors((prev) => ({ ...prev, password: 'Password is required' }));
    }
    // Add further validation and authentication logic here
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome, {username}. You have made a great choice by joining EarnSmart. Sign in to continue.</Text>
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
        {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
      </View>
      <TouchableOpacity style={styles.button} onPress={handleSignIn}>
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
        <Text style={styles.signupText}>Don't have an account? Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
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
    width:'100%',
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