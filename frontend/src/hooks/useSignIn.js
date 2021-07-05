import { useApolloClient, useMutation } from "@apollo/client";
import { useHistory } from "react-router-native";
import { SIGN_IN } from "../graphql/mutations";
import useAuthStorage from "./useAuthStorage";

const useSignIn = () => {
  const apolloClient = useApolloClient();
  const authStorage = useAuthStorage();
  const history = useHistory();
  const [mutate, result] = useMutation(SIGN_IN);

  const signIn = async ({ username, password }) => {
    const response = await mutate({ variables: { username, password } });
    await authStorage.setAccessToken(response.data.authorize.accessToken);
    apolloClient.resetStore();
    history.push("/");

    return response;
  };

  return [signIn, result];
};

export default useSignIn;
