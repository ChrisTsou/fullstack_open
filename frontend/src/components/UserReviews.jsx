import React from "react";
import { GET_AUTHORIZED_USER } from "../graphql/queries";
import { FlatList } from "react-native";
import { useQuery } from "@apollo/client";

import ItemSeparator from "./ItemSeparator";
import ReviewItem from "./ReviewItem";

const UserReviews = () => {
  const { data } = useQuery(GET_AUTHORIZED_USER, {
    fetchPolicy: "cache-and-network",
    variables: {
      includeReviews: true,
    },
  });

  const user = data?.authorizedUser;
  const reviewNodes = user?.reviews.edges.map((edge) => edge.node);

  return (
    <FlatList
      data={reviewNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <ReviewItem review={item} />}
    />
  );
};

export default UserReviews;
