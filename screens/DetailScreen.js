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
  FullImage,
  AnimeDetailsContainer,
  AnimeDetail,
  ArticleBlock,
  BodyText,
  NotesTextInput,
  BottomBackButton,
  BottomBackButtonWrapper,
  ButtonText,
  ButtonTextSmall,
  NotesHeaderWrapper,
} from "./DetailScreen.styled";
import { ScreenWrapperView } from "../components/ScreenWrapper.styled";
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
  const { spacing, colors } = useTheme();
  const { animeID } = route.params;
  // const animeItem = useSelector(selectAnimeDetail);
  const userList = useSelector(selectUserDataList);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInUserList, setIsInUserList] = useState(false);
  const [animeItem, setAnimeItem] = useState({});
  const [userNotes, setUserNotes] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const notesTextInputRef = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    // TODO: fetch user item
    const { animeID } = route.params;

    findAnimeByID(animeID)
      .then((anime) => {
        setAnimeItem(anime);
        // dispatch(setAnimeDetail(anime));
        setUserNotes(getUserNotes(userList, animeID));
        setIsInUserList(isAnimeInUserList(userList, animeID));
      })
      .then(() => {
        console.log(`isInUserList? ${isInUserList}`);
        setIsLoaded(true);
      })
      .catch((err) => {
        console.log(err);
      });
    // dispatch(loadAnimeDetailFromAPIAsync(animeID));
    // dispatch(loadAnimeDetailFromLocal());

    return () => {
      setAnimeItem({});
      // dispatch(clearAnimeDetail());
    };
  }, []);

  useEffect(() => {
    console.log("userList updated!");
    console.log(userList);
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
      console.log(
        "TODO: Updated anime title's notes property in local SQLite database!"
      );
      dispatch(editUserDataListItemNotes({ id: animeID, notes: userNotes }));
      setIsEditing(false);
    }
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
      {isLoaded ? (
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
                Your Notes{" "}
                {userNotes === getUserNotes(userList, animeID)
                  ? ""
                  : "(Unsaved)"}
              </H2Text>
              {isInUserList &&
                (isEditing ? (
                  <ActionButtonWithTextWrapper onPress={handleSaveButton}>
                    <Icon
                      name="save-outline"
                      color={colors.veryDarkBlack}
                      size={12}
                      style={{ paddingTop: 2 }}
                    />
                    <ButtonTextSmall style={{ paddingLeft: 8 }}>
                      Save
                    </ButtonTextSmall>
                  </ActionButtonWithTextWrapper>
                ) : (
                  <ActionButtonWithTextWrapper onPress={handleEditButton}>
                    <Icon
                      name="pencil-sharp"
                      color={colors.veryDarkBlack}
                      size={12}
                      style={{ paddingTop: 2 }}
                    />
                    <ButtonTextSmall style={{ paddingLeft: 8 }}>
                      Edit
                    </ButtonTextSmall>
                  </ActionButtonWithTextWrapper>
                ))}
            </NotesHeaderWrapper>
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
