import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import Constants from "expo-constants";

import AppBarTab from "./AppBarTab";
import theme from "../theme";
import { useApolloClient, useQuery } from "@apollo/client";
import { GET_AUTHORIZED_USER } from "../graphql/queries";
import useAuthStorage from "../hooks/useAuthStorage";
import { Pressable } from "react-native";

import Text from "./Text";

const styles = StyleSheet.create({
  container: {
    margin: 0,
    padding: 0,
    paddingTop: Constants.statusBarHeight,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    backgroundColor: theme.colors.backgroundSecondary,
  },
  tab: {
    padding: 15,
  },
});

const AppBar = () => {
  const { data } = useQuery(GET_AUTHORIZED_USER);
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();

  const signOut = async () => {
    await authStorage.removeAccessToken();
    apolloClient.resetStore();
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <AppBarTab text="Repositories" path="/" />
        {data?.authorizedUser ? (
          <>
            <AppBarTab text="Create a review" path="/writeReview" />
            <AppBarTab text="My reviews" path="/reviews" />
            <Pressable style={styles.tab} onPress={signOut}>
              <Text color="primary">Sign Out</Text>
            </Pressable>
          </>
        ) : (
          <>
            <AppBarTab text="Sign In" path="/signIn" />
            <AppBarTab text="Sign Up" path="/signUp" />
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;
