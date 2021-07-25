import { useMutation } from "@apollo/client";
import React from "react";

import SignUpFormikContext from "./SignUpFormikContext";
import { SIGN_UP } from "../../graphql/mutations";
import useSignIn from "../../hooks/useSignIn";

const SignUp = () => {
  const [mutate] = useMutation(SIGN_UP);
  const [signIn] = useSignIn();

  const onSubmit = async ({ username, password }) => {
    try {
      const response = await mutate({
        variables: { username, password },
      });

      await signIn({ username, password });
    } catch (e) {
      console.log(e);
    }
  };

  return <SignUpFormikContext onSubmit={onSubmit} />;
};

export default SignUp;
