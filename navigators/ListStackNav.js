import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ListScreen from "../screens/ListScreen";
import DetailScreen from "../screens/DetailScreen";

const Stack = createStackNavigator();

export default function SearchStackNav() {
  return (
    <Stack.Navigator initialRouteName="List">
      <Stack.Screen
        name="List"
        component={ListScreen}
        options={{ title: "List" }}
      />
      <Stack.Screen
        name="Detail"
        component={DetailScreen}
        options={{ title: "Detail" }}
      />
    </Stack.Navigator>
  );
}
