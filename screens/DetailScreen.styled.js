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
  line-height: 28px;
  font-weight: bold;
  color: #18191f;
  margin-bottom: 10px;
`;

export const H3Text = styled.Text`
  font-size: 14px;
  font-family: "Montserrat_500Medium";
  font-weight: bold;
  color: #18191f;
`;

export const AnimeDetailsContainer = styled.View`
  margin-top: 16px;
  margin-bottom: 2px;
`;

export const AnimeDetail = styled.View`
  margin-bottom: 16px;
  padding-right: 16px;
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
  font-size: 14px;
  font-family: "Montserrat_400Regular";
  line-height: 28px;
  color: #18191f;
`;

export const NotesTextInput = styled.TextInput`
  font-size: 14px;
  font-family: "Montserrat_400Regular";
  color: #18191f;
  outline-color: transparent;
  line-height: 28px;
`;

export const BottomBackButtonWrapper = styled.View`
  margin-bottom: 32px;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

export const BottomBackButton = styled.TouchableOpacity`
  width: 200px;
  padding: 14px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-color: #18191f;
  border-width: 2px;
  border-radius: 18px;
`;

export const ButtonText = styled.Text`
  font-size: 16px;
  font-family: "Montserrat_400Regular";
  color: #18191f;
`;
