import React from "react";
import { FlatList, View, StyleSheet } from "react-native";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";
import { useHistory } from "react-router-native";
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
  const history = useHistory();

  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  const onPress = (id) => () => history.push(`/repositories/${id}`);

  return (
    <FlatList
      style={styles.list}
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => (
        <Pressable onPress={onPress(item.id)}>
          <RepositoryListItem item={item} />
        </Pressable>
      )}
    />
  );
};

export default RepositoryListContainer;
