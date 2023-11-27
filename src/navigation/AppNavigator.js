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

				
				
				
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default AppNavigator;

const styles = StyleSheet.create({});
