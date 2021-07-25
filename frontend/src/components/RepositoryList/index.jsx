import React, { useEffect, useState } from "react";
import useRepositories from "../../hooks/useRepositories";
import RepositoryListContainer from "./RepositoryListContainer";

const RepositoryList = () => {
  const [sorting, setSorting] = useState("latest");
  const { repositories } = useRepositories(sorting);

  return (
    <RepositoryListContainer
      repositories={repositories}
      sortState={{ sorting, setSorting }}
    />
  );
};

export default RepositoryList;
