import React from "react";
import { FlatList, StyleSheet } from "react-native";
import { Pressable } from "react-native";
import { useHistory } from "react-router-native";

import ItemSeparator from "../ItemSeparator";
import RepositoryItem from "../RepositoryItem";
import RepositoryListHeader from "./RepositoryListHeader";

const styles = StyleSheet.create({
  list: {
    margin: 0,
    padding: 0,
  },
});

const RepositoryListContainer = ({
  repositories,
  sortState,
  filterState,
  onEndReach,
}) => {
  const history = useHistory();

  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  const onPress = (id) => () => history.push(`/repositories/${id}`);

  return (
    <FlatList
      ListHeaderComponent={
        <RepositoryListHeader sortState={sortState} filterState={filterState} />
      }
      style={styles.list}
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
      renderItem={({ item }) => (
        <Pressable onPress={onPress(item.id)}>
          <RepositoryItem item={item} />
        </Pressable>
      )}
    />
  );
};

export default RepositoryListContainer;
