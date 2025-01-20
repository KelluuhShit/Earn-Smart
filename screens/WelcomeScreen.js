import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, ImageBackground, ScrollView, Animated } from 'react-native';
import styles from '../styles/WelcomeScreenStyles';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as Progress from 'react-native-progress';

const contentSections = [
  {
    starttxt: 'smart start',
    title: 'EarnSmart! Start today.',
    description: 'Empower yourself with the skills you need to thrive. Learn, grow, and take control of your financial future.',
    image: require('../assets/images/WelcomeImages/FirstImage.png'),
  },
  {
    starttxt: 'smart progress',
    title: 'Find Your Path!',
    description: 'Monitor your learning journey and see how far you have come. Stay motivated and keep pushing forward.',
    image: require('../assets/images/WelcomeImages/SecondImage.png'),
  },
  {
    starttxt: 'smart success',
    title: 'Achieve Your Goals!',
    description: 'Set your financial goals and achieve them with our comprehensive training programs. Your success is our mission.',
    image: require('../assets/images/WelcomeImages/ThirdImage.png'),
  },
];

const WelcomeScreen = ({ navigation }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState([0, 0, 0]);
  const arrowAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % contentSections.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        const newProgress = [...prevProgress];
        newProgress[currentIndex] = newProgress[currentIndex] + 0.01;
        return newProgress;
      });
    }, 30);

    return () => clearInterval(interval);
  }, [currentIndex]);

  useEffect(() => {
    setProgress([0, 0, 0]);
  }, [currentIndex]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      arrowAnim.setValue(0); // Reset the arrow animation value when the screen is focused
    });

    return unsubscribe;
  }, [navigation]);

  const handlePress = () => {
    Animated.timing(arrowAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      navigation.navigate('SignUp');
    });
  };

  const arrowTranslateX = arrowAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 90], // Adjust the output range as needed
  });

  const currentContent = contentSections[currentIndex];

  return (
    <View style={styles.mainContainer}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.progressBarContainer}>
          {contentSections.map((section, index) => (
            <Progress.Bar
              key={index}
              progress={progress[index]}
              width={100}
              color={styles.progressBarColor}
              style={styles.progressBar}
              animated={true}
            />
          ))}
        </View>
        
        <Text style={styles.starttxt}>{currentContent.starttxt}</Text>
        <Text style={styles.title}>{currentContent.title}</Text>
        <Text style={styles.description}>{currentContent.description}</Text>
        <ImageBackground
          source={currentContent.image}
          style={styles.FirstImage}
        />
      </ScrollView>
      <View style={styles.btnContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={handlePress}
        >
          <Text style={styles.buttonText}>Get Started </Text>
          <Animated.View style={{ transform: [{ translateX: arrowTranslateX }] }}>
            <Icon name="arrow-right" size={20} color="#EEEEEE" />
          </Animated.View>
        </TouchableOpacity>
        <View style={styles.loginContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
            <Text style={styles.loginText}>Already have an account? Log in</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default WelcomeScreen;