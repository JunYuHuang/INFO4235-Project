import React from "react";
import { useTheme } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";
import { ButtonWrapper } from "./BackButton.styled";

export default function BackButton({ onPress, size }) {
  const { colors } = useTheme();

  return (
    <ButtonWrapper>
      <Icon
        name="arrow-back"
        color={colors.veryDarkBlack}
        size={size ? size : 19}
        onPress={onPress}
      />
    </ButtonWrapper>
  );
}
