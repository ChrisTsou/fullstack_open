import React, { useState } from "react";
import { useDebounce } from "use-debounce";

import useRepositories from "../../hooks/useRepositories";
import RepositoryListContainer from "./RepositoryListContainer";

const getSortValues = (itemValue) => {
  switch (itemValue) {
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
    default:
      throw new Error("Unknown sorting type");
  }
};

const RepositoryList = () => {
  const [sorting, setSorting] = useState("latest");
  const [filter, setFilter] = useState("");
  const [dFilter] = useDebounce(filter, 500);
  const { repositories, fetchMore } = useRepositories({
    ...getSortValues(sorting),
    searchKeyword: dFilter,
    first: 8,
  });

  const onEndReach = () => {
    fetchMore();
  };

  return (
    <RepositoryListContainer
      repositories={repositories}
      sortState={{ sorting, setSorting }}
      filterState={{ filter, setFilter }}
      onEndReach={onEndReach}
    />
  );
};

export default RepositoryList;
