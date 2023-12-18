import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";

const AddHiveInfo = ({ route, navigation }) => {
  const { categoryId } = route.params;
  const [hiveInfo, setHiveInfo] = useState("");

  const handleAddInfo = () => {
    // Handle the logic to save hive information
    console.log(`Added information for Hive ${categoryId}: ${hiveInfo}`);

    // Navigate back to the previous screen
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Information for Hive {categoryId}</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter hive information..."
        onChangeText={(text) => setHiveInfo(text)}
      />
      <Button title="Add Information" onPress={handleAddInfo} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    marginBottom: 16,
    width: "80%",
  },
});

export default AddHiveInfo;
