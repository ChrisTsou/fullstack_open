import React from "react";
import { View, StyleSheet } from "react-native";
import theme from "../../theme";

import FormikTextInput from "../FormikTextInput";
import FormSubmitButton from "../FormSubmitButton";

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

const SignInForm = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
      <FormikTextInput
        testID="usernameField"
        name="username"
        placeholder="Username"
      />
      <FormikTextInput
        testID="passwordField"
        name="password"
        placeholder="Password"
        secureTextEntry
      />
      <FormSubmitButton text="Sign In" onSubmit={onSubmit} />
    </View>
  );
};

export default SignInForm;
