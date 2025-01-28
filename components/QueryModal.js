import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const QueryModal = () => {
  return (
    <View style={styles.container}>
      <Text>No results for 'query'</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default QueryModal;