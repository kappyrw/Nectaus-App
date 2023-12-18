// AddCard.js
import React, { useState } from 'react';
import { ScrollView, View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import DisplayCard from './DisplayCard'; // Import the DisplayCard component

const AddCard = ({ navigation }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleAddCard = () => {
    if (!name || !description) {
      console.warn('Please fill out all fields');
      return;
    }

    console.log('Name:', name);
    console.log('Description:', description);

    // turashyira API logic here
    // Example:
    // api.addCard({ name, description })

    // Navigate to DisplayCard with the entered data
    navigation.navigate('DisplayCard', { name, description });

    setName('');
    setDescription('');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Add Card Screen</Text>

      <TextInput
        style={styles.input}
        placeholder="Name of the Bee"
        value={name}
        onChangeText={(text) => setName(text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={(text) => setDescription(text)}
        multiline
      />

      <TouchableOpacity style={styles.button} onPress={handleAddCard}>
        <Text style={styles.buttonText}>Add Card</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
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
});

export default AddCard;
