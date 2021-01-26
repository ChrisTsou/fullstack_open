import React, { useEffect, useState } from "react";
import axios from "axios";

const CountryInfo = ({ country }) => {
  const [weatherData, setWeatherData] = useState({
    temperature: "",
    wind_speed: 0,
    wind_dir: "",
  });

  const params = {
    access_key: process.env.REACT_APP_WEATHER_API_KEY,
    query: `${country.capital}`,
  };

  useEffect(() => {
    axios
      .get("http://api.weatherstack.com/current", { params })
      .then((response) => {
        const dr = response.data.current;

        setWeatherData({
          temperature: dr.temperature,
          wind_speed: dr.wind_speed,
          wind_dir: dr.wind_dir,
        });
      });
  }, []);

  return (
    <>
      <h2>{country.name}</h2>
      <p>capital: {country.capital}</p>
      <h3>languages</h3>
      {country.languages.map((lang) => (
        <p key={lang.name}>{lang.name}</p>
      ))}
      <img src={country.flag} alt={`the flag of ${country.name}`} />
      <h3>Weather in {country.capital}</h3>
      <p>temperature: {weatherData.temperature}℃ </p>
      <p>
        wind: {weatherData.wind_speed} mph direction {weatherData.wind_dir}
      </p>
    </>
  );
};

export default CountryInfo;
