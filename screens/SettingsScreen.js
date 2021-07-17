import React from "react";
import {
  Button,
  ButtonText,
  HeadingText,
  HeadingTextWrapper,
} from "./SettingsScreen.styled";
import { ScreenWrapperView } from "../components/ScreenWrapper.styled";
import { useDispatch } from "react-redux";
import { clearUserData } from "../redux/userDataSlice";

export default function SettingsScreen({ navigation }) {
  const dispatch = useDispatch();

  const handleClearButton = () => {
    console.log("TODO: Clear local data from SQLite database!");
    dispatch(clearUserData());
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
