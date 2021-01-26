import React from "react";

const CountryInfo = ({ country }) => (
  <>
    <h2>{country.name}</h2>
    <p>capital: {country.capital}</p>
    <h3>languages</h3>
    {country.languages.map((lang) => (
      <p key={lang.name}>{lang.name}</p>
    ))}
    <img src={country.flag} alt={`the flag of ${country.name}`} />
  </>
);

export default CountryInfo;
