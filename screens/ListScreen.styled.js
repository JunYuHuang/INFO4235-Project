import styled from "styled-components/native";

export const EmptyListPageWrapper = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;
`;

export const TextWrapper = styled.View`
  margin-bottom: 32px;
`;

export const H1Text = styled.Text`
  font-size: 24px;
  font-family: "Montserrat_500Medium";
  font-weight: bold;
  color: #18191f;
  margin-bottom: 9px;
`;

export const BodyText = styled.Text`
  font-size: 14px;
  font-family: "Montserrat_400Regular";
  line-height: 28px;
  color: #18191f;
`;

export const GoToButton = styled.TouchableOpacity`
  min-width: 100px;
  max-width: 180px;
  padding: 14px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-color: #18191f;
  border-width: 2px;
  border-radius: 18px;
  align-self: center;
`;

export const ButtonText = styled.Text`
  font-size: 16px;
  font-family: "Montserrat_400Regular";
  color: #18191f;
`;

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
  font-size: 14px;
  font-family: "Montserrat_500Medium";
  font-weight: bold;
  color: #18191f;
  padding-top: 8px;
`;
