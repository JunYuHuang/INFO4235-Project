import React from "react";
import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import Icon from "react-native-vector-icons/Ionicons";

export default function SettingsScreen({ navigation }) {
  return (
    <SafeAreaView>
      <View>
        <Text>I am Settings Screen</Text>
        <TouchableOpacity onPress={() => navigation.navigate("About")}>
          <Text>About Screen</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

// export default SettingsScreen;
