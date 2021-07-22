import React from "react";
import { useTheme } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";
import {
  EmptyListPageWrapper,
  TextWrapper,
  H1Text,
  BodyText,
  GoToButton,
  ButtonText,
  List,
  ListItem,
  ListItemImage,
  ListItemText,
} from "./ListScreen.styled";
import { ScreenWrapperView } from "../components/ScreenWrapper.styled";
import useWindowDimensions from "../lib/useWindowDimensions";
import truncate from "truncate";
import { useSelector } from "react-redux";
import { selectUserDataList } from "../redux/userDataSlice";

function getArrayLength(array) {
  let length = 0;
  if (Array.isArray(array) || array) {
    length = array.length;
  }
  return length;
}

export default function ListScreen({ navigation }) {
  const { width } = useWindowDimensions();
  const { colors } = useTheme();
  const userList = useSelector(selectUserDataList);

  const renderItem = ({ item }) => {
    return (
      <ListItem
        style={{
          width: (width - 64) * 0.45,
        }}
        onPress={() =>
          navigation.push("Detail", {
            prevScreen: "ListScreen",
            animeID: item.id,
          })
        }
      >
        <ListItemImage
          source={{ uri: item.imgURL }}
          style={{
            width: (width - 64) * 0.45,
            height: (width - 64) * 0.45 * 1.4,
          }}
        />
        <ListItemText>{truncate(item.title, 28)}</ListItemText>
      </ListItem>
    );
  };

  return (
    <ScreenWrapperView>
      {getArrayLength(userList) > 0 ? (
        <List
          data={userList}
          numColumns={2}
          renderItem={renderItem}
          keyExtractor={(item) => String(item.id)}
          columnWrapperStyle={{
            justifyContent: "space-between",
          }}
        />
      ) : (
        <EmptyListPageWrapper>
          <TextWrapper>
            <H1Text>Your List is empty</H1Text>
            <BodyText>Find some anime titles to add to your list.</BodyText>
          </TextWrapper>
          <GoToButton
            onPress={() =>
              navigation.navigate("SearchStackNav", { screen: "Search" })
            }
          >
            <Icon
              name="search-sharp"
              color={colors.veryDarkBlack}
              size={24}
              style={{ paddingRight: 16 }}
            />
            <ButtonText>Go to Search</ButtonText>
          </GoToButton>
        </EmptyListPageWrapper>
      )}
    </ScreenWrapperView>
  );
}
