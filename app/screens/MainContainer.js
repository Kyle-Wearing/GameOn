import * as React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Ionicons from "react-native-vector-icons/Ionicons";
import HomePageScreen from "./HomePageScreen";
import UserPageScreen from "./UserPageScreen";
import JoinGroupScreen from "./JoinGroupScreen";
import LoginScreen from "./LoginScreen";
import CreateAccountScreen from "./CreateAccountScreen";
import { GroupsPageScreen } from "./GroupPageScreen";
import GroupSettingsScreen from "./GroupSettingsScreen";
import { GroupCalanderScreen } from "./groupCalenderScreen";
import { RecordScoresScreen } from "./RecordScoresScreen";
import { LoadingScreen } from "./LoadingScreen";
import { GroupGameScreen } from "./GroupGamesScreen";
import { GameRankingScreen } from "./GameRankingScreen";
import { UserPerformance } from "./UserPerformance";
import { GamesPlayedScreen } from "./GamesPlayedScreen";

const Tab = createBottomTabNavigator();

const Stack = createNativeStackNavigator();

const NavTab = () => {
  const homeName = "Home";
  const userPageName = "User";
  const joinGroupName = "Groups";
  return (
    <Tab.Navigator
      initialRouteName={homeName}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let rn = route.name;

          if (rn === homeName) {
            iconName = focused ? "home" : "home-outline";
          } else if (rn === userPageName) {
            iconName = focused ? "person" : "person-outline";
          } else if (rn === joinGroupName) {
            iconName = focused ? "people" : "people-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: "red",
        inactiveTintColor: "grey",
      }}
    >
      <Tab.Screen name={homeName} component={HomePageScreen} />
      <Tab.Screen name={userPageName} component={UserPageScreen} />
      <Tab.Screen name={joinGroupName} component={JoinGroupScreen} />
    </Tab.Navigator>
  );
};

function MainContainer() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoadingScreen">
        <Stack.Screen
          name="LoadingScreen"
          component={LoadingScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="LogIn"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CreateAccount"
          component={CreateAccountScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="GameOn"
          component={NavTab}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="GroupScreen"
          component={GroupsPageScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="GroupSettingsScreen"
          component={GroupSettingsScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="GroupCalanderScreen"
          component={GroupCalanderScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="RecordScoresScreen"
          component={RecordScoresScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="GroupGameScreen"
          component={GroupGameScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="GameRankingScreen"
          component={GameRankingScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="UserPerformance"
          component={UserPerformance}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="GamesPlayed"
          component={GamesPlayedScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default MainContainer;
