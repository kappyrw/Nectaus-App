// Hive1Screen.js
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native"; // Import useNavigation hook

const Hive1Screen = () => {
  const navigation = useNavigation(); // Initialize useNavigation hook

  const [hiveInfo, setHiveInfo] = useState({
    name: "",
    location: "",
    temperature: "",
    population: "",
    Comment: "",
    humidity: "",
    weight: "",
    soundIntensity: "",
    Hivestatus: "",
    // Add more fields as needed
  });

  const handleSaveInformation = () => {
    // Basic validation to ensure all fields are filled
    for (const key in hiveInfo) {
      if (!hiveInfo[key]) {
        alert(`Please fill in the ${key} field.`);
        return;
      }
    }

    // Additional validation for Temperature, Weight, Population, and Sound Intensity
    if (isNaN(hiveInfo.temperature)) {
      alert("Temperature must be a number.");
      return;
    }

    if (isNaN(hiveInfo.weight)) {
      alert("Weight must be a number.");
      return;
    }

    if (isNaN(hiveInfo.population)) {
      alert("Population must be a number.");
      return;
    }

    if (isNaN(hiveInfo.soundIntensity)) {
      alert("Sound Intensity must be a number.");
      return;
    }

    // Handle saving the information to your data store or perform any necessary actions
    console.log("Hive1 Information saved:", hiveInfo);

    // Navigate to HiveTableScreen with the filled information
    navigation.navigate("HiveTableScreen", { hiveInfo });
  };

  const handleEditField = (fieldName, text) => {
    setHiveInfo({ ...hiveInfo, [fieldName]: text });
  };

  const handleDeleteField = (fieldName) => {
    setHiveInfo({ ...hiveInfo, [fieldName]: "" });
  };

  const handleDeleteAll = () => {
    setHiveInfo({
      name: "",
      location: "",
      temperature: "",
      population: "",
      Comment: "",
      humidity: "",
      weight: "",
      soundIntensity: "",
      Hivestatus: "",
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>Add information for Hive1</Text>

      <ScrollView>
        {/* Example input fields */}
        {Object.keys(hiveInfo).map((field, index) => (
          <View key={index} style={styles.fieldContainer}>
            <Text style={styles.label}>{`Hive ${field}:`}</Text>
            <TextInput
              style={styles.input}
              placeholder={`Enter ${field}`}
              value={hiveInfo[field]}
              editable={true}
              onChangeText={(text) => handleEditField(field, text)}
            />
            <TouchableOpacity style={styles.deleteButton} onPress={() => handleDeleteField(field)}>
              <Text style={styles.buttonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      {/* Button to save information */}
      <TouchableOpacity style={styles.saveButton} onPress={handleSaveInformation}>
        <Text style={styles.buttonText}>Save Information</Text>
      </TouchableOpacity>

      {/* Button to delete all information */}
      <TouchableOpacity style={styles.deleteAllButton} onPress={handleDeleteAll}>
        <Text style={styles.buttonText}>Delete All</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 60,
    backgroundColor: "#f8f8f8",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  fieldContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginRight: 8,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: "#ddd",
    borderBottomWidth: 1,
    paddingHorizontal: 8,
    fontSize: 16,
    marginRight: 8,
  },
  deleteButton: {
    backgroundColor: "#FF0000",
    padding: 8,
    borderRadius: 5,
    alignItems: "center",
  },
  saveButton: {
    backgroundColor: "#4CAF50",
    padding: 12,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 16,
  },
  deleteAllButton: {
    backgroundColor: "#FF0000",
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
