import React from "react";
import { View, StyleSheet } from "react-native";
import theme from "../theme";
import { Pressable } from "react-native";
import Text from "./Text";

import FormikTextInput from "./FormikTextInput";

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  textInput: {
    marginBottom: 10,
    padding: 5,
    paddingLeft: 10,
    borderWidth: 2,
    borderColor: "lightgrey",
    borderRadius: 5,
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

const SignInForm = (props) => {
  return (
    <View style={styles.container}>
      <FormikTextInput
        style={styles.textInput}
        name="username"
        placeholder="Username"
      />
      <FormikTextInput
        style={styles.textInput}
        name="password"
        placeholder="Password"
        secureTextEntry
      />
      <Pressable
        style={[styles.container, styles.signInButton]}
        onPress={props.onSubmit}
        android_ripple={{ color: theme.colors.backgroundPrimary }}
      >
        <Text color="textTertiary" fontWeight="bold">
          Sign In
        </Text>
      </Pressable>
    </View>
  );
};

export default SignInForm;
