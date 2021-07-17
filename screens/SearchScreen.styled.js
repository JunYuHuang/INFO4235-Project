import styled from "styled-components/native";

export const IconButton = styled.TouchableOpacity``;

export const SearchFormWrapper = styled.View`
  padding: 14px
  border-color: #18191f;
  border-width: 2px;
  border-radius: 18px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  z-index: 200;
`;

export const SearchTextInput = styled.TextInput`
  font-size: 18px;
  font-family: "Montserrat_500Medium";
  color: #18191f;
  min-width: 200px;
`;

export const ResultList = styled.FlatList`
  margin-top: 32px;
`;

export const ResultListItem = styled.TouchableOpacity`
  margin-bottom: 16px
  padding-bottom: 16px;
  border-bottom-color: #d9d9da;
  border-bottom-width: 2px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
`;

export const ResultListItemImage = styled.Image`
  width: 110px;
  height: 155px;
  border-radius: 18px;
  border-color: #18191f;
  border-width: 2px;
`;

export const ResultListItemTextWrapper = styled.View`
  padding-left: 20px;
`;

export const ResultListItemTextHeader = styled.Text`
  font-size: 14px;
  font-family: "Montserrat_500Medium";
  font-weight: bold;
  color: #18191f;
  margin-bottom: 8px;
`;

export const ResultListItemTextBody = styled.Text`
  font-size: 14px;
  font-family: "Montserrat_400Regular";
  color: #18191f;
`;
