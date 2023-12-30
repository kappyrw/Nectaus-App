import axios from "axios";
import React, { createContext, useState } from "react";
import { BASE_URL } from "../config";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(null); // Store user info
  const [isLoading,setIsLoading] =useState(false)
  const register = async (email, fullName, password, phone, location, role) => {
    try {
      const res = await axios.post(`${BASE_URL}/auth/signup`, {
        email,
        fullName,
        password,
        phone,
        location,
        role,
      });
      setUserInfo(res.data);
    } catch (e) {
      console.error(`register error ${e}`);
      // Handle error appropriately
    }
  };

  return (
    <AuthContext.Provider value={register} >{children}</AuthContext.Provider>
  );
};
// import axios from "axios";
// import React, { createContext, useState } from "react";
// import { BASE_URL } from "../config";

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [userInfo, setUserInfo] = useState(null);

//   const register = async (email, fullName, password, phone, location, role) => {
//     try {
//       const res = await axios.post(`${BASE_URL}/auth/signup`, {
//         email,
//         fullName,
//         password,
//         phone,
//         location,
//         role,
//       });
//       setUserInfo(res.data);
//     } catch (e) {
//       console.error(`register error ${e}`);
//       // Handle error appropriately, e.g., display an error message to the user
//     }
//   };

//   return (
//     <AuthContext.Provider value={{ register, userInfo }}>{children}</AuthContext.Provider>
//   );
// };