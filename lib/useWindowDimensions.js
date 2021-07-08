import { useState, useEffect } from "react";
import { Dimensions } from "react-native";

export default function useWindowDimensions() {
  const window = Dimensions.get("window");

  const [windowDimensions, setWindowDimensions] = useState({
    width: window.width,
    height: window.height,
  });

  const onChange = ({ window }) => {
    setWindowDimensions({
      width: window.width,
      height: window.height,
    });
  };

  useEffect(() => {
    // update dimensions whenever device resolution changes
    Dimensions.addEventListener("change", onChange);
    return () => {
      Dimensions.removeEventListener("change", onChange);
    };
  });

  return windowDimensions;
}
