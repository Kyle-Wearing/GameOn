import React from "react";
import UserPageScreen from "./app/screens/UserPageScreen";
import JoinGroupScreen from "./app/screens/JoinGroupScreen";
import { View, StyleSheet, Text, SafeAreaView } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const MyTabs = createBottomTabNavigator({
  screens: {
    Home: HomePageScreen,
    Profile: UserPageScreen,
    JoinGroup: JoinGroupScreen,
  },
});

function HomePageScreen() {
  return (
    <SafeAreaView>
      <MyTabs />
    </SafeAreaView>
  );
}

export default HomePageScreen;
