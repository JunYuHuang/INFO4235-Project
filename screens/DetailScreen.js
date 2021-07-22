import React, { useState, useEffect, useRef } from "react";
import { ScrollView, Keyboard } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useTheme } from "@react-navigation/native";
import {
  HeadingWrapper,
  H1Text,
  H2Text,
  H3Text,
  ActionButtonWrapper,
  ActionButtonWithTextWrapper,
  ActionButtonWithTextWrapperContainer,
  FullImage,
  AnimeDetailsContainer,
  AnimeDetail,
  ArticleBlock,
  BodyText,
  NotesTextInput,
  BottomBackButton,
  BottomBackButtonWrapper,
  ButtonText,
  NotesHeaderWrapper,
} from "./DetailScreen.styled";
import { ScreenWrapperView } from "../components/ScreenWrapper.styled";
import BackButton from "../components/BackButton";
import LoadingDisplay from "../components/LoadingDisplay";
import useWindowDimensions from "../lib/useWindowDimensions";
import {
  getTextFromGenresArray,
  getObjectQuantitySuffix,
} from "../lib/jikanAPIHelper";
import { useDispatch, useSelector } from "react-redux";
import {
  selectAnimeDetail,
  loadAnimeDetailFromAPIAsync,
} from "../redux/animeDetailSlice";
import {
  selectUserDataList,
  addUserDataListItem,
  deleteUserDataListItem,
  editUserDataListItemNotes,
} from "../redux/userDataSlice";
import useDB from "../lib/useDB";

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

function getUserNotes(userList, id) {
  let listItem = { notes: "" };
  if (Array.isArray(userList)) {
    listItem = userList.find((item) => Number(item.id) === Number(id));
  }
  return listItem ? listItem.notes : "";
}

function getNotesTextInputPlaceholder(isEditing = false, isInUserList = false) {
  let text = "Add this anime to your list to get started!";
  if (isInUserList) {
    text = isEditing ? "Write some notes" : "Press 'Edit' to add notes";
  }
  return text;
}

export default function DetailScreen({ route, navigation }) {
  const { width } = useWindowDimensions();
  const { colors } = useTheme();
  const { animeID } = route.params;
  const animeItem = useSelector(selectAnimeDetail);
  const userList = useSelector(selectUserDataList);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInUserList, setIsInUserList] = useState(false);
  const [userNotes, setUserNotes] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const notesTextInputRef = useRef();
  const dispatch = useDispatch();
  const {
    addAnimeToUserList,
    deleteAnimeFromUserList,
    updateAnimeFromUserList,
  } = useDB();

  useEffect(() => {
    // TODO: fetch user item
    const { animeID } = route.params;

    dispatch(loadAnimeDetailFromAPIAsync(animeID))
      .unwrap()
      .then(() => {
        console.log(`isInUserList? ${isInUserList}`);
        setIsLoaded(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    // console.log("userList updated!");
    // console.log(userList);
    if (isAnimeInUserList(userList, animeID)) {
      setIsInUserList(true);
    } else {
      setIsInUserList(false);
    }
    setUserNotes(getUserNotes(userList, animeID));
  }, [userList]);

  useEffect(() => {
    if (isEditing) {
      notesTextInputRef.current.focus();
    } else {
      Keyboard.dismiss();
    }
  }, [isEditing]);

  const handleAddButton = () => {
    const { mal_id, title, image_url, userNotes } = animeItem;
    addAnimeToUserList({
      id: mal_id,
      title: title,
      imgURL: image_url,
      notes: userNotes,
    });
    console.log(userList);
  };

  const handleDeleteButton = () => {
    const { mal_id } = animeItem;
    deleteAnimeFromUserList(mal_id);
  };

  const handleEditButton = () => {
    if (isAnimeInUserList(userList, animeID)) {
      setIsEditing(true);
    } else {
      console.log("Cannot edit notes because anime is not in user's list!");
    }
  };

  const handleSaveButton = () => {
    if (isAnimeInUserList(userList, animeID) && isEditing) {
      updateAnimeFromUserList(animeID, userNotes);
      setIsEditing(false);
    }
    Keyboard.dismiss();
  };

  const handleCancelButton = () => {
    setUserNotes(getUserNotes(userList, animeID));
    setIsEditing(false);
    Keyboard.dismiss();
  };

  const handleBackButton = () => {
    navigation.goBack();
  };

  const getPreviousScreenName = () => {
    const { prevScreen } = route.params;
    return prevScreen === "SearchScreen" ? "Search" : "Your List";
  };

  return (
    <ScreenWrapperView>
      {isLoaded && animeItem !== {} ? (
        <ScrollView keyboardShouldPersistTaps="always">
          <HeadingWrapper>
            <BackButton size={24} onPress={handleBackButton} />
            <H1Text style={{ maxWidth: (width - 64) * 0.7 }}>
              {animeItem.title}
            </H1Text>
            {isInUserList ? (
              <ActionButtonWrapper onPress={handleDeleteButton}>
                <Icon
                  name="trash-outline"
                  color={colors.veryDarkBlack}
                  size={24}
                />
              </ActionButtonWrapper>
            ) : (
              <ActionButtonWrapper onPress={handleAddButton}>
                <Icon name="add-sharp" color={colors.veryDarkBlack} size={28} />
              </ActionButtonWrapper>
            )}
          </HeadingWrapper>
          <FullImage
            style={{
              width: width - 64,
              height: (width - 64) * 1.4,
            }}
            source={{ uri: animeItem.image_url }}
          />
          <AnimeDetailsContainer>
            <AnimeDetail>
              <H3Text>
                Genre
                {getObjectQuantitySuffix(animeItem.genres)
                  ? getObjectQuantitySuffix(animeItem.genres)
                  : ""}
              </H3Text>
              <BodyText>
                {getTextFromGenresArray(animeItem.genres)
                  ? getTextFromGenresArray(animeItem.genres)
                  : "Unknown"}
              </BodyText>
            </AnimeDetail>
            <AnimeDetail>
              <H3Text>Aired</H3Text>
              <BodyText>
                {animeItem.aired.string ? animeItem.aired.string : "Unknown"}
              </BodyText>
            </AnimeDetail>
            <AnimeDetail>
              <H3Text>Episodes</H3Text>
              <BodyText>
                {animeItem.episodes ? animeItem.episodes : "Unknown"}
              </BodyText>
            </AnimeDetail>
            <AnimeDetail>
              <H3Text>User Rating</H3Text>
              <BodyText>
                {animeItem.score ? `${animeItem.score} / 10` : "Not yet rated"}
              </BodyText>
            </AnimeDetail>
          </AnimeDetailsContainer>
          <ArticleBlock>
            <H2Text>Synopsis</H2Text>
            <BodyText>
              {animeItem.synopsis ? animeItem.synopsis : "Unknown"}
            </BodyText>
          </ArticleBlock>
          <ArticleBlock>
            <NotesHeaderWrapper>
              <H2Text>
                Notes{" "}
                {userNotes === getUserNotes(userList, animeID)
                  ? ""
                  : "(Unsaved)"}
              </H2Text>
            </NotesHeaderWrapper>

            {isInUserList &&
              (isEditing ? (
                <ActionButtonWithTextWrapperContainer
                  style={{ width: width - 64 }}
                >
                  <ActionButtonWithTextWrapper
                    style={{ width: (width - 64) * 0.45 }}
                    onPress={handleCancelButton}
                  >
                    <Icon
                      name="close-outline"
                      color={colors.veryDarkBlack}
                      size={24}
                      style={{ paddingTop: 2 }}
                    />
                    <ButtonText style={{ paddingLeft: 8 }}>Cancel</ButtonText>
                  </ActionButtonWithTextWrapper>
                  <ActionButtonWithTextWrapper
                    style={{ marginLeft: 8, width: (width - 64) * 0.45 }}
                    onPress={handleSaveButton}
                  >
                    <Icon
                      name="save-outline"
                      color={colors.veryDarkBlack}
                      size={24}
                      style={{ paddingTop: 2 }}
                    />
                    <ButtonText style={{ paddingLeft: 8 }}>Save</ButtonText>
                  </ActionButtonWithTextWrapper>
                </ActionButtonWithTextWrapperContainer>
              ) : (
                <ActionButtonWithTextWrapperContainer
                  style={{ width: width - 64 }}
                >
                  <ActionButtonWithTextWrapper
                    style={{ width: (width - 64) * 0.45 }}
                    onPress={handleEditButton}
                  >
                    <Icon
                      name="pencil-sharp"
                      color={colors.veryDarkBlack}
                      size={20}
                      style={{ paddingTop: 4, paddingBottom: 2 }}
                    />
                    <ButtonText style={{ paddingLeft: 8 }}>Edit</ButtonText>
                  </ActionButtonWithTextWrapper>
                </ActionButtonWithTextWrapperContainer>
              ))}
            <NotesTextInput
              ref={notesTextInputRef}
              placeholder={getNotesTextInputPlaceholder(
                isEditing,
                isInUserList
              )}
              onChangeText={(text) => setUserNotes(text)}
              value={userNotes}
              editable={isInUserList && isEditing}
              multiline
              numberOfLines={1}
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
    </ScreenWrapperView>
  );
}
