import React from "react";
import { useTheme } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";
import { ButtonWrapper } from "./BackButton.styled";

export default function BackButton({ onPress }) {
  const { colors } = useTheme();

  return (
    <ButtonWrapper>
      <Icon
        name="arrow-back"
        color={colors.veryDarkBlack}
        size="19px"
        onPress={onPress}
      />
    </ButtonWrapper>
  );
}
