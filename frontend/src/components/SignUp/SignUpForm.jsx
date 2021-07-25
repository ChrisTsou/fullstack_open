import React from "react";
import FormikTextInput from "../FormikTextInput";

import FormTemplate from "../FormTemplate";

const SignUpForm = ({ onSubmit }) => {
  return (
    <FormTemplate submitText={"Sign Up"} onSubmit={onSubmit}>
      <FormikTextInput name="username" placeholder="Username" />
      <FormikTextInput name="password" placeholder="Password" secureTextEntry />
      <FormikTextInput
        name="passwordConfirmation"
        placeholder="Confirm Password"
        secureTextEntry
      />
    </FormTemplate>
  );
};

export default SignUpForm;
