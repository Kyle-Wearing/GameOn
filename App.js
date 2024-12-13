import LoginScreen from "./app/screens/LoginScreen";
import CreateAccountScreen from "./app/screens/CreateAccountScreen";
import HomePageScreen from "./app/screens/HomePageScreen";
import UserPageScreen from "./app/screens/UserPageScreen";
import JoinGroupScreen from "./app/screens/JoinGroupScreen";
import MainContainer from "./app/screens/MainContainer";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, PlatformPressable } from "react-native";
import {
  NavigationContainer,
  useLinkBuilder,
  useTheme,
} from "@react-navigation/native";
// import { PlatformPressable } from "react-native/elements";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

export default function App() {
  return <MainContainer />;
}
