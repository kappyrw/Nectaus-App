import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, Button } from "react-native";
import React, { useContext,useState } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import Spinner from "react-native-loading-spinner-overlay";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from "../config";

// ... Other imports ...

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userInfo, setUserInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Commented out the API section, please uncomment it when ready to integrate with your API
  // const login = async (email, password) => {
  //   try {
  //     setIsLoading(true);
  //     const res = await axios.post(`${BASE_URL}/auth/login`, {
  //       email,
  //       password,
  //     });
  //     let userInfo = res.data;
  //     console.log(userInfo);
  //     setUserInfo(userInfo);
  //     AsyncStorage.setItem("userInfo", JSON.stringify(userInfo));
  //     setIsLoading(false);
  //     navigation.navigate("AdminDashboard");
  //   } catch (e) {
  //     console.error(`login error wrong credential${e}`);
  //     setIsLoading(false);
  //   }
  // };

  // Temporary login function for testing
  const handleLogin = () => {
    if (email === "Kappy" && password === "Kappy") {
      navigation.navigate("AdminDashboard");
    } else {
      navigation.navigate("UserDashboard");
    }
  };

  const handleCreateAccount = () => {
    navigation.navigate("Signup");
  };

  return (
    <View style={styles.container}>
      <Spinner visible={isLoading} />

      <Image
        source={require("../../assets/images/bee4.png")}
        style={styles.logo}
      />

      <Text style={styles.appTitle}>Nectaus App 🐝</Text>

      <TextInput
        placeholder="Username"
        value={email}
        onChangeText={(text) => setEmail(text)}
        style={styles.input}
      />

      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
        style={styles.input}
      />

      <TouchableOpacity
        onPress={handleLogin}
        style={styles.loginButton}
      >
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <Text style={styles.orText}>OR</Text>

      <TouchableOpacity
        onPress={handleCreateAccount}
        style={styles.createAccountButton}
      >
        <Text style={styles.buttonText}>Create Account</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    top: -50,
  },
  logo: {
    marginTop: 200,
    width: 100,
    height: 100,
  },
  appTitle: {
    fontSize: 42,
    fontWeight: "bold",
    color: "#3c444c",
    marginTop: 44,
    marginBottom: 40,
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 8,
    width: "80%",
    padding: 10,
    fontSize: 16,
    marginTop: 10,
  },
  loginButton: {
    backgroundColor: "#3498db",
    borderRadius: 18,
    paddingVertical: 18,
    width: "80%",
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "700",
  },
  orText: {
    fontSize: 18,
    color: "black",
    fontWeight: "700",
    marginTop: 10,
  },
  createAccountButton: {
    backgroundColor: "#3498db",
    borderRadius: 18,
    paddingVertical: 18,
    width: "80%",
    alignItems: "center",
    marginTop: 10,
  },
});

export default Login;
