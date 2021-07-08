import React, { useState, useEffect } from "react";
import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import { useTheme } from "@react-navigation/native";
import styled from "styled-components/native";
import Icon from "react-native-vector-icons/Ionicons";
import {
  IconButton,
  SearchFormWrapper,
  SearchTextInput,
  ResultList,
  ResultListItem,
  ResultListItemImage,
  ResultListItemTextWrapper,
  ResultListItemTextHeader,
  ResultListItemTextBody,
} from "./SearchScreen.styled";
import useWindowDimensions from "../lib/useWindowDimensions";
import localSearchData from "../assets/localSearchData.json";
import truncate from "truncate";

// style={{
//   shadowColor: "#000",
//   shadowOffset: {
//     width: 0,
//     height: 5,
//   },
//   shadowOpacity: 0.2,
//   shadowRadius: 1.41,
//   elevation: 3,
// }}

export default function SearchScreen({ navigation }) {
  const { width } = useWindowDimensions();
  const { spacing, colors } = useTheme();
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    // TODO: fetch search results
    setSearchResults(localSearchData.results);
    console.log(searchResults);
  }, []);

  const renderItem = ({ item }) => {
    return (
      <ResultListItem
        key={String(item.mal_id)}
        onPress={() =>
          navigation.navigate("Detail", {
            prevScreen: "SearchScreen",
          })
        }
      >
        <ResultListItemImage source={item.image_url} />
        <ResultListItemTextWrapper style={{ maxWidth: (width - 64) * 0.6 }}>
          <ResultListItemTextHeader>
            {truncate(item.title, 35)}
          </ResultListItemTextHeader>
          <ResultListItemTextBody>
            {truncate(item.synopsis, 110)}
          </ResultListItemTextBody>
        </ResultListItemTextWrapper>
      </ResultListItem>
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
      <SearchFormWrapper style={{ width: width - 64 }}>
        <SearchTextInput
          placeholder="Search for anime..."
          onChangeText={(text) => setSearchText(text)}
          defaultValue={searchText}
        />
        <IconButton>
          <Icon name="search-sharp" color={colors.veryDarkGray} size="27px" />
        </IconButton>
      </SearchFormWrapper>
      <ResultList
        data={searchResults}
        renderItem={renderItem}
        keyExtractor={(item) => String(item.mal_id)}
      />
    </SafeAreaView>
  );
}
