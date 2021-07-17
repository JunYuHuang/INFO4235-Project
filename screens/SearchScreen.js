import React, { useState, useEffect, useRef } from "react";
import { View } from "react-native";
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
import { ScreenWrapperView } from "../components/ScreenWrapper.styled";
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
  const { colors } = useTheme();
  const [isLoaded, setIsLoaded] = useState(false);
  const [searchText, setSearchText] = useState("");
  const resultListRef = useRef();
  const dispatch = useDispatch();
  const searchResults = useSelector(selectAnimeResults);

  useEffect(() => {
    // temp commented below to avoid abusing JikanAPI on refresh
    // dispatch(loadDefaultAnimeResultsFromAPIAsync())
    //   .unwrap()
    //   .then(() => {
    //     setIsLoaded(true);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });

    dispatch(loadAnimeResultsFromLocal());
    setIsLoaded(true);

    return () => {
      dispatch(clearAnimeResults());
      setIsLoaded(false);
    };
  }, []);

  useEffect(() => {
    // show default anime results
    if (searchText === "") {
      dispatch(loadAnimeResultsFromLocal());
      setIsLoaded(true);
    }
  }, [searchText]);

  const handleClearSearchText = () => {
    setSearchText("");
  };

  const scrollListToTop = () => {
    resultListRef.current.scrollToOffset({ animated: true, offset: 0 });
  };

  const handleSearchSubmitButton = () => {
    if (searchText !== "") {
      dispatch(loadAnimeResultsFromAPIAsync(searchText));
      scrollListToTop();
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
        <ResultListItemImage source={{ uri: item.image_url }} />
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
    <ScreenWrapperView>
      <SearchFormWrapper style={{ width: width - 64 }}>
        <SearchTextInput
          style={{ maxWidth: width - 64 - 130 }}
          placeholder="Search for anime..."
          onChangeText={(text) => setSearchText(text)}
          value={searchText}
          onSubmitEditing={handleSearchSubmitButton}
        />
        {searchText === "" ? (
          <View></View>
        ) : (
          <IconButton onPress={handleClearSearchText}>
            <Icon name="close-outline" color={colors.veryDarkGray} size={27} />
          </IconButton>
        )}
        <IconButton onPress={handleSearchSubmitButton}>
          <Icon name="search-sharp" color={colors.veryDarkGray} size={27} />
        </IconButton>
      </SearchFormWrapper>
      {isLoaded ? (
        <ResultList
          ref={resultListRef}
          data={searchResults}
          renderItem={renderItem}
          keyExtractor={(item) => String(item.mal_id)}
        />
      ) : (
        <LoadingDisplay />
      )}
    </ScreenWrapperView>
  );
}
