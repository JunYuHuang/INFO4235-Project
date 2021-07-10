import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppTabNav from "./navigators/AppTabNav";
import globalTheme from "./styles/globalTheme";
import { store } from "./redux/store";
import { Provider } from "react-redux";

export default function App() {
  return (
    <NavigationContainer theme={globalTheme}>
      <Provider store={store}>
        <AppTabNav />
      </Provider>
    </NavigationContainer>
  );
}
