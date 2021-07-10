import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native";
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
import useWindowDimensions from "../lib/useWindowDimensions";
import truncate from "truncate";
// import localSearchData from "../assets/localSearchData.json";

export default function ListScreen({ navigation }) {
  const { width } = useWindowDimensions();
  const { spacing, colors } = useTheme();
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    // TODO: fetch user list
    // setUserList(localSearchData.results);
    console.log(userList);

    return () => {
      setUserList([]);
    };
  }, []);

  // onPress={() =>
  //   navigation.navigate("SearchStackNav", {
  //     screen: "Detail",
  //     params: {
  //       prevScreen: "ListScreen",
  //       animeID: item.mal_id,
  //     },
  //   })
  // }

  const renderItem = ({ item }) => {
    return (
      <ListItem
        style={{
          width: (width - 64) * 0.45,
        }}
        onPress={() =>
          navigation.push("Detail", {
            prevScreen: "ListScreen",
            animeID: item.mal_id,
          })
        }
      >
        <ListItemImage
          source={item.image_url}
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
    <SafeAreaView
      style={{
        flex: 1,
        padding: spacing.screenPadding,
        marginBottom: "-32px",
      }}
    >
      {userList.length > 1 ? (
        <List
          data={userList}
          numColumns={2}
          renderItem={renderItem}
          keyExtractor={(item) => String(item.mal_id)}
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
    </SafeAreaView>
  );
}
