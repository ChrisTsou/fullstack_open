import React from "react";
import { Formik } from "formik";
import * as yup from "yup";

import SignUpForm from "./SignUpForm";

const SignUpFormikContext = ({ onSubmit }) => {
  const initialValues = {
    username: "",
    password: "",
    passwordConfirmation: "",
  };

  const validationSchema = yup.object().shape({
    username: yup
      .string()
      .required("Username is required")
      .min(1, "Minimum Username length is 1")
      .max(30, "Maximum Username length is 30"),
    password: yup
      .string()
      .required("Password is required")
      .min(5, "Minimum password length is 5")
      .max(50, "Maximum password length is 30"),
    passwordConfirmation: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords not matching")
      .required("Password confirm is required"),
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ handleSubmit }) => <SignUpForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default SignUpFormikContext;
