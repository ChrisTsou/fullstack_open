import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { UPDATE_AUTHOR_BIRTH_YEAR } from "../mutations";
import { ALL_AUTHORS } from "../queries";
import Select from "react-select";

const SetBirth = ({ authorNames }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [year, setYear] = useState("");

  const [setBirthYear] = useMutation(UPDATE_AUTHOR_BIRTH_YEAR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: (error) => {
      console.log(error.graphQLErrors[0].message);
    },
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    setBirthYear({
      variables: { name: selectedOption.value, setBornTo: Number(year) },
    });

    setSelectedOption(null);
    setYear("");
  };

  const selectOptions = authorNames.map((name) => {
    return {
      value: name,
      label: name,
    };
  });

  return (
    <div>
      <h2>Set Birthyear</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <Select
            value={selectedOption}
            onChange={setSelectedOption}
            options={selectOptions}
          />
        </div>
        <div>
          <label htmlFor="year">year: </label>
          <input
            type="number"
            value={year}
            id="year"
            onChange={({ target }) => setYear(target.value)}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  );
};

export default SetBirth;
