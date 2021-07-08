import styled from "styled-components/native";

export const HeadingWrapper = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 18px;
`;

export const H1Text = styled.Text`
  font-size: 24px;
  font-family: "Montserrat_500Medium";
  font-weight: bold;
  color: #18191f;
`;

export const H2Text = styled.Text`
  font-size: 18px;
  font-family: "Montserrat_500Medium";
  font-weight: bold;
  color: #18191f;
  margin-bottom: 8px;
`;

export const H3Text = styled.Text`
  font-size: 12px;
  font-family: "Montserrat_500Medium";
  font-weight: bold;
  color: #18191f;
`;

export const AnimeDetailsContainer = styled.View`
  margin-top: 16px;
  margin-bottom: 2px;
  // display: flex;
  // flex-direction: row;
  // justify-content: space-between;
  // flex-wrap: wrap;
`;

export const AnimeDetail = styled.View`
  margin-bottom: 16px;
  padding-right: 16px;
  // display: flex;
  // flex-direction: row;
  // justify-content: space-between;
  // flex: 1;
`;

export const ArticleBlock = styled.View`
  margin-bottom: 16px;
`;

export const AddButtonWrapper = styled.TouchableOpacity`
  padding-left: 16px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-item: center;
`;

export const FullImage = styled.Image`
  border-radius: 18px;
  border-color: #18191f;
  border-width: 2px;
`;

export const BodyText = styled.Text`
  font-size: 12px;
  font-family: "Montserrat_400Regular";
  color: #18191f;
`;

export const NotesTextInput = styled.TextInput`
  font-size: 12px;
  font-family: "Montserrat_400Regular";
  color: #18191f;
  outline-color: transparent;
`;
