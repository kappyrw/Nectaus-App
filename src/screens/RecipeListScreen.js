import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  ScrollView,
  FlatList,
} from "react-native";
import Header from "../components/Header";
import SearchFilter from "../components/SearchFilter";
import CategoriesFilter from "../components/CategoriesFilter";
import RecipeCard from "../components/RecipeCard";

const RecipeListScreen = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredRecipes, setFilteredRecipes] = useState([]); // State to store filtered recipes

  const recipes = [
    // Replace with your actual recipe data
    { id: 1, title: "Pasta Carbonara" },
    { id: 2, title: "Chicken Alfredo" },
    { id: 3, title: "Vegetable Stir-Fry" },
    // Add more recipes here
  ];

  // Function to handle search and update the filtered recipes
  const handleSearch = (query) => {
    const filtered = recipes.filter((recipe) =>
      recipe.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredRecipes(filtered);
    setSearchQuery(query);
  };

  return (
    <SafeAreaView style={{ flex: 1, marginHorizontal: 16, marginTop: 80 }}>
      <Header headerText={"Hi, KAPPY "} headerIcon={"bell-o"} />

      <SearchFilter
        icon="search"
        placeholder={"Search for bees"}
        value={searchQuery}
        onChangeText={handleSearch} // Call handleSearch when text changes
      />

      <View style={{ marginTop: 22 }}>
        <Text style={{ fontSize: 22, fontWeight: "bold" }}>Categories</Text>
        <CategoriesFilter />
      </View>

      <View style={{ marginTop: 22, flex: 1 }}>
        <Text style={{ fontSize: 22, fontWeight: "bold" }}>Bees🐝🐝</Text>
        {/* Use FlatList to display filtered recipes */}
        <FlatList
          data={filteredRecipes.length > 0 ? filteredRecipes : recipes}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <RecipeCard title={item.title} />}
        />
      </View>
    </SafeAreaView>
  );
};

export default RecipeListScreen;

const styles = StyleSheet.create({});
