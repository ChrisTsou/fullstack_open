import React from "react";

const Results = ({ searchText, countries }) => {
  const filteredCountries = countries.filter((country) =>
    country.name.toLowerCase().includes(searchText.toLowerCase())
  );

  if (filteredCountries.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  }

  if (filteredCountries.length === 1) {
    const country = filteredCountries[0];
    return (
      <>
        <h2>{country.name}</h2>
        <p>capital: {country.capital}</p>
        <h3>languages</h3>
        {country.languages.map((lang) => (
          <p>{lang.name}</p>
        ))}
        <img src={country.flag} alt={`the flag of ${country.name}`} />
      </>
    );
  }

  return filteredCountries.map((country) => (
    <p key={country.name}>{country.name}</p>
  ));
};

export default Results;
