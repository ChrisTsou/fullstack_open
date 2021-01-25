import React, { useState, useEffect } from "react";
import axios from "axios";
import Searchbar from "./Searchbar";
import Results from './Results';

const App = () => {
  const [searchText, setSearchText] = useState("");
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all").then((res) => {
      setCountries(res.data)
    });
  }, []);

  return (
    <div>
      <Searchbar searchText={searchText} setSearchText={setSearchText} />
      <Results searchText={searchText} countries={countries} />
    </div>
  );
};

export default App;
