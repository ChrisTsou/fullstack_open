import React from "react";
import { View, StyleSheet } from "react-native";
import theme from "../../theme";

import FormikTextInput from "../FormikTextInput";
import FormSubmitButton from "../FormSubmitButton";

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  submitButton: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    padding: 10,
    borderRadius: 5,
    backgroundColor: theme.colors.primary,
  },
});

const WriteReviewForm = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
      <FormikTextInput name="ownerName" placeholder="Repository Owner Name" />
      <FormikTextInput name="repositoryName" placeholder="Repository Name" />
      <FormikTextInput name="rating" placeholder="Rating" />
      <FormikTextInput multiline name="text" placeholder="Review" />
      <FormSubmitButton text="Create Review" onSubmit={onSubmit} />
    </View>
  );
};

export default WriteReviewForm;
