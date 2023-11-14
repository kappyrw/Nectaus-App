import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const WelcomeScreen = ({ navigation }) => {
  const handleExplore = () => {
    navigation.navigate("Login");
  };

  const handleChat = () => {
    navigation.navigate("ChatScreen");
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <TouchableOpacity onPress={handleChat} style={styles.chatButton}>
          <Icon name="comments" size={20} color="#fff" />
        </TouchableOpacity>

        <Image source={require("../../assets/images/honey.png")} style={styles.logo} />

        <Text style={styles.premiumText}>40K+ Premium Bees</Text>

        <Text style={styles.appTitle}>Nectaus App 🐝</Text>

        <TouchableOpacity onPress={handleExplore} style={styles.exploreButton}>
          <Text style={styles.buttonText}>Explore more</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  contentContainer: {
    alignItems: "center",
  },
  chatButton: {
    backgroundColor: "#3498db",
    borderRadius: 18,
    padding: 10,
    position: "absolute",
    top: "61%",
    left: "42%",
    transform: [{ translateX: -25 }, { translateY: -15 }],
    zIndex: 1,
  },
  logo: {
    marginTop: 30,
    marginBottom: 10,
  },
  premiumText: {
    color: "#f96163",
    fontSize: 22,
    fontWeight: "bold",
  },
  appTitle: {
    fontSize: 42,
    fontWeight: "bold",
    color: "#3c444c",
    marginTop: 20,
    marginBottom: 30,
  },
  exploreButton: {
    backgroundColor: "#f96163",
    borderRadius: 18,
    paddingVertical: 18,
    width: "80%", // Adjust the width as needed
    alignItems: "center",
    marginTop: 5,
  },
  buttonText: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "500",
  },
});

export default WelcomeScreen;
