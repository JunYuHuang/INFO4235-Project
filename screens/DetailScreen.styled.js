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
  margin-bottom: 10px;
`;

export const AnimeDetail = styled.View`
  margin-bottom: 16px;
  padding-right: 16px;
`;

export const ArticleBlock = styled.View`
  margin-bottom: 16px;
`;

export const ActionButtonWrapper = styled.TouchableOpacity`
  padding-left: 16px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const ActionButtonWithTextWrapper = styled.TouchableOpacity`
  margin-bottom: 10px;
  padding: 3px 10px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-color: #18191f;
  border-width: 2px;
  border-radius: 10px;
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

export const NotesHeaderWrapper = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const NotesTextInput = styled.TextInput`
  font-size: 14px;
  font-family: "Montserrat_400Regular";
  color: #18191f;
  line-height: 28px;
`;

export const BottomBackButtonWrapper = styled.View`
  margin-top: 32px;
  margin-bottom: 32px;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

export const BottomBackButton = styled.TouchableOpacity`
  min-width: 180px;
  max-width: 220px;
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

export const ButtonTextSmall = styled.Text`
  font-size: 14px;
  font-family: "Montserrat_400Regular";
  color: #18191f;
`;
