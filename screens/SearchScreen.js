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
import { useDispatch, useSelector } from "react-redux";
import {
  selectAnimeResults,
  loadDefaultAnimeResultsFromAPIAsync,
  loadAnimeResultsFromLocal,
  loadAnimeResultsFromAPIAsync,
  clearAnimeResults,
} from "../redux/animeResultsSlice";

export default function SearchScreen({ navigation }) {
  const { width } = useWindowDimensions();
  const { spacing, colors } = useTheme();
  const [isLoaded, setIsLoaded] = useState(false);
  const [searchText, setSearchText] = useState("");
  const dispatch = useDispatch();
  const searchResults = useSelector(selectAnimeResults);

  useEffect(() => {
    // temp commented below to avoid abusing JikanAPI on refresh
    // dispatch(loadDefaultAnimeResultsFromAPIAsync());

    dispatch(loadAnimeResultsFromLocal());
    setIsLoaded(true);

    return () => {
      dispatch(clearAnimeResults());
      setIsLoaded(false);
    };
  }, []);

  const handleSearchSubmitButton = () => {
    if (searchText !== "") {
      dispatch(loadAnimeResultsFromAPIAsync(searchText));
      // setSearchText("");
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
