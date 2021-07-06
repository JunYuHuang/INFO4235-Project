import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useTheme } from "@react-navigation/native";
import ListStackNav from "./ListStackNav";
import SearchStackNav from "./SearchStackNav";
import SettingsStackNav from "./SettingsStackNav";
import styled from "styled-components/native";
import Icon from "react-native-vector-icons/Ionicons";
import {
  useFonts,
  Montserrat_400Regular,
  Montserrat_500Medium,
} from "@expo-google-fonts/montserrat";

const Tab = createBottomTabNavigator();

export default function AppTabNav() {
  let [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_500Medium,
  });

  const { colors, fontFamily } = useTheme();

  return (
    <Tab.Navigator
      initialRouteName="SearchStackNav"
      tabBarOptions={{
        activeTintColor: colors.darkTurquoise,
        inactiveTintColor: colors.darkGray,
        tabStyle: {},
        style: {
          height: "90px",
          paddingBottom: "25px",
          borderTopColor: colors.veryDarkBlack,
          borderTopWidth: "2px",
          backgroundColor: "white",
        },
        labelStyle: {
          fontWeight: "bold",
          fontSize: 12,
          fontFamily: fontFamily.Montserrat_500Medium,
        },
      }}
    >
      <Tab.Screen
        name="ListStackNav"
        component={ListStackNav}
        options={{
          tabBarLabel: "Your List",
          tabBarIcon: ({ color, size }) => (
            <Icon name="list-outline" color={color} size="27px" />
          ),
        }}
      />
      <Tab.Screen
        name="SearchStackNav"
        component={SearchStackNav}
        options={{
          tabBarLabel: "Search",
          tabBarIcon: ({ color, size }) => (
            <Icon name="search-outline" color={color} size="27px" />
          ),
        }}
      />
      <Tab.Screen
        name="SettingsStackNav"
        component={SettingsStackNav}
        options={{
          tabBarLabel: "Settings",
          tabBarIcon: ({ color, size }) => (
            <Icon name="settings-outline" color={color} size="27px" />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
