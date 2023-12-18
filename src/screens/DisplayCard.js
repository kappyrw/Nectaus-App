// DisplayCard.js
import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const DisplayCard = ({ route }) => {
  const { name, description } = route.params;

  // State to hold data received from the database
  const [dataFromDatabase, setDataFromDatabase] = useState(null);

  useEffect(() => {
    // Replace the following with your actual API call to fetch data from the database
    // Example: api.getDataFromDatabase()
    const fetchDataFromDatabase = async () => {
      try {
        // Simulating an API call delay (replace with your actual API call)
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Replace the following with your actual logic to fetch data from the database
        const response = { /* Your response from the database API */ };
        setDataFromDatabase(response);
      } catch (error) {
        console.error('Error fetching data from the database:', error);
      }
    };

    fetchDataFromDatabase();
  }, []); // Empty dependency array ensures the effect runs only once after the initial render

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Display Card Screen</Text>

      {/* Display data from route params */}
      <Text style={styles.text}>Name: {name}</Text>
      <Text style={styles.text}>Description: {description}</Text>

      {/* Display data from the database */}
      {dataFromDatabase && (
        <View>
          {/* Add your logic to display data received from the database */}
          {/* Example: */}
          <Text style={styles.text}>Data from Database:</Text>
          {/* Display additional fields as needed */}
          <Text style={styles.text}>Field 1: {dataFromDatabase.field1}</Text>
          <Text style={styles.text}>Field 2: {dataFromDatabase.field2}</Text>
        </View>
      )}
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
  text: {
    fontSize: 16,
    marginBottom: 10,
  },
});

export default DisplayCard;
