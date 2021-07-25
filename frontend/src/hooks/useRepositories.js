import { useQuery } from "@apollo/client";
import { GET_REPOSITORIES } from "../graphql/queries";

const useRepositories = (sorting) => {
  const getSortValues = () => {
    switch (sorting) {
      case "latest":
        return {
          orderBy: "CREATED_AT",
          orderDirection: "DESC",
        };
      case "highestRated":
        return {
          orderBy: "RATING_AVERAGE",
          orderDirection: "DESC",
        };
      case "lowestRated":
        return {
          orderBy: "RATING_AVERAGE",
          orderDirection: "ASC",
        };
    }
  };

  const { loading, data, refetch } = useQuery(GET_REPOSITORIES, {
    variables: { ...getSortValues() },
    fetchPolicy: "cache-and-network",
  });

  return {
    repositories: data ? data.repositories : undefined,
    loading,
    refetch,
  };
};

export default useRepositories;
