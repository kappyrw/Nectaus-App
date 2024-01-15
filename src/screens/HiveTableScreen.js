// HiveTableScreen.js
import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native"; // Import useNavigation hook

const HiveTableScreen = ({ route }) => {
  const navigation = useNavigation(); // Initialize useNavigation hook

  // Extracting hiveInfo from the route params
  const { hiveInfo } = route.params;

  const [detectedDiseases, setDetectedDiseases] = useState([]);

  const handleDetectDiseases = () => {
    // Logic to detect diseases based on hiveInfo data
    // For demonstration purposes, let's assume simple conditions
    let diseases = [];

    if (hiveInfo.temperature > 30) {
      diseases.push("Varroosis");
    }

    if (hiveInfo.population < 5000) {
      diseases.push("Nosema");
    }

    if (hiveInfo.soundIntensity > 80) {
      diseases.push("American Foulbrood");
    }

    setDetectedDiseases(diseases);

    // Display detected diseases in an alert
    if (diseases.length > 0) {
      Alert.alert("Detected Diseases", `Detected Diseases: ${diseases.join(", ")}`);
    } else {
      Alert.alert("No Diseases Detected", "No diseases detected based on current conditions.");
    }
  };

  const handleFindPreventionAndTreatment = () => {
    // Navigate to DiseaseInfoScreen
    navigation.navigate("DiseaseInfoScreen");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Hive Information Table</Text>

      {/* Display the information in a styled table */}
      <View style={styles.tableContainer}>
        {Object.entries(hiveInfo).map(([key, value]) => (
          <View style={styles.row} key={key}>
            <Text style={styles.label}>{key}:</Text>
            <Text style={styles.value}>{value}</Text>
          </View>
        ))}
      </View>

      {/* Button to detect diseases */}
      <TouchableOpacity style={styles.detectButton} onPress={handleDetectDiseases}>
        <Text style={styles.buttonText}>Detect Diseases</Text>
      </TouchableOpacity>

      {/* Button to find prevention and treatment */}
      <TouchableOpacity style={styles.preventionButton} onPress={handleFindPreventionAndTreatment}>
        <Text style={styles.buttonText}>Find Prevention & Treatment</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 169,
    backgroundColor: "#f8f8f8",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#333",
  },
  tableContainer: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 16,
    borderRadius: 10,
    backgroundColor: "#fff",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
    alignItems: "center",
  },
  label: {
    fontWeight: "bold",
    color: "#333",
    fontSize: 16,
  },
  value: {
    fontSize: 16,
    color: "#555",
  },
  detectButton: {
    backgroundColor: "#FF9800",
    padding: 12,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 16,
  },
  preventionButton: {
    backgroundColor: "#2196F3",
    padding: 12,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 16,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default HiveTableScreen;
