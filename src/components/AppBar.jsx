import React from "react";
import { View, StyleSheet } from "react-native";
import Constants from "expo-constants";
import AppBarTab from "./AppBarTab";
import theme from "../theme";

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: theme.colors.textPrimary,
  },
  // ...
});

const tabs = ["Repositories"];

const AppBar = () => {
  return (
    <View style={styles.container}>
      {tabs.map((tabName) => (
        <AppBarTab key={tabName} text={tabName} />
      ))}
    </View>
  );
};

export default AppBar;
