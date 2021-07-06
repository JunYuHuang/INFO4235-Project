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
  position: absolute;
  width: calc(100% - 64px);
  z-index: 200;
`;

export const SearchTextInput = styled.TextInput`
  font-size: 18px;
  font-family: "Montserrat_500Medium";
  color: #18191f;
  outline-color: transparent;
`;

export const ResultList = styled.FlatList`
  margin-top: calc(61px + 32px);
`;

export const ResultListItem = styled.TouchableOpacity`
  margin-bottom: 16px
  padding-bottom: 16px;
  border-bottom-color: #d9d9da;
  border-bottom-width: 2px;
  display: flex;
  flex-direction: row;
  justify-content: start;
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
  max-width: calc(100% - 100px);
  overflow-x: none;
`;

export const ResultListItemTextHeader = styled.Text`
  font-size: 12px;
  font-family: "Montserrat_500Medium";
  font-weight: bold;
  color: #18191f;
  margin-bottom: 8px;
  max-width: calc(100% - 10px);
  max-height: 30px;
  overflow: hidden;
  text-overflow: ellipsis;
  whitespace: nowrap;
`;

export const ResultListItemTextBody = styled.Text`
  font-size: 12px;
  font-family: "Montserrat_400Regular";
  color: #18191f;
  max-width: calc(100% - 20px);
  overflow: none;
  text-overflow: ellipsis;
  whitespace: nowrap;
`;
