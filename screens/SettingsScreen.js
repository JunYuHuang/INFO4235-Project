import React from "react";
import { Alert } from "react-native";
import {
  Button,
  ButtonText,
  HeadingText,
  HeadingTextWrapper,
} from "./SettingsScreen.styled";
import { ScreenWrapperView } from "../components/ScreenWrapper.styled";
import useDB from "../lib/useDB";

export default function SettingsScreen({ navigation }) {
  const { deleteAllAnimeFromUserList } = useDB();
  const handleClearButton = () => {
    deleteAllAnimeFromUserList();
    Alert.alert("Notice", "Your list has been deleted!");
  };

  return (
    <ScreenWrapperView>
      <HeadingTextWrapper>
        <HeadingText>Settings</HeadingText>
      </HeadingTextWrapper>
      <Button onPress={handleClearButton}>
        <ButtonText>Clear your data</ButtonText>
      </Button>
      <Button onPress={() => navigation.navigate("About")}>
        <ButtonText>About</ButtonText>
      </Button>
    </ScreenWrapperView>
  );
}
