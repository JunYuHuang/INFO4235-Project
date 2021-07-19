import React, { useRef, useEffect } from "react";
import { Animated, Easing } from "react-native";
import { useTheme } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";
import { Wrapper } from "./LoadingDisplay.styled";

function SpinningView(props) {
  const spinningAnimation = useRef(new Animated.Value(0)).current;
  const spinningDegrees = useRef(
    spinningAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: ["0deg", "360deg"],
    })
  ).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(spinningAnimation, {
        toValue: 1,
        duration: 5000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, [spinningAnimation]);

  return (
    <Animated.View
      style={{
        paddingLeft: 3,
        ...props.style,
        transform: [{ rotate: spinningDegrees }],
      }}
    >
      {props.children}
    </Animated.View>
  );
}

export default function LoadingDisplay() {
  const { colors } = useTheme();

  return (
    <Wrapper>
      <SpinningView>
        <Icon
          name="refresh-circle-outline"
          color={colors.veryDarkBlack}
          size={50}
        />
      </SpinningView>
    </Wrapper>
  );
}
