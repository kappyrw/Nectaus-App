import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, Image } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { AntDesign } from '@expo/vector-icons';

const WelcomeScreen = ({ navigation }) => {
  const [backgroundImageIndex, setBackgroundImageIndex] = useState(1);

  const handleChat = () => {
    navigation.navigate("ChatScreen");
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setBackgroundImageIndex((prevIndex) => (prevIndex % 2) + 1);
    }, 5000); // Change the interval as needed (in milliseconds)

    return () => clearInterval(interval);
  }, []);

  // const getBackgroundImage = () => {
  //   switch (backgroundImageIndex) {
  //     case 1:
  //       return 0;
  //     // case 2:
  //     //   return require("../../assets/images/bee12.jpg");
  //     // default:
  //     //   return require("../../assets/images/bee11.jpg");
  //   }
  // };

  const handleExplore = () => {
    navigation.navigate("Login");
  };

  return (
    // <ImageBackground source={getBackgroundImage()} style={styles.backgroundImage} >
      <View style={styles.container}>
       

        <Image source={require("../../assets/images/honey.png")} style={styles.logo} />

        <Text style={styles.premiumText}>60K+ Premium Bees</Text>

        <Text style={styles.appTitle}>Nectaus App 🐝</Text>

        <TouchableOpacity onPress={handleExplore} style={styles.exploreButton}>
          <Text style={styles.buttonText}>Explore more</Text>
        </TouchableOpacity>

        <View style={styles.socialIcons}>
          <TouchableOpacity style={styles.iconButton} onPress={handleChat}>
           
          <AntDesign name="message1" size={30} color="#3b5998" />
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
          <TouchableOpacity style={styles.iconButton}>
            <FontAwesome5 name="phone" size={30} color="black" />
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
  chatButton: {
    backgroundColor: "#3498db",
    borderRadius: 18,
    padding: 10,
    position: "absolute",
    top: "55%",
    left: "42%",
    transform: [{ translateX: -25 }, { translateY: -15 }],
    zIndex: 1,
  },
  logo: {
    marginTop: -10,
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
    width: "80%",
    alignItems: "center",
    marginTop: -23,
    marginBottom:20,
  },
  buttonText: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "500",
    display: "flex",
    marginBottom: -9,
  },
  socialIcons: {
    flexDirection: "row",
    marginTop: 3,
    marginBottom: 20,
  },
  iconButton: {
    marginHorizontal: 10,
    padding: 0,
    marginBottom: 10,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    opacity: 0.8,
  },
});

export default WelcomeScreen;
