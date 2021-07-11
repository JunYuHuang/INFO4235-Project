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
  DeleteButtonWrapper,
  FullImage,
  AnimeDetailsContainer,
  AnimeDetail,
  ArticleBlock,
  BodyText,
  NotesTextInput,
  BottomBackButton,
  BottomBackButtonWrapper,
  ButtonText,
} from "./DetailScreen.styled";
import BackButton from "../components/BackButton";
import LoadingDisplay from "../components/LoadingDisplay";
import useWindowDimensions from "../lib/useWindowDimensions";
import {
  getTextFromGenresArray,
  findAnimeByID,
  getObjectQuantitySuffix,
} from "../lib/jikanAPIHelper";
import { useDispatch, useSelector } from "react-redux";
import {
  selectAnimeDetail,
  setAnimeDetail,
  clearAnimeDetail,
  loadAnimeDetailFromLocal,
  loadAnimeDetailFromAPIAsync,
} from "../redux/animeDetailSlice";
import {
  selectUserDataList,
  clearUserData,
  addUserDataListItem,
  deleteUserDataListItem,
  editUserDataListItemNotes,
} from "../redux/userDataSlice";
import { store } from "../redux/store";

const { getState } = store;

function isAnimeInUserList(userList, id) {
  let found = false;
  if (Array.isArray(userList)) {
    userList.forEach((item) => {
      if (Number(item.id) === Number(id)) {
        found = true;
      }
    });
  }
  return found;
}

export default function DetailScreen({ route, navigation }) {
  const { width } = useWindowDimensions();
  const { spacing, colors } = useTheme();
  const { animeID } = route.params;
  // const animeItem = useSelector(selectAnimeDetail);
  const userList = useSelector(selectUserDataList);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInUserList, setIsInUserList] = useState(
    isAnimeInUserList(userList, animeID)
  );
  const [animeItem, setAnimeItem] = useState({});
  const [userNotes, setUserNotes] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    // TODO: fetch user item
    const { animeID } = route.params;

    findAnimeByID(animeID)
      .then((anime) => {
        setAnimeItem(anime);
        setIsLoaded(true);
        // dispatch(setAnimeDetail(anime));
      })
      .catch((err) => {
        console.log(err);
      });
    // dispatch(loadAnimeDetailFromAPIAsync(animeID));
    // dispatch(loadAnimeDetailFromLocal());

    // console.log("userList:");
    // console.log(userList);
    // setIsInUserList(isAnimeInUserList(userList, animeID));
    // console.log(`Anime is in user's list? ${isInUserList}`);

    return () => {
      setAnimeItem({});
      // dispatch(clearAnimeDetail());
    };
  }, []);

  useEffect(() => {
    console.log("userList:");
    console.log(userList);
    setIsInUserList(isAnimeInUserList(userList, animeID));
    console.log(`Anime is in user's list? ${isInUserList}`);
  }, [userList]);

  const handleAddButton = () => {
    console.log("TODO: Add anime title to local SQLite database!");
    const { mal_id, title, image_url, userNotes } = animeItem;
    dispatch(
      addUserDataListItem({
        id: mal_id,
        title: title,
        imgURL: image_url,
        notes: userNotes,
      })
    );
    console.log(userList);
  };

  const handleDeleteButton = () => {
    console.log("TODO: Remove anime title to local SQLite database!");
    const { mal_id } = animeItem;
    dispatch(deleteUserDataListItem({ id: mal_id }));
    console.log(userList);
  };

  const handleEditButton = () => {
    console.log(
      "TODO: Edit anime title's notes property in local SQLite database!"
    );
  };

  const handleBackButton = () => {
    navigation.goBack();
  };

  const getPreviousScreenName = () => {
    const { prevScreen } = route.params;
    return prevScreen === "SearchScreen" ? "Search" : "Your List";
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        padding: spacing.screenPadding,
        marginBottom: "-32px",
      }}
    >
      {isLoaded ? (
        <ScrollView>
          <HeadingWrapper>
            <BackButton size={24} onPress={handleBackButton} />
            <H1Text>{animeItem.title}</H1Text>
            {isInUserList ? (
              <DeleteButtonWrapper onPress={handleDeleteButton}>
                <Icon
                  name="trash-outline"
                  color={colors.veryDarkBlack}
                  size="24px"
                />
              </DeleteButtonWrapper>
            ) : (
              <AddButtonWrapper onPress={handleAddButton}>
                <Icon
                  name="add-sharp"
                  color={colors.veryDarkBlack}
                  size="28px"
                />
              </AddButtonWrapper>
            )}
          </HeadingWrapper>
          <FullImage
            style={{
              width: width - 64,
              height: (width - 64) * 1.4,
            }}
            source={animeItem.image_url}
          />
          <AnimeDetailsContainer>
            <AnimeDetail>
              <H3Text>Genre{getObjectQuantitySuffix(animeItem.genres)}</H3Text>
              <BodyText>{getTextFromGenresArray(animeItem.genres)}</BodyText>
            </AnimeDetail>
            <AnimeDetail>
              <H3Text>Aired</H3Text>
              <BodyText>{animeItem.aired.string}</BodyText>
            </AnimeDetail>
            <AnimeDetail>
              <H3Text>Episodes</H3Text>
              <BodyText>{animeItem.episodes}</BodyText>
            </AnimeDetail>
            <AnimeDetail>
              <H3Text>User Rating</H3Text>
              <BodyText>{animeItem.score} / 10</BodyText>
            </AnimeDetail>
          </AnimeDetailsContainer>
          <ArticleBlock>
            <H2Text>Synopsis</H2Text>
            <BodyText>{animeItem.synopsis}</BodyText>
          </ArticleBlock>
          <ArticleBlock>
            <H2Text>Your Notes</H2Text>
            <NotesTextInput
              placeholder="Write some notes"
              // defaultValue="This show sucks ass"
              editable={isInUserList}
              multiline
              numberOfLines={10}
            />
          </ArticleBlock>
          <BottomBackButtonWrapper>
            <BottomBackButton onPress={handleBackButton}>
              <BackButton size={24} />
              <ButtonText>Back to {getPreviousScreenName()}</ButtonText>
            </BottomBackButton>
          </BottomBackButtonWrapper>
        </ScrollView>
      ) : (
        <LoadingDisplay />
      )}
    </SafeAreaView>
  );
}
