import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useTheme } from "@react-navigation/native";
import styled from "styled-components/native";
import Icon from "react-native-vector-icons/Ionicons";
import {
  List,
  ListItem,
  ListItemImage,
  ListItemText,
} from "./ListScreen.styled";
import localSearchData from "../assets/localSearchData.json";

const window = Dimensions.get("window");

export default function ListScreen({ navigation }) {
  const { spacing, colors } = useTheme();
  const [userList, setUserList] = useState([]);
  const [windowDimensions, setWindowDimensions] = useState({
    width: window.width,
    height: window.height,
  });

  const onChange = ({ window }) => {
    setWindowDimensions({
      width: window.width,
      height: window.height,
    });
  };

  useEffect(() => {
    // dynamically adjust image card dimensions depending on device resolution
    Dimensions.addEventListener("change", onChange);
    return () => {
      Dimensions.removeEventListener("change", onChange);
    };
  });

  useEffect(() => {
    // TODO: fetch user list
    setUserList(localSearchData.results);
    console.log(userList);
  }, []);

  const renderItem = ({ item }) => {
    return (
      <ListItem
        style={{
          width: (windowDimensions.width - 64) * 0.45,
        }}
        onPress={() => navigation.navigate("Detail")}
      >
        <ListItemImage
          source={item.image_url}
          style={{
            width: (windowDimensions.width - 64) * 0.45,
            height: (windowDimensions.width - 64) * 0.45 * 1.4,
          }}
        />
        <ListItemText>{item.title}</ListItemText>
      </ListItem>
    );
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        padding: spacing.screenPadding,
        marginBottom: "-32px",
      }}
    >
      <List
        data={userList}
        numColumns={2}
        renderItem={renderItem}
        keyExtractor={(item) => String(item.mal_id)}
        columnWrapperStyle={{
          justifyContent: "space-between",
        }}
      />
    </SafeAreaView>
  );
}
