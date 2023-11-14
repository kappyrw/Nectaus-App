import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, Button } from "react-native";
import React, { useState } from "react";

const Login = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (!username || !password) {
      alert("Please fill in your username and password.");
     
      return;
    } else if (username.length < 5 || password.length < 5) {
      alert("Username and password must be at least 5 characters long.");
    
      return;
    }
    
    if (username === "Kappy" && password === "Kappy") {
      
      navigation.navigate("AdminDashboard");
    }
      

    else {
      // Handle incorrect login credentials or show an error message
     navigation.navigate("UserDashboard");
    }
  };

  const handleCreateAccount = () => {
    navigation.navigate("Signup");
    // Add logic to navigate to the account creation screen
    // For example, you can use navigation.navigate("CreateAccount")
    // to navigate to a screen where the user can create a new account.
    // Ensure you have the CreateAccount screen set up in your navigation stack.
  };

  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <Image
        source={require("../../assets/images/bee4.png")}
        style={{ marginTop: 200, width: 100, height: 100 }}
      />

      

      <Text
        style={{
          fontSize: 42,
          fontWeight: "bold",
          color: "#3c444c",
          marginTop: 44,
          marginBottom: 40,
        }}
      >
        Nectaus App 🐝
      </Text>

     

      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={(text) => setUsername(text)}
        style={{
          borderWidth: 1,
          borderColor: "gray",
          borderRadius: 8,
          width: "80%",
          padding: 10,
          fontSize: 16,
          marginTop: 10,
        }}
      />

      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
        style={{
          borderWidth: 1,
          borderColor: "gray",
          borderRadius: 8,
          width: "80%",
          padding: 10,
          fontSize: 16,
          marginTop: 10,
        }}
      />

      <TouchableOpacity
        onPress={handleLogin}
        style={{
      backgroundColor: "#3498db",
          borderRadius: 18,
          paddingVertical: 18,
          width: "80%",
          alignItems: "center",
          marginTop: 20,
        }}
      >
        <Text style={{ fontSize: 18, color: "#fff", fontWeight: "700" }}>
          Login
        </Text>
      </TouchableOpacity>
      
      
	  <Text style={{ fontSize: 18, color: "black", fontWeight: "700" }}>
        OR
      </Text>
	  
      <TouchableOpacity
        onPress={handleCreateAccount}
        style={{
          backgroundColor: "#3498db",
          borderRadius: 18,
          paddingVertical: 18,
          width: "80%",
          alignItems: "center",
          marginTop: 10,
        }}
      >
        <Text style={{ fontSize: 18, color: "#fff", fontWeight: "700" }}>
          Create Account
        </Text>
      </TouchableOpacity>
	  
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({});
