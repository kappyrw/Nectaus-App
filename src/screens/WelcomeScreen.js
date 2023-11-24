import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

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

        <View style={styles.socialIcons}>
          <TouchableOpacity style={styles.iconButton}>
            <FontAwesome5 name="facebook" size={30} color="#3b5998" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <FontAwesome5 name="twitter" size={30} color="#1da1f2" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <FontAwesome5 name="instagram" size={30} color="#e4405f" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
          <FontAwesome5 name="tiktok" size={30} color="#69c9d0" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <FontAwesome5 name="youtube" size={30} color="#ff0000" />
        </TouchableOpacity>
          {/* Add more social media icons as needed */}
        </View>
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
  socialIcons: {
    flexDirection: "row",
    marginTop: 3,
    marginBottom:50
  },
  iconButton: {
    marginHorizontal: 10,
  },
});

export default WelcomeScreen;
