import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WelcomeScreen from "../screens/WelcomeScreen";
import RecipeListScreen from "../screens/RecipeListScreen";
import RecipeDetailsScreen from "../screens/RecipeDetailsScreen";
import Login from "../screens/Login";
import Signup from "../screens/Signup";
import AdminDashboard from "../screens/AdminDashboard";
import UserDashboard from "../screens/UserDashboard";
import { FontAwesome } from "@expo/vector-icons";
import SignupSuccess from "../screens/SignupSuccess";
import ChatScreen from "../screens/ChatScreen";
import AdminNewsScreen from '../screens/AdminNewsScreen';
import AnalyticsScreen from "../screens/AnalyticsScreen";
import AddCard from "../screens/AddCard";
import DisplayCard from "../screens/DisplayCard";
import HiveDetail from "../screens/HivesScreen";
import AddHiveInfo from "../screens/AddHiveInfo";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import Hive1Screen from "../screens/Hive1Screen";

//i am going to impport all an important files to use in navigation 





 
const Stack = createNativeStackNavigator();
const AppNavigator = () => {
	return (
		

		<NavigationContainer>
			<Stack.Navigator screenOptions={{ headerShown: false }}>
				<Stack.Screen name="Welcome" component={WelcomeScreen} />
				<Stack.Screen name="RecipeList" component={RecipeListScreen} />
				<Stack.Screen name="RecipeDetail" component={RecipeDetailsScreen} />
				<Stack.Screen name="Login" component={Login}/>
				<Stack.Screen name="Signup" component={Signup}/>
				<Stack.Screen name="AdminDashboard" component={AdminDashboard}/>
				<Stack.Screen name="UserDashboard" component={UserDashboard}/>
				<Stack.Screen name="SignupSuccess" component={SignupSuccess}/>
				<Stack.Screen name="ChatScreen" component={ChatScreen}/>
				<Stack.Screen name="AdminNewsScreen" component={AdminNewsScreen}/>
				<Stack.Screen name="AnalyticsScreen" component={AnalyticsScreen}/>
				<Stack.Screen name="AddCard" component={AddCard}/>
				<Stack.Screen name="DisplayCard" component={DisplayCard}/>
				<Stack.Screen name="HiveDetail" component={HiveDetail} />
				<Stack.Screen name="AddHiveInfo" component={AddHiveInfo} />

				<Stack.Screen name="Hive1Screen" component={Hive1Screen} />

				
				
				
			</Stack.Navigator>
		</NavigationContainer>
		
	);
};

export default AppNavigator;

const styles = StyleSheet.create({});
