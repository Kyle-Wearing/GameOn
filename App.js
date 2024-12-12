import LoginScreen from "./app/screens/LoginScreen";
import CreateAccountScreen from "./app/screens/CreateAccountScreen";
import HomePageScreen from "./app/screens/HomePageScreen";
import UserPageScreen from "./app/screens/UserPageScreen";
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

function MyTabBar({ state, descriptors, navigation }) {
  const { colors } = useTheme();
  const { buildHref } = useLinkBuilder();

  return (
    <View style={{ flexDirection: "row" }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <PlatformPressable
            href={buildHref(route.name, route.params)}
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarButtonTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{ flex: 1 }}
          >
            <Text style={{ color: isFocused ? colors.primary : colors.text }}>
              {label}
            </Text>
          </PlatformPressable>
        );
      })}
    </View>
  );
}

const MyTabs = createBottomTabNavigator({
  tabBar: (props) => <MyTabBar {...props} />,
  screens: {
    Home: HomePageScreen,
    Profile: UserPageScreen,
  },
});

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LogIn">
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
