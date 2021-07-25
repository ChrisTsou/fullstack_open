import React, { useState } from "react";
import { Picker } from "@react-native-picker/picker";
import { StyleSheet, View } from "react-native";
import theme from "../../theme";
import { Ionicons } from "@expo/vector-icons";

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: theme.colors.textSecondary,
  },
});

const RepositoryListHeader = ({ sortState }) => {
  return (
    <View style={styles.headerContainer}>
      <Picker
        selectedValue={sortState.sorting}
        onValueChange={(itemValue) => sortState.setSorting(itemValue)}
      >
        <Picker.Item label="Latest repositories" value="latest" />
        <Picker.Item label="Highest rated repositories" value="highestRated" />
        <Picker.Item label="Lowest rated repositories" value="lowestRated" />
      </Picker>
    </View>
  );
};

export default RepositoryListHeader;
