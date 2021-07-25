import React from "react";
import { View, StyleSheet } from "react-native";
import theme from "../theme";

import FormSubmitButton from "./FormSubmitButton";

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  signInButton: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    padding: 10,
    borderRadius: 5,
    backgroundColor: theme.colors.primary,
  },
});

const FormTemplate = ({ submitText, onSubmit, children }) => {
  return (
    <View style={styles.container}>
      {children}
      <FormSubmitButton text={submitText} onSubmit={onSubmit} />
    </View>
  );
};

export default FormTemplate;
