import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';


const AdminDashboard = ({ navigation }) => {
  // Example functions for different admin functionalities
  const manageUsers = () => {
    // Functionality to manage users
    // navigation.navigate('ManageUsers') or perform actions related to managing users
  };

  const manageContent = () => {

    // Functionality to manage content
    // navigation.navigate('ManageContent') or perform actions related to managing content
    navigation.navigate('AdminNewsScreen');
  };

  const viewAnalytics = () => {
    // Functionality to view analytics
    // navigation.navigate('ViewAnalytics') or perform actions related to analytics
    navigation.navigate('AnalyticsScreen');

  };

  const handleUpdates = () => {
    // Navigate to the RecipeListScreen when the "Updates" button is clicked
    navigation.navigate('RecipeList');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Admin Dashboard</Text>
      <TouchableOpacity style={styles.button} onPress={manageUsers}>
        <Text style={styles.buttonText}>Manage Users</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={manageContent}>
        <Text style={styles.buttonText}>Manage Content</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={viewAnalytics}>
        <Text style={styles.buttonText}>View Analytics</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleUpdates}>
        <Text style={styles.buttonText}>Updates</Text>
      </TouchableOpacity>
      {/* Additional buttons or components for other functionalities */}
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

export default AdminDashboard;
