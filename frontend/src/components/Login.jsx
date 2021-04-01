import React, { useEffect, useState } from "react";
import { useApolloClient, useMutation } from "@apollo/client";
import { LOGIN } from "../mutations";
import { ME } from "../queries";

const Login = ({ show, setToken }) => {
  const client = useApolloClient();
  const [login, result] = useMutation(LOGIN);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value;
      setToken(token);
      localStorage.setItem("user-token", token);
      client.query({
        query: ME,
        fetchPolicy: "network-only",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result.data]);

  const submit = async (event) => {
    event.preventDefault();

    login({ variables: { username, password } });
    setUsername("");
    setPassword("");
  };

  if (!show) {
    return null;
  }

  return (
    <form onSubmit={submit}>
      <div>
        <label htmlFor="username">username: </label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        <label htmlFor="password">password: </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="sumbit">login</button>
    </form>
  );
};

export default Login;
