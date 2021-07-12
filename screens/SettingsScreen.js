import React from "react";
import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import { useTheme } from "@react-navigation/native";
import styled from "styled-components/native";
import Icon from "react-native-vector-icons/Ionicons";
import {
  Button,
  ButtonText,
  HeadingText,
  HeadingTextWrapper,
} from "./SettingsScreen.styled";
import { useDispatch } from "react-redux";
import { clearUserData } from "../redux/userDataSlice";

export default function SettingsScreen({ navigation }) {
  const { spacing } = useTheme();
  const dispatch = useDispatch();

  const handleClearButton = () => {
    console.log("TODO: Clear local data from SQLite database!");
    dispatch(clearUserData());
  };

  return (
    <SafeAreaView style={{ padding: spacing.screenPadding, marginTop: "0" }}>
      <HeadingTextWrapper>
        <HeadingText>Settings</HeadingText>
      </HeadingTextWrapper>
      <Button onPress={handleClearButton}>
        <ButtonText>Clear your data</ButtonText>
      </Button>
      <Button onPress={() => navigation.navigate("About")}>
        <ButtonText>About</ButtonText>
      </Button>
    </SafeAreaView>
  );
}
