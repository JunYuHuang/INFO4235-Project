import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SearchScreen from "../screens/SearchScreen";
import DetailScreen from "../screens/DetailScreen";

const Stack = createStackNavigator();

export default function SearchStackNav() {
  return (
    <Stack.Navigator
      initialRouteName="Search"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen
        name="Search"
        component={SearchScreen}
        options={{ title: "Search" }}
      />
      <Stack.Screen
        name="Detail"
        component={DetailScreen}
        options={{ title: "Detail" }}
      />
    </Stack.Navigator>
  );
}
