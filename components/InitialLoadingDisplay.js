import React from "react";
import { LoadingImage, ImageWrapper } from "./InitialLoadingDisplay.styled";

export default function InitialLoadingDisplay() {
  return (
    <ImageWrapper>
      <LoadingImage source={require("../assets/steins-gate-mayuri.png")} />
    </ImageWrapper>
  );
}
