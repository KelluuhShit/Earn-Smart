import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { colors } from '../utils/theme';

const HomeScreen = () => {
  const userName = "John Doe"; // Replace with dynamic user data
  const userLocation = "New York, USA"; // Replace with dynamic user data
  const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Icon name="user-circle" size={30} color={colors.primary} style={styles.profileIcon} />
        <View style={styles.centerContent}>
          <Text style={styles.timeText}>{currentTime}</Text>
          <Text style={styles.locationText}>{userLocation}</Text>
        </View>
        <Icon name="bell" size={30} color={colors.primary} style={styles.notificationIcon} />
      </View>
      {/* Add more content here */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 20,
  },
  card: {
    backgroundColor: colors.cardBackground,
    borderRadius: 10,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 5, // Add elevation for Android
    shadowColor: '#000', // Add shadow properties for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  profileIcon: {
    marginLeft: 10,
  },
  centerContent: {
    alignItems: 'center',
  },
  timeText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.primary,
  },
  locationText: {
    fontSize: 14,
    color: colors.secondary,
  },
  notificationIcon: {
    marginRight: 10,
  },
});

export default HomeScreen;