import React from "react";

import FormikTextInput from "../FormikTextInput";
import FormTemplate from "../FormTemplate";

const SignInForm = ({ onSubmit }) => {
  return (
    <FormTemplate submitText={"Sign In"} onSubmit={onSubmit}>
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
    </FormTemplate>
  );
};

export default SignInForm;
