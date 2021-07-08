import React from "react";

import useSignIn from "../hooks/useSignIn";
import SignInFormikContext from "./SignInFormikContext";

const SignIn = () => {
  const [signIn] = useSignIn();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      const { data } = await signIn({ username, password });
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  };

  return <SignInFormikContext onSubmit={onSubmit} />;
};

export default SignIn;
