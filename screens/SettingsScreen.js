import React from "react";
import {
  Button,
  ButtonText,
  HeadingText,
  HeadingTextWrapper,
} from "./SettingsScreen.styled";
import { ScreenWrapperView } from "../components/ScreenWrapper.styled";
import { deleteAllAppData } from "../lib/appDataHelper";

export default function SettingsScreen({ navigation }) {
  const handleClearButton = () => {
    console.log("Clear local data from SQLite database!");
    deleteAllAppData();
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
