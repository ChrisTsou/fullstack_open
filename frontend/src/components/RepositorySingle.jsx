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

  const variables = {
    first: 5,
    id,
  };

  const { loading, data, fetchMore } = useQuery(GET_REPOSITORY, {
    fetchPolicy: "cache-and-network",
    variables,
  });

  const repository = data?.repository;
  const reviews = repository?.reviews.edges.map((edge) => edge.node);

  const handleFetchMore = () => {
    const canFetchMore =
      !loading && data?.repository.reviews.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data.repository.reviews.pageInfo.endCursor,
        ...variables,
      },
    });
  };

  return (
    <FlatList
      ListHeaderComponent={<RepositorySingleHeader repository={repository} />}
      data={reviews}
      keyExtractor={({ id }) => id}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <ReviewItem review={item} />}
      onEndReached={handleFetchMore}
      onEndReachedThreshold={0.5}
    />
  );
};

export default RepositorySingle;
