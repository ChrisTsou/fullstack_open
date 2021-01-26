import React from "react";

const Searchbar = ({ searchText, setSearchText, setShowSpecific }) => {
  const handleSearchChange = (event) => {
    setShowSpecific("");
    setSearchText(event.target.value);
  };

  return (
    <p>
      find coutries{" "}
      <input onChange={handleSearchChange} type="text" value={searchText} />
    </p>
  );
};

export default Searchbar;
