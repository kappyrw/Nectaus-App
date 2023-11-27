// AdminNewsScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createNews } from '../api/news';

const AdminNewsScreen = () => {
  const navigation = useNavigation();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleCreateNews = () => {
    const trimmedTitle = title.trim();
    // Validate input fields before submitting
    if (!trimmedTitle || !content) {
      // Handle validation error
      console.warn('Please fill out all fields');
      return;
    }

    // Call the createNews function from the API service
    createNews({ title: trimmedTitle, content })
      .then(() => {
        // Navigate back to the admin dashboard or perform other actions
        navigation.navigate('AdminDashboard');
      })
      .catch((error) => {
        console.error('Error creating news:', error);
        // Handle error appropriately
      });
  };

  const handleViewAnalytics = () => {
    // Navigate to the Analytics screen
    navigation.navigate('AnalyticsScreen');
  };

  const handleCard = () => {
    // Navigate to the AddCard screen
    navigation.navigate('AddCard');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Admin News Screen</Text>

      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={(text) => setTitle(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Content"
        value={content}
        onChangeText={(text) => setContent(text)}
        multiline
      />
      <TouchableOpacity style={styles.button} onPress={handleCreateNews}>
        <Text style={styles.buttonText}>Submit News</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleViewAnalytics}>
        <Text style={styles.buttonText}>View Analytics</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleCard}>
        <Text style={styles.buttonText}>Add Card</Text>
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
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
    width: '80%',
  },
  button: {
    backgroundColor: '#3498db',
    borderRadius: 18,
    paddingVertical: 18,
    width: '80%',
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '700',
  },
  // Styles remain unchanged
});

export default AdminNewsScreen;
