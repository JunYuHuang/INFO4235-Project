import React, { useState, useEffect } from "react";
import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import { useTheme } from "@react-navigation/native";
import styled from "styled-components/native";
import Icon from "react-native-vector-icons/Ionicons";
import {
  List,
  ListItem,
  ListItemImage,
  ListItemText,
} from "./ListScreen.styled";
import useWindowDimensions from "../lib/useWindowDimensions";
import truncate from "truncate";
import localSearchData from "../assets/localSearchData.json";

export default function ListScreen({ navigation }) {
  const { width } = useWindowDimensions();
  const { spacing, colors } = useTheme();
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    // TODO: fetch user list
    setUserList(localSearchData.results);
    console.log(userList);
  }, []);

  const renderItem = ({ item }) => {
    return (
      <ListItem
        style={{
          width: (width - 64) * 0.45,
        }}
        onPress={() =>
          navigation.navigate("Detail", {
            prevScreen: "ListScreen",
          })
        }
      >
        <ListItemImage
          source={item.image_url}
          style={{
            width: (width - 64) * 0.45,
            height: (width - 64) * 0.45 * 1.4,
          }}
        />
        <ListItemText>{truncate(item.title, 28)}</ListItemText>
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
