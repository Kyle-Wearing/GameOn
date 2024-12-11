import LoginScreen from "./app/screens/LoginScreen";
import CreateAccountScreen from "./app/screens/CreateAccountScreen";
import HomePageScreen from "./app/screens/HomePageScreen";
import UserPageScreen from "./app/screens/UserPageScreen";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="LogIn"
          component={LoginScreen}
          options={{ title: "LogIn" }}
        />
        <Stack.Screen
          name="CreateAccount"
          component={CreateAccountScreen}
          options={{ title: "CreateAccount" }}
        />
        <Stack.Screen
          name="HomePage"
          component={HomePageScreen}
          options={{ title: "HomePage" }}
        />
        <Stack.Screen
          name="UserPage"
          component={UserPageScreen}
          options={{ title: "UserPage" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
});
