// Hive1Screen.js
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView } from "react-native";

const Hive1Screen = () => {
  const [hiveInfo, setHiveInfo] = useState({
    name: "",
    location: "",
    temperature: "",
    population: "",
    
    Comment : "",
    humidity: "",
    weight: "",
   soundIntensity: "",
  Hivestatus : "",
    // Add more fields as needed
  });

  const handleSaveInformation = () => {
    // Handle saving the information to your data store or perform any necessary actions
    console.log("Hive1 Information saved:", hiveInfo);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>Add information for Hive1</Text>

      {/* Example input fields */}
      <TextInput
        style={styles.input}
        placeholder="Hive Name"
        onChangeText={(text) => setHiveInfo({ ...hiveInfo, name: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Location"
        onChangeText={(text) => setHiveInfo({ ...hiveInfo, location: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Temperature"
        onChangeText={(text) => setHiveInfo({ ...hiveInfo, temperature: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Population"
        onChangeText={(text) => setHiveInfo({ ...hiveInfo, population: text })}
      />
        <TextInput
        style={styles.input}
        placeholder="Comment"
        onChangeText={(text) => setHiveInfo({ ...hiveInfo, Comment: text })}
        />
        <TextInput
        style={styles.input}
        placeholder="Humidity"
        onChangeText={(text) => setHiveInfo({ ...hiveInfo, humidity: text })}
        />
        <TextInput
        style={styles.input}
        placeholder="Weight"
        onChangeText={(text) => setHiveInfo({ ...hiveInfo, weight: text })}
        />

        <TextInput
        style={styles.input}
        placeholder="Sound Intensity"
        onChangeText={(text) => setHiveInfo({ ...hiveInfo, soundIntensity: text })}
        />
        
        
      
      

      {/* Button to save information */}
      <TouchableOpacity style={styles.saveButton} onPress={handleSaveInformation}>
        <Text style={styles.buttonText}>Save Information</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 169,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: "#ddd",
    borderBottomWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: "#4CAF50",
    padding: 12,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default Hive1Screen;
