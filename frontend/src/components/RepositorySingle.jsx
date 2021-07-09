import { useQuery } from "@apollo/client";
import React from "react";
import { FlatList } from "react-native";
import { useParams } from "react-router-native";
import { GET_REPOSITORY } from "../graphql/queries";

import ItemSeparator from "./ItemSeparator";
import RepositorySingleHeader from "./RepositorySingleHeader";
import ReviewItem from "./ReviewItem";

const RepositorySingle = () => {
  const { id } = useParams();
  const { data } = useQuery(GET_REPOSITORY, {
    variables: {
      id,
    },
  });

  const repository = data?.repository;
  const reviews = repository?.reviews.edges.map((edge) => edge.node);

  return (
    <FlatList
      ListHeaderComponent={<RepositorySingleHeader repository={repository} />}
      data={reviews}
      keyExtractor={({ id }) => id}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <ReviewItem review={item} />}
    />
  );
};

export default RepositorySingle;
