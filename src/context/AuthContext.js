import axios from "axios";
import React, { createContext, useState } from "react";
import { BASE_URL } from "../config";

export const AuthContext = createContext();
export  const AuthProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(null); // Store user info
  const [isLoading,setIsLoading] =useState(false)
  const registers = async (email, fullName, password, phone, location, role) => {
    try {
      setIsLoading(true)
      const res = await axios.post(`${BASE_URL}/auth/signup`, {
        email,
        fullName, 
        password,
        phone,
        location,
        role,
      });
      console.log(res.data);
      let userInfo=res.data;
      setUserInfo(userInfo);    
      AsyncStorage.setItem("userInfo",JSON.stringify(userInfo))
      setIsLoading(false)
      navigation.navigate("Login");
    } catch (e) {
      console.error(`register error ${e}`);
      setIsLoading(false)
    }
  };

  return (
    <AuthContext.Provider value={registers} >
      {children}
    </AuthContext.Provider>
  );
};
