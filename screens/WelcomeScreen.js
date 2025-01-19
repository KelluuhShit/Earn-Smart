// screens/WelcomeScreen.js
import React from 'react';
import { View, Text, Button, TouchableOpacity } from 'react-native';
import styles from '../styles/WelcomeScreenStyles';

const WelcomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to EarnSmart!</Text>
      <Text style={styles.description}>
        Your journey to financial literacy starts here.
      </Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('SignUp')}
      >
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('SignIn')}
      >
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>
    </View>
  );
};

export default WelcomeScreen;