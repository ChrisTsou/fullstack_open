import React from "react";
import { Link } from "react-router-native";
import { StyleSheet } from "react-native";

import Text from "./Text";

const styles = StyleSheet.create({
  tab: {
    padding: 15,
  },
});

const AppBarTab = ({ text, path }) => {
  return (
    <Link style={styles.tab} to={path} replace>
      <Text fontSize="subheading" color="primary">
        {text}
      </Text>
    </Link>
  );
};

export default AppBarTab;
