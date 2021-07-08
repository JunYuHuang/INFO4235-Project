import React, { useState, useEffect } from "react";
import { View, Text, SafeAreaView, ScrollView } from "react-native";
import styled from "styled-components/native";
import Icon from "react-native-vector-icons/Ionicons";
import { useTheme } from "@react-navigation/native";
import {
  HeadingWrapper,
  H1Text,
  H2Text,
  H3Text,
  AddButtonWrapper,
  FullImage,
  AnimeDetailsContainer,
  AnimeDetail,
  ArticleBlock,
  BodyText,
  NotesTextInput,
} from "./DetailScreen.styled";
import BackButton from "../components/BackButton";
import useWindowDimensions from "../lib/useWindowDimensions";
import localSearchData from "../assets/localAnimeDetailData.json";

export default function DetailScreen({ route, navigation }) {
  const { width } = useWindowDimensions();
  const { spacing, colors } = useTheme();
  const [animeItem, setAnimeItem] = useState({});

  useEffect(() => {
    // TODO: fetch user item
    setAnimeItem(localSearchData);
    console.log(localSearchData);
  }, []);

  const handleAddButton = () => {
    console.log("TODO: Add anime title to local SQLite database!");
  };

  const handleBackButton = () => {
    const { prevScreen } = route.params;
    let nextRoute = prevScreen === "SearchScreen" ? "Search" : "List";
    navigation.navigate(nextRoute);
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        padding: spacing.screenPadding,
        marginBottom: "-32px",
      }}
    >
      <ScrollView>
        <HeadingWrapper>
          <BackButton size={24} onPress={handleBackButton} />
          <H1Text>{localSearchData.title}</H1Text>
          <AddButtonWrapper>
            <Icon
              name="add-sharp"
              color={colors.veryDarkBlack}
              size="28px"
              onPress={handleAddButton}
            />
          </AddButtonWrapper>
        </HeadingWrapper>
        <FullImage
          style={{
            width: width - 64,
            height: (width - 64) * 1.4,
          }}
          source={localSearchData.image_url}
        />
        <AnimeDetailsContainer>
          <AnimeDetail>
            <H3Text>Aired</H3Text>
            <BodyText>{localSearchData.aired.string}</BodyText>
          </AnimeDetail>
          <AnimeDetail>
            <H3Text>Episodes</H3Text>
            <BodyText>{localSearchData.episodes}</BodyText>
          </AnimeDetail>
          <AnimeDetail>
            <H3Text>User Rating</H3Text>
            <BodyText>{localSearchData.score} / 10</BodyText>
          </AnimeDetail>
        </AnimeDetailsContainer>
        <ArticleBlock>
          <H2Text>Synopsis</H2Text>
          <BodyText>{localSearchData.synopsis}</BodyText>
        </ArticleBlock>
        <ArticleBlock>
          <H2Text>Your Notes</H2Text>
          <NotesTextInput
            placeholder="Write your notes"
            defaultValue="This show sucks ass"
            multiline
            numberOfLines={20}
          />
        </ArticleBlock>
      </ScrollView>
    </SafeAreaView>
  );
}
