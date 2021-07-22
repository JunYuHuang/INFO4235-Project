import React, { useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useTheme } from "@react-navigation/native";
import ListStackNav from "./ListStackNav";
import SearchStackNav from "./SearchStackNav";
import SettingsStackNav from "./SettingsStackNav";
import Icon from "react-native-vector-icons/Ionicons";

const Tab = createBottomTabNavigator();

import useDB from "../lib/useDB";

export default function AppTabNav() {
  const { colors, fontFamily } = useTheme();
  const { initializeDb } = useDB();

  useEffect(() => {
    console.log("AppTabNav: Initializing database.");
    initializeDb();
  }, []);

  return (
    <Tab.Navigator
      initialRouteName="SearchStackNav"
      tabBarOptions={{
        activeTintColor: colors.darkTurquoise,
        inactiveTintColor: colors.darkGray,
        style: {
          height: 90,
          paddingBottom: 25,
          borderTopColor: colors.veryDarkBlack,
          borderTopWidth: 2,
          backgroundColor: "white",
        },
        labelStyle: {
          fontWeight: "bold",
          fontSize: 14,
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
            <Icon name="list-outline" color={color} size={27} />
          ),
        }}
      />
      <Tab.Screen
        name="SearchStackNav"
        component={SearchStackNav}
        options={{
          tabBarLabel: "Search",
          tabBarIcon: ({ color, size }) => (
            <Icon name="search-outline" color={color} size={27} />
          ),
        }}
      />
      <Tab.Screen
        name="SettingsStackNav"
        component={SettingsStackNav}
        options={{
          tabBarLabel: "Settings",
          tabBarIcon: ({ color, size }) => (
            <Icon name="settings-outline" color={color} size={27} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
