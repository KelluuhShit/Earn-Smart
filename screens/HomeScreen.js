import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, RefreshControl, TouchableOpacity, Image, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors } from '../utils/theme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';

const HomeScreen = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [username, setUsername] = useState('');
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedUsername = await AsyncStorage.getItem('username');
        const storedProfileImage = await AsyncStorage.getItem('profileImage');
        if (storedUsername) {
          setUsername(storedUsername);
        }
        if (storedProfileImage) {
          setProfileImage(storedProfileImage);
        }
      } catch (error) {
        console.error("Error fetching user data from local storage: ", error);
      }
    };

    fetchUserData();
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // Simulate a network request
    setTimeout(() => {
      setRefreshing(false);
      // Update any dynamic data here
    }, 2000);
  }, []);

  const pickImage = async () => {
    console.log("pickImage function called");
    // Ask for permission to access the media library
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert("Permission to access camera roll is required!");
      return;
    }

    // Open the image picker
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    console.log("Image picker result: ", result);

    if (!result.canceled) {
      const selectedImageUri = result.assets ? result.assets[0].uri : result.uri;
      console.log("Selected image URI: ", selectedImageUri);
      setProfileImage(selectedImageUri);
      await AsyncStorage.setItem('profileImage', selectedImageUri); // Save the selected image to local storage
    } else {
      console.log("Image picker was canceled");
    }
  };

  return (
    <ScrollView
      contentContainerStyle={styles.scrollContainer}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={styles.container}>
        <View style={styles.card}>
          <View style={styles.cardContent}>
            <TouchableOpacity onPress={pickImage}>
              {profileImage ? (
                <Image source={{ uri: profileImage }} style={styles.profileImage} />
              ) : (
                <Icon name="account-circle" size={40} color={colors.primary} style={styles.profileIcon} />
              )}
            </TouchableOpacity>
            <View style={styles.centerContent}>
              <Text style={styles.welcomeText}>Welcome, {username}</Text>
              <Text style={styles.introText}>Learn and Earn Today</Text>
            </View>
          </View>
          <View style={styles.iconContainer}>
            <TouchableOpacity>
              <Icon name="shopping-cart" size={28} color={colors.primary} style={styles.icon} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Icon name="message" size={28} color={colors.primary} style={styles.icon} />
            </TouchableOpacity>
          </View>
        </View>
        {/* Add more content here */}
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
    width: '100%',
  },
  card: {
    backgroundColor: colors.cardBackground,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 10,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    flexDirection: 'row',
    gap: 20,
    marginRight: 10,
  },
  profileIcon: {
    marginLeft: 10,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginLeft: 10,
  },
  centerContent: {
    marginLeft: 10,
  },
  welcomeText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.primary,
    fontFamily: 'Quicksand-Bold',
  },
  introText: {
    fontSize: 13,
    color: colors.secondary,
    fontFamily: 'Quicksand-Bold',
  },
});

export default HomeScreen;