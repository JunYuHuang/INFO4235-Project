import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SettingsScreen from "../screens/SettingsScreen";
import AboutScreen from "../screens/AboutScreen";
const Stack = createStackNavigator();

export default function SettingsStackNav() {
  return (
    <Stack.Navigator initialRouteName="Settings">
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ title: "Settings" }}
      />
    </Stack.Navigator>
  );
}

// {/* <Stack.Screen
//   name="About"
//   component={AboutScreen}
//   options={{ title: "About" }}
// /> */}
