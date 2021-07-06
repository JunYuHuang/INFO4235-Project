import styled from "styled-components/native";

export const List = styled.FlatList``;

export const ListItem = styled.TouchableOpacity`
  margin-bottom: 32px;
`;

export const ListItemImage = styled.Image`
  border-radius: 18px;
  border-color: #18191f;
  border-width: 2px;
`;

export const ListItemText = styled.Text`
  font-size: 12px;
  font-family: "Montserrat_500Medium";
  font-weight: bold;
  color: #18191f;
  max-width: calc(100%);
  max-height: calc(30px + 8px);
  height: calc(30px + 8px);
  overflow: hidden;
  text-overflow: ellipsis;
  whitespace: nowrap;
  padding-top: 8px;
`;
