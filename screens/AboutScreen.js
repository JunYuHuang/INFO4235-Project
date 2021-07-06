import React from "react";
import { View, Text, SafeAreaView } from "react-native";
import { useTheme } from "@react-navigation/native";
import styled from "styled-components/native";
import Icon from "react-native-vector-icons/Ionicons";
import {
  BodyText,
  HeadingText,
  HeadingTextWrapper,
} from "./AboutScreen.styled";
import BackButton from "../components/BackButton";

export default function AboutScreen({ navigation }) {
  const { spacing } = useTheme();

  return (
    <SafeAreaView style={{ padding: spacing.screenPadding }}>
      <HeadingTextWrapper>
        <BackButton onPress={() => navigation.navigate("Settings")} />
        <HeadingText>About</HeadingText>
      </HeadingTextWrapper>
      <BodyText>
        Aniflex is an application designed and developed by Jun Huang and Wilson
        Wong.
      </BodyText>
      <BodyText>&copy; 2021</BodyText>
    </SafeAreaView>
  );
}
