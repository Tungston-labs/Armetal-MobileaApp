import styled from "styled-components/native";

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #151D34;
  padding: 24px;
`;

export const Header = styled.View`
  margin-top: 40px;
  margin-bottom: 40px;
`;

export const Title = styled.Text`
  font-size: 30px;
  font-weight: 700;
  color: #ffffff;
`;

export const Subtitle = styled.Text`
  margin-top: 10px;
  font-size: 16px;
  color: #ebf1ed;
  line-height: 24px;
`;

export const CountryCard = styled.TouchableOpacity`
  background-color: #ffffff;
  border-radius: 14px;
  padding: 20px;
  margin-bottom: 18px;
  justify-content: center;
  elevation: 4;
`;

export const CountryName = styled.Text`
  font-size: 18px;
  font-weight: 600;
  color: #000000;
`;