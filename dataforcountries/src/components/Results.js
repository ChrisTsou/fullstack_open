import React from "react";
import CountryInfo from "./CountryInfo";

const Results = ({ searchText, countries, showSpecific, setShowSpecific }) => {
  const filteredCountries = countries.filter((country) =>
    country.name.toLowerCase().includes(searchText.toLowerCase())
  );

  if (showSpecific !== "") {
    return (
      <CountryInfo
        country={filteredCountries.find((c) => c.name === showSpecific)}
      />
    );
  }

  if (filteredCountries.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  }

  if (filteredCountries.length === 1) {
    return <CountryInfo country={filteredCountries[0]} />;
  }

  return filteredCountries.map((country) => (
    <div key={country.name}>
      <p>{country.name}</p>
      <button onClick={() => setShowSpecific(country.name)}>show</button>
    </div>
  ));
};

export default Results;
