import React from "react";
import { FlatList, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { getBaseUrl } from "../../config/api";

import {
  Container,
  Header,
  Title,
  Subtitle,
  CountryCard,
  CountryName,
} from "./style";

const countries = [
  {
    name: "India",
    code: "IN",
  },
  {
    name: "United Arab Emirates",
    code: "AE",
  },
  {
    name: "United States",
    code: "US",
  },
];

const CountrySelection = () => {
  const navigation = useNavigation();

  const handleSelectCountry = (country) => {
    const baseUrl = getBaseUrl(country.code);

    console.log("Selected Country:", country.code);
    console.log("Base URL:", baseUrl);

    if (!baseUrl) {
      Alert.alert(
        "Configuration Error",
        `No Base URL found for ${country.code}`
      );
      return;
    }

    navigation.navigate("LoginScreen", {
      countryCode: country.code,
      baseUrl: baseUrl,
    });
  };

  return (
    <Container>
      <Header>
        <Title>Select Your Country</Title>
        <Subtitle>
          Please choose your country to continue.
        </Subtitle>
      </Header>

      <FlatList
        data={countries}
        keyExtractor={(item) => item.code}
        renderItem={({ item }) => (
          <CountryCard onPress={() => handleSelectCountry(item)}>
            <CountryName>{item.name}</CountryName>
          </CountryCard>
        )}
        showsVerticalScrollIndicator={false}
      />
    </Container>
  );
};

export default CountrySelection;