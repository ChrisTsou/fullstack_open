import React from "react";
import { FlatList, View, StyleSheet } from "react-native";
import theme from "../theme";
import RepositoryListItem from "./RepositoryItem";

const styles = StyleSheet.create({
  list: {
    margin: 0,
    padding: 0,
  },
  separator: {
    height: 10,
    backgroundColor: theme.colors.textSecondary,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryListContainer = ({ repositories }) => {
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      style={styles.list}
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={RepositoryListItem}
    />
  );
};

export default RepositoryListContainer;
