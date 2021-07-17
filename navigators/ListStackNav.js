import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ListScreen from "../screens/ListScreen";
import DetailScreen from "../screens/DetailScreen";

const Stack = createStackNavigator();

export default function SearchStackNav() {
  return (
    <Stack.Navigator
      initialRouteName="List"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen
        name="List"
        component={ListScreen}
        options={{ title: "Your List" }}
      />
      <Stack.Screen
        name="Detail"
        component={DetailScreen}
        options={{ title: "Detail" }}
        initialParam={{ animeID: 9253 }}
      />
    </Stack.Navigator>
  );
}
