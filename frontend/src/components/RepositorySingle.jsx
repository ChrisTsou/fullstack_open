import React from "react";
import { StyleSheet, Pressable } from "react-native";
import { useParams } from "react-router-native";
import { useQuery } from "@apollo/client";
import { GET_REPOSITORY } from "../graphql/queries";
import RepositoryListItem from "./RepositoryItem";
import * as Linking from "expo-linking";

import Text from "./Text";
import theme from "../theme";

const styles = StyleSheet.create({
  button: {
    display: "flex",
    alignItems: "center",
    margin: 10,
    padding: 20,
    borderRadius: 5,
    backgroundColor: theme.colors.primary,
  },
});

const RepositorySingle = () => {
  const { id } = useParams();
  const { data } = useQuery(GET_REPOSITORY, {
    variables: {
      id,
    },
  });

  const onPress = () => {
    Linking.openURL(data?.repository.url);
  };

  return data ? (
    <>
      <RepositoryListItem item={data.repository} />
      <Pressable style={styles.button} onPress={onPress}>
        <Text fontWeight="bold" color="textTertiary">
          Open in Github
        </Text>
      </Pressable>
    </>
  ) : null;
};

export default RepositorySingle;
