import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native";
import { useTheme } from "@react-navigation/native";
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
import LoadingDisplay from "../components/LoadingDisplay";
import useWindowDimensions from "../lib/useWindowDimensions";
import truncate from "truncate";
import {
  getLocalSearchResults,
  getAllCurrentSeasonalAnime,
  findAllAnimeBySearchTerm,
} from "../lib/jikanAPIHelper";

export default function SearchScreen({ navigation }) {
  const { width } = useWindowDimensions();
  const { spacing, colors } = useTheme();
  const [isLoaded, setIsLoaded] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  // TODO: fetch default search results
  // getAllCurrentSeasonalAnime()
  //   .then((results) => {
  //     setSearchResults(results);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });

  // temp commented above to avoid abusing JikanAPI on refresh

  useEffect(() => {
    setSearchResults(getLocalSearchResults);
    setIsLoaded(true);

    return () => {
      setSearchResults([]);
      setIsLoaded(false);
    };
  }, []);

  const handleSearchSubmitButton = () => {
    if (searchText !== "") {
      findAllAnimeBySearchTerm(searchText)
        .then((results) => {
          setSearchResults(results);
          setSearchText("");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const renderItem = ({ item }) => {
    return (
      <ResultListItem
        key={String(item.mal_id)}
        onPress={() =>
          navigation.push("Detail", {
            prevScreen: "SearchScreen",
            animeID: item.mal_id,
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
          value={searchText}
          onSubmitEditing={handleSearchSubmitButton}
        />
        <IconButton onPress={handleSearchSubmitButton}>
          <Icon name="search-sharp" color={colors.veryDarkGray} size="27px" />
        </IconButton>
      </SearchFormWrapper>
      {isLoaded ? (
        <ResultList
          data={searchResults}
          renderItem={renderItem}
          keyExtractor={(item) => String(item.mal_id)}
        />
      ) : (
        <LoadingDisplay />
      )}
    </SafeAreaView>
  );
}
