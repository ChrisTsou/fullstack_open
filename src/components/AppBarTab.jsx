import React from "react";
import { Pressable, StyleSheet } from "react-native";
import Text from "./Text";

const styles = StyleSheet.create({
  tab: {
    padding: 15,
  },
});

const AppBarTab = ({ text }) => {
  return (
    <Pressable style={styles.tab} onPress={() => {}}>
      <Text fontSize="subheading" color="primary">
        {text}
      </Text>
    </Pressable>
  );
};

export default AppBarTab;
