import React, { useState, useEffect } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Spinner from 'react-native-loading-spinner-overlay';
import { BASE_URL } from '../config';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userInfo, setUserInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    checkLoggedInUser();
  }, []);

  const checkLoggedInUser = async () => {
    try {
      const storedUserInfo = await AsyncStorage.getItem('userInfo');
      if (storedUserInfo) {
        setUserInfo(JSON.parse(storedUserInfo));
        navigation.navigate('AdminDashboard');
      }
    } catch (error) {
      console.error('Error checking logged-in user:', error);
    }
  };
  console.log("info of loded user ", userInfo?.access_token);
  const login = async (email, password) => {
    try {
      setIsLoading(true);
      const res = await axios.post(`${BASE_URL}/auth/login`, {
        email,
        password,
      });
      let userInfo = res.data;
      console.log(userInfo);
      setUserInfo(userInfo);
      await AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
      setIsLoading(false);
      navigation.navigate('AdminDashboard');
    } catch (e) {
      console.error(`Login error wrong credentials: ${e}`);
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Spinner visible={isLoading} />

      <Image source={require('../../assets/images/bee4.png')} style={styles.logo} />

      <Text style={styles.appTitle}>Nectaus App 🐝</Text>

      <TextInput
        placeholder="Username"
        value={email}
        onChangeText={(text) => setEmail(text)}
        style={styles.input}
      />

      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
        style={styles.input}
      />

      <TouchableOpacity onPress={() => login(email, password)} style={styles.loginButton}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <Text style={styles.orText}>OR</Text>

      <TouchableOpacity onPress={() => navigation.navigate('Signup')} style={styles.createAccountButton}>
        <Text style={styles.buttonText}>Create Account</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    top: -50,
  },
  logo: {
    marginTop: 200,
    width: 100,
    height: 100,
  },
  appTitle: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#3c444c',
    marginTop: 44,
    marginBottom: 40,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    width: '80%',
    padding: 10,
    fontSize: 16,
    marginTop: 10,
  },
  loginButton: {
    backgroundColor: '#3498db',
    borderRadius: 18,
    paddingVertical: 18,
    width: '80%',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '700',
  },
  orText: {
    fontSize: 18,
    color: 'black',
    fontWeight: '700',
    marginTop: 10,
  },
  createAccountButton: {
    backgroundColor: '#3498db',
    borderRadius: 18,
    paddingVertical: 18,
    width: '80%',
    alignItems: 'center',
    marginTop: 10,
  },
});

export default Login;
