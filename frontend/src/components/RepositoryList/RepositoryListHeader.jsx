import React, { useState } from "react";
import { Picker } from "@react-native-picker/picker";
import { StyleSheet, TextInput, View } from "react-native";
import theme from "../../theme";

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: theme.colors.textSecondary,
  },
  filter: {
    height: 40,
    margin: 10,
    marginBottom: 0,
    padding: 5,
    paddingLeft: 10,
    backgroundColor: "white",
    borderRadius: 5,
    fontSize: 25,
  },
  picker: {
    marginTop: 0,
  },
});

const RepositoryListHeader = ({ sortState, filterState }) => {
  return (
    <View style={styles.headerContainer}>
      <TextInput
        style={styles.filter}
        value={filterState.filter}
        onChangeText={(text) => filterState.setFilter(text)}
        placeholder="Filter"
      />
      <Picker
        style={styles.picker}
        selectedValue={sortState.sorting}
        onValueChange={(itemValue) =>
          sortState.setSorting(getSortValues(itemValue))
        }
      >
        <Picker.Item label="Latest repositories" value="latest" />
        <Picker.Item label="Highest rated repositories" value="highestRated" />
        <Picker.Item label="Lowest rated repositories" value="lowestRated" />
      </Picker>
    </View>
  );
};

export default RepositoryListHeader;
