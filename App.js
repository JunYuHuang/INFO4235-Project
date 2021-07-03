import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppTabNav from "./navigators/AppTabNav";

export default function App() {
  return (
    <NavigationContainer>
      <AppTabNav />
    </NavigationContainer>
  );
}
