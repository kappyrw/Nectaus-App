// DisplayCard.js
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const DisplayCard = ({ imageUri, name, description }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Card Details</Text>
      
      {/* Display the uploaded image */}
      <Image source={{ uri: imageUri }} style={styles.uploadedImage} />

      {/* Display Name */}
      <Text style={styles.detailText}>Name: {name}</Text>

      {/* Display Description */}
      <Text style={styles.detailText}>Description: {description}</Text>
    </View>
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
  uploadedImage: {
    width: '80%',
    height: 200,
    borderRadius: 8,
    marginBottom: 20,
  },
  detailText: {
    fontSize: 16,
    marginBottom: 10,
  },
});

export default DisplayCard;
