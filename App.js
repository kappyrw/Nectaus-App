import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import AppNavigator from "./src/navigation/AppNavigator";
import { AuthProvider } from "./src/context/AuthContext";

export default function App() {
	return(
//   <React.StrictMode>

	<AuthProvider>
	<AppNavigator />
	</AuthProvider>
//   </React.StrictMode>


		);
}
