import styled from "styled-components/native";

export const NotesTextInput = styled.TextInput`
  font-size: 18px;
  font-family: "Montserrat_500Medium";
  color: #18191f;
  outline-color: transparent;
`;

export const List = styled.FlatList`
  // margin-top: calc(61px + 32px);
`;

export const ListItem = styled.TouchableOpacity`
  // margin-bottom: 16px
`;

export const ListItemImage = styled.Image`
  // width: 110px;
  // height: 155px;
  border-radius: 18px;
`;

export const ListItemTextWrapper = styled.View`
  padding-left: 20px;
  max-width: calc(100% - 100px);
  overflow-x: none;
`;

export const ListItemText = styled.Text`
  font-size: 12px;
  font-family: "Montserrat_500Medium";
  font-weight: bold;
  color: #18191f;
  margin-bottom: 8px;
  max-width: calc(100% - 10px);
  overflow: hidden;
  text-overflow: ellipsis;
  whitespace: nowrap;
`;

export const ListItemTextBody = styled.Text`
  font-size: 12px;
  font-family: "Montserrat_400Regular";
  color: #18191f;
  max-width: calc(100% - 20px);
  overflow: none;
  text-overflow: ellipsis;
  whitespace: nowrap;
`;
