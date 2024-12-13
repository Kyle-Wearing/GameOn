import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Text, SafeAreaView } from "react-native";

const Tab = createBottomTabNavigator();

function HomePageScreen({ navigation }) {
  return (
    <SafeAreaView>
      <Text>Hello Home Screen</Text>
    </SafeAreaView>
  );
}

export default HomePageScreen;
