import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import { colors } from '../utils/theme';
import Icon from 'react-native-vector-icons/FontAwesome';
import { firestore } from '../utils/firebase';
import { doc, setDoc, getDoc } from "firebase/firestore";

const SignUpScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSignUp = async () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name) newErrors.name = 'Name is required';
    if (!email) newErrors.email = 'Email is required';
    else if (!emailRegex.test(email)) newErrors.email = 'Email is not valid';
    if (!password) newErrors.password = 'Password is required';
    else if (password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (!confirmPassword) newErrors.confirmPassword = 'Confirm Password is required';
    if (password !== confirmPassword) newErrors.confirmPassword = 'Passwords do not match';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    setErrorMessage('');

    // Save user data to Firestore
    try {
      const userDoc = doc(firestore, "users", email.replace('.', '_'));
      const userDocSnapshot = await getDoc(userDoc);

      if (userDocSnapshot.exists()) {
        setErrorMessage("Email already exists. Please use a different email.");
      } else {
        await setDoc(userDoc, {
          username: name,
          email: email,
          password: password,
        });

        // Clear errors and navigate to the next screen
        setErrors({});
        navigation.navigate('SignIn');
      }
    } catch (error) {
      console.error("Error adding document: ", error);
      setErrorMessage("Error adding document: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Join Us Today and Unlock Your Financial Potential with Our Comprehensive Courses</Text>
        <View style={styles.inputContainer}>
          <Icon name="user" size={20} color={colors.secondary} style={styles.inputIcon} />
          <TextInput
            style={[styles.input, errors.name && styles.inputError]}
            placeholder="Name"
            value={name}
            onChangeText={(text) => {
              setName(text);
              setErrors((prev) => ({ ...prev, name: '' }));
            }}
          />
          {errors.name ? (
            <Icon name="exclamation-circle" size={20} color="#BE3144" style={styles.errorIcon} />
          ) : (
            name && <Icon name="check-circle" size={20} color="green" style={styles.errorIcon} />
          )}
          {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
        </View>
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
        <View style={styles.inputContainer}>
          <Icon name="lock" size={20} color={colors.secondary} style={styles.inputIcon} />
          <TextInput
            style={[styles.input, errors.confirmPassword && styles.inputError]}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChangeText={(text) => {
              setConfirmPassword(text);
              setErrors((prev) => ({ ...prev, confirmPassword: '' }));
            }}
            secureTextEntry
          />
          {errors.confirmPassword ? (
            <Icon name="exclamation-circle" size={20} color="#BE3144" style={styles.errorIcon} />
          ) : (
            confirmPassword && confirmPassword === password && <Icon name="check-circle" size={20} color="green" style={styles.errorIcon} />
          )}
          {errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword}</Text>}
        </View>
        <TouchableOpacity style={styles.button} onPress={handleSignUp} disabled={loading}>
          {loading ? (
            <ActivityIndicator size="small" color={colors.background} />
          ) : (
            <Text style={styles.buttonText}>Sign Up</Text>
          )}
        </TouchableOpacity>
        {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
        <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
          <Text style={styles.loginText}>Already have an account? Log in</Text>
        </TouchableOpacity>
      </View>
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
  },
  button: {
    backgroundColor: colors.secondary,
    padding: 10,
    borderRadius: 2,
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
    elevation: 5, // Add elevation for Android
    shadowColor: '#000', // Add shadow properties for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  buttonText: {
    color: colors.background,
    fontSize: 15,
    fontFamily: 'Quicksand-Bold',
  },
  loginText: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily: 'Quicksand',
    textAlign: 'center',
  },
});

export default SignUpScreen;