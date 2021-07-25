import React, { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

import useRepositories from "../../hooks/useRepositories";
import RepositoryListContainer from "./RepositoryListContainer";

const RepositoryList = () => {
  const [sorting, setSorting] = useState("latest");
  const [filter, setFilter] = useState("");
  const [dFilter] = useDebounce(filter, 500);
  const { repositories } = useRepositories(sorting, dFilter);

  return (
    <RepositoryListContainer
      repositories={repositories}
      sortState={{ sorting, setSorting }}
      filterState={{ filter, setFilter }}
    />
  );
};

export default RepositoryList;
