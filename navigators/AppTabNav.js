import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import ListStackNav from "./ListStackNav";
// import SearchStackNav from "./ListStackNav";
import SettingsStackNav from "./SettingsStackNav";
// import styled from "styled-components/native";
import Icon from "react-native-vector-icons/Ionicons";

import SettingsScreen from "../screens/SettingsScreen";

const Tab = createBottomTabNavigator();

export default function AppTabNav() {
  return (
    <Tab.Navigator
      initialRouteName="SettingsStackNav"
      tabBarOptions={{ activeTintColor: "#18191f" }}
    >
      <Tab.Screen
        name="SettingsStackNav"
        component={SettingsStackNav}
        options={{
          tabBarLabel: "Settings",
          tabBarIcon: ({ color, size }) => (
            <Icon name="settings-outline" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

// {
//   /* <Tab.Screen
//         name="ListStackNav"
//         component={ListStackNav}
//         options={{
//           tabBarLabel: "List",
//           tabBarIcon: ({ color, size }) => (
//             <Icon name="list-outline" color={color} size={size} />
//           ),
//         }}
//       />
//       <Tab.Screen
//         name="SearchStackNav"
//         component={SearchStackNav}
//         options={{
//           tabBarLabel: "Search",
//           tabBarIcon: ({ color, size }) => (
//             <Icon name="search-outline" color={color} size={size} />
//           ),
//         }}
//       /> */
// }
