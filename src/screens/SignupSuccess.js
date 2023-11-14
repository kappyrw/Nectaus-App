// SignupSuccess.js

import React from 'react';
import { View, Text, StyleSheet ,Image} from 'react-native';

const SignupSuccess = ({ route }) => {
  // Extract the username from the navigation parameters
  const { username } = route.params;

  return (
    
    <View style={styles.container}>
      <Text style={styles.successText}>Hello, {username}!</Text>
      <Text style={styles.successText}>Welcome to the Beehive!</Text>
      <Text style={styles.successText}>Account Created Successfully!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  successText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'green',
  },
});

export default SignupSuccess;
