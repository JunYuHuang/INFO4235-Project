import React, { useState, useEffect } from "react";
import { View, Text, SafeAreaView, Dimensions } from "react-native";
import styled from "styled-components/native";
import Icon from "react-native-vector-icons/Ionicons";
import { useTheme } from "@react-navigation/native";
import {
  List,
  ListItem,
  ListItemImage,
  ListItemText,
} from "./DetailScreen.styled";
import localSearchData from "../assets/localSearchData.json";

const window = Dimensions.get("window");

export default function DetailScreen({ navigation }) {
  const { spacing, colors } = useTheme();
  const [listItem, setListItem] = useState({});
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
    // TODO: fetch user item
    setListItem(localSearchData.results[0]);
    console.log(listItem);
  }, []);

  const renderItem = ({ item }) => {
    return (
      <ListItem
        style={{
          width: windowDimensions.width - 64,
        }}
        onPress={() => navigation.navigate("Detail")}
      >
        <ListItemImage
          source={item.image_url}
          style={{
            width: windowDimensions.width - 64,
            height: (windowDimensions.width - 64) * 1.4,
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
        data={listItem}
        renderItem={renderItem}
        keyExtractor={(item) => String(item.mal_id)}
        // columnWrapperStyle={{
        //   justifyContent: "space-between",
        // }}
      />
    </SafeAreaView>
  );
}
