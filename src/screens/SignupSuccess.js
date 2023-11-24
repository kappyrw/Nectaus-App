// SignupSuccess.js

import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SignupSuccess = ({ route }) => {
  const { username } = route.params;
  const navigation = useNavigation(); // Initialize navigation

  const handleLogin = () => {
    navigation.navigate('Login'); // Navigate to the 'Login' screen
  };

  return (
    <View style={styles.container}>
      <Text style={styles.successText}>Hello, {username}!</Text>
      <Text style={styles.successText}>Welcome to the Beehive!</Text>
      <Text style={styles.successText}>Account Created Successfully!</Text>
      <Image
        source={require('../../assets/images/bee4.png')}
        style={{ marginTop: 200, width: 100, height: 100 }}
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Go back to Login</Text>
      </TouchableOpacity>
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
  button: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 8,
    marginTop: 20,
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
  },
});

export default SignupSuccess;
