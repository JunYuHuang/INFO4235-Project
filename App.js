import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppTabNav from "./navigators/AppTabNav";
import globalTheme from "./styles/globalTheme";

export default function App() {
  return (
    <NavigationContainer theme={globalTheme}>
      <AppTabNav />
    </NavigationContainer>
  );
}
