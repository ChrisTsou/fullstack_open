import React from "react";
import { StyleSheet } from "react-native";
import { useField } from "formik";

import TextInput from "./TextInput";
import Text from "./Text";

const styles = StyleSheet.create({
  textInput: {
    marginBottom: 10,
    padding: 5,
    paddingLeft: 10,
    borderWidth: 2,
    borderColor: "lightgrey",
    borderRadius: 5,
  },
  errorText: {
    marginBottom: 10,
    color: "red",
  },
});

const FormikTextInput = ({ name, style, ...props }) => {
  const [field, meta, helpers] = useField(name);
  const showError = meta.touched && meta.error;

  return (
    <>
      <TextInput
        onChangeText={(value) => helpers.setValue(value)}
        onBlur={() => helpers.setTouched(true)}
        value={field.value}
        error={showError}
        style={[
          styles.textInput,
          style,
          showError ? { borderColor: "red" } : null,
        ]}
        {...props}
      />
      {showError && <Text style={styles.errorText}>{meta.error}</Text>}
    </>
  );
};

export default FormikTextInput;
