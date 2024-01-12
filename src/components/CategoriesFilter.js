// CategoriesFilter.js
import React from "react";
import { ScrollView, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { categories, colors } from "../Constant";

const CategoriesFilter = () => {
  const navigation = useNavigation();

  const handleButtonPress = () => {
    navigation.navigate("Hive1Screen");
  };

  return (
    <View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {categories.map((category, index) => (
          <View
            key={index}
            style={{
              backgroundColor:
                index === 0 ? colors.COLOR_PRIMARY : colors.COLOR_LIGHT,
              marginRight: 36,
              borderRadius: 8,
              paddingHorizontal: 16,
              paddingVertical: 10,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.1,
              shadowRadius: 7,
              marginVertical: 16,
            }}
          >
            <Text
              style={{
                color: index === 0 && colors.COLOR_LIGHT,
                fontSize: 18,
              }}
            >
              {category.category}
            </Text>

            {/* Button to add information */}
            <TouchableOpacity
              style={styles.addButton}
              onPress={handleButtonPress}
            >
              <Text style={styles.buttonText}>Add Information</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  addButton: {
    marginTop: 10,
    backgroundColor: "#4CAF50",
    padding: 8,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
  },
});

export default CategoriesFilter;
