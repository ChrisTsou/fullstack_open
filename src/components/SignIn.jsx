import { Formik } from "formik";
import React from "react";
import SignInForm from "./SignInForm";

const SignIn = () => {
  const initialValues = {
    username: "",
    password: "",
  };

  const onSubmit = (values) => {
    console.log(values);
  };

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default SignIn;
