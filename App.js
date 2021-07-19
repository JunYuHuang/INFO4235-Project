import "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppTabNav from "./navigators/AppTabNav";
import globalTheme from "./styles/globalTheme";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import {
  useFonts,
  Montserrat_400Regular,
  Montserrat_500Medium,
} from "@expo-google-fonts/montserrat";
import InitialLoadingDisplay from "./components/InitialLoadingDisplay";

export default function App() {
  let [fontsLoaded, error] = useFonts({
    Montserrat_400Regular,
    Montserrat_500Medium,
  });

  useEffect(() => {
    error && console.log(`Error loading fonts: ${error}`);
  }, [fontsLoaded, error]);

  if (!fontsLoaded) {
    return <InitialLoadingDisplay />;
  } else {
    return (
      <Provider store={store}>
        <NavigationContainer theme={globalTheme}>
          <AppTabNav />
        </NavigationContainer>
      </Provider>
    );
  }
}
