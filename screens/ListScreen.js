import React from "react";
import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import Icon from "react-native-vector-icons/Ionicons";

export default function ListScreen({ navigation }) {
  return (
    <SafeAreaView>
      <View>
        <Text>I am List Screen</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Detail")}>
          <Text>Detail Screen</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
