import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { colors } from '../utils/theme';
import Icon from 'react-native-vector-icons/FontAwesome';

const SignUpScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const glowAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: false,
        }),
        Animated.timing(glowAnim, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: false,
        }),
      ])
    ).start();
  }, []);

  const handleSignUp = () => {
    const newErrors = {};
    if (!name) newErrors.name = 'Name is required';
    if (!email) newErrors.email = 'Email is required';
    if (!password) newErrors.password = 'Password is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Handle sign-up logic here
    setErrors({});
  };

  const glowBackgroundColor = glowAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0.3)'],
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.glowBackground, { backgroundColor: glowBackgroundColor }]}>
        <Text style={styles.title}>Join Us Today and Unlock Your Financial Potential with Our Comprehensive Courses</Text>
      </Animated.View>
      <View style={styles.inputContainer}>
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
      </View>
      <View style={styles.inputContainer}>
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
      </View>
      <View style={styles.inputContainer}>
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
      </View>
      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
        <Text style={styles.loginText}>Already have an account? Log in</Text>
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
    fontFamily: 'Quicksand',
  },
  inputError: {
    borderColor: '#BE3144',
  },
  errorIcon: {
    position: 'absolute',
    right: 15,
    top: 15,
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