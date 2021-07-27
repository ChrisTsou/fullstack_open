import React from "react";
import { StyleSheet, View } from "react-native";
import { Switch, Route, Redirect } from "react-router-native";

import RepositoryList from "./RepositoryList";
import AppBar from "./AppBar";
import SignIn from "./SignIn";
import RepositorySingle from "./RepositorySingle";
import WriteReview from "./WriteReview";
import SignUp from "./SignUp";
import UserReviews from "./UserReviews";

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
  },
  separator: {
    height: 20,
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Switch>
        <Route path="/" exact>
          <RepositoryList />
        </Route>
        <Route path="/repositories/:id">
          <RepositorySingle />
        </Route>
        <Route path="/writeReview">
          <WriteReview />
        </Route>
        <Route path="/signIn">
          <SignIn />
        </Route>
        <Route path="/signUp">
          <SignUp />
        </Route>
        <Route path="/reviews">
          <UserReviews />
        </Route>
        <Redirect to="/" />
      </Switch>
    </View>
  );
};

export default Main;
