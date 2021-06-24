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
    justifyContent: "flex-start",
    backgroundColor: theme.colors.backgroundSecondary,
  },
  // ...
});

const tabs = [
  { name: "Repositories", path: "/" },
  { name: "Sign In", path: "/signin" },
];

const AppBar = () => {
  return (
    <View style={styles.container}>
      {tabs.map(({ name, path }) => (
        <AppBarTab key={name} text={name} path={path} />
      ))}
    </View>
  );
};

export default AppBar;
