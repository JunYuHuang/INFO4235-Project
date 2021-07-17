import React from "react";
import {
  BodyText,
  HeadingText,
  HeadingTextWrapper,
} from "./AboutScreen.styled";
import BackButton from "../components/BackButton";
import { ScreenWrapperView } from "../components/ScreenWrapper.styled";

export default function AboutScreen({ navigation }) {
  return (
    <ScreenWrapperView>
      <HeadingTextWrapper>
        <BackButton onPress={() => navigation.navigate("Settings")} />
        <HeadingText>About</HeadingText>
      </HeadingTextWrapper>
      <BodyText>
        Aniflex is an application designed and developed by Jun Huang and Wilson
        Wong.
      </BodyText>
      <BodyText>&copy; 2021</BodyText>
    </ScreenWrapperView>
  );
}
