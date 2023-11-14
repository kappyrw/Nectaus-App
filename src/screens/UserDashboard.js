import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const UserDashboard = ({ navigation }) => {
  const handleRegularFunction = () => {
    // Perform actions specific to regular users
    // For example, navigate to another user-specific section
    navigation.navigate('UserSpecificSection');
  };
  const handleUpdates = () => {
    // Navigate to the RecipeListScreen when the "Updates" button is clicked
    navigation.navigate('RecipeList');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>User Dashboard</Text>
      <TouchableOpacity style={styles.button} onPress={handleRegularFunction}>

        <Text style={styles.buttonText}>User Specific Section</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleRegularFunction}>
        <Text style={styles.buttonText}>User Specific Section</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleRegularFunction}>
        <Text style={styles.buttonText}>User Specific Section</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleRegularFunction}>
        <Text style={styles.buttonText}>User Specific Section</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleUpdates}>
        <Text style={styles.buttonText}>Updates</Text>
        </TouchableOpacity>
      {/* Additional buttons or components for regular user functionalities */}
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
  button: {
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

export default UserDashboard;
