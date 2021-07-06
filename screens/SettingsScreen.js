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

export default function SettingsScreen({ navigation }) {
  const { spacing } = useTheme();

  return (
    <SafeAreaView style={{ padding: spacing.screenPadding, marginTop: "0" }}>
      <HeadingTextWrapper>
        <HeadingText>Settings</HeadingText>
      </HeadingTextWrapper>
      <Button
        onPress={() =>
          console.log("TODO: Clear local data from SQLite database!")
        }
      >
        <ButtonText>Clear your data</ButtonText>
      </Button>
      <Button onPress={() => navigation.navigate("About")}>
        <ButtonText>About</ButtonText>
      </Button>
    </SafeAreaView>
  );
}
