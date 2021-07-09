import React from "react";
import { StyleSheet, Pressable } from "react-native";
import theme from "../theme";
import RepositoryItem from "./RepositoryItem";
import * as Linking from "expo-linking";

import Text from "./Text";
import ItemSeparator from "./ItemSeparator";

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

const RepositorySingleHeader = ({ repository }) => {
  const onPress = () => {
    Linking.openURL(repository?.url);
  };

  return repository ? (
    <>
      <RepositoryItem item={repository} />
      <Pressable style={styles.button} onPress={onPress}>
        <Text fontWeight="bold" color="textTertiary">
          Open in Github
        </Text>
      </Pressable>
      <ItemSeparator />
    </>
  ) : null;
};

export default RepositorySingleHeader;
