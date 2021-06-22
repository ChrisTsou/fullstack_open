import React from "react";
import { View, StyleSheet } from "react-native";
import Constants from "expo-constants";
import AppBarTab from "./AppBarTab";
import theme from "../theme";

const styles = StyleSheet.create({
  container: {
    margin: 0,
    padding: 0,
    paddingTop: Constants.statusBarHeight,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: theme.colors.backgroundSecondary,
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
