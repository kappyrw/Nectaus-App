import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, Button } from "react-native";
import React, { useContext,useState } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import Spinner from "react-native-loading-spinner-overlay";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from "../config";


const Login = ({ navigation }) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
    const [userInfo, setUserInfo] = useState(null); // Store user info
  const [isLoading,setIsLoading] =useState(false)
  const login = async(email,password)=>{
    try {
      // preventDefault();
     setIsLoading(true)
      const res= await axios.post(`https://holiday-planner-4lnj.onrender.com/api/v1/auth/login`,{
        email,password
      });
        let userInfo=res.data;
        console.log(userInfo);
      setUserInfo(userInfo);
      AsyncStorage.setItem("userInfo", JSON.stringify(userInfo));
      setIsLoading(false)
      navigation.navigate("AdminDashboard");
      
     

      
    } catch (e) {
       console.error(`login error ${e}`);
      setIsLoading(false)
      
    }
  }
  
  

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

    
  };

  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <Spinner visible={isLoading}/>
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
        value={email}
        onChangeText={(text) => setEmail(text)}
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
        onPress={()=>{login(email,password)}}
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
