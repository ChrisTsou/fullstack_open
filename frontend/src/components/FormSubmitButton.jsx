import React from "react";
import { StyleSheet, Pressable } from "react-native";

import theme from "../theme";
import Text from "./Text";

const styles = StyleSheet.create({
  submitButton: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    padding: 10,
    borderRadius: 5,
    backgroundColor: theme.colors.primary,
  },
});

const FormSubmitButton = ({ text, onSubmit }) => {
  return (
    <Pressable
      style={styles.submitButton}
      testID="submitButton"
      onPress={onSubmit}
      android_ripple={{ color: theme.colors.backgroundPrimary }}
    >
      <Text color="textTertiary" fontWeight="bold">
        {text}
      </Text>
    </Pressable>
  );
};

export default FormSubmitButton;
