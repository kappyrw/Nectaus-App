import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Signup = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSignup = () => {
    if (!username || !email || !password || !confirmPassword) {
      alert('Please fill in all fields.');
      return;
    } else if (password !== confirmPassword) {
      alert('Passwords do not match.');
      return;
    } else if (password.length < 5 || confirmPassword.length < 5) {
      alert('Passwords must be at least 5 characters long.');
      return;
    }
    navigation.navigate('SignupSuccess', { username });

    // Logic to handle signup, validate input, create account, etc.
    // You can add your validation or account creation logic here.
  };

  const handleIncrement = () => {
    // Increment the phone number
    setPhone((prevPhone) => (prevPhone === '' ? '1' : (parseInt(prevPhone) + 1).toString()));
  };

  const handleDecrement = () => {
    // Decrement the phone number, ensuring it doesn't go below 0
    setPhone((prevPhone) =>
      prevPhone === '' || parseInt(prevPhone) === 0 ? '' : (parseInt(prevPhone) - 1).toString()
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create an Account 🐝</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={(text) => setUsername(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <View style={styles.phoneContainer}>
        <TouchableOpacity style={styles.phoneButton} onPress={handleDecrement}>
          <MaterialCommunityIcons name="minus" size={24} color="black" />
        </TouchableOpacity>
        <TextInput
          style={styles.phoneInput}
          placeholder="Phone"
          keyboardType="numeric"
          value={phone}
          onChangeText={(text) => setPhone(text)}
        />
        <TouchableOpacity style={styles.phoneButton} onPress={handleIncrement}>
          <MaterialCommunityIcons name="plus" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Password"
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <TouchableOpacity
          style={styles.eyeIcon}
          onPress={() => setShowPassword(!showPassword)}
        >
          <MaterialCommunityIcons
            name={showPassword ? 'eye-off-outline' : 'eye-outline'}
            size={24}
            color="black"
          />
        </TouchableOpacity>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        secureTextEntry={!showPassword}
        value={confirmPassword}
        onChangeText={(text) => setConfirmPassword(text)}
      />
      <TouchableOpacity style={styles.signupButton} onPress={handleSignup}>
        <Text style={styles.buttonText}>Sign Up</Text>
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
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
  phoneContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
    marginTop: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    overflow: 'hidden', // Ensure children don't overflow the border
  },
  phoneButton: {
    padding: 10,
  },
  phoneInput: {
    flex: 1,
    padding: 10,
    fontSize: 16,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
    marginTop: 10,
  },
  passwordInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
  },
  eyeIcon: {
    position: 'absolute',
    right: 10,
  },
  signupButton: {
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
});

export default Signup;
