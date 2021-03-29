import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { UPDATE_AUTHOR_BIRTH_YEAR } from "../mutations";
import { ALL_AUTHORS } from "../queries";

const SetBirth = () => {
  const [name, setName] = useState("");
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
      variables: { name, setBornTo: Number(year) },
    });

    setName("");
    setYear("");
  };

  return (
    <div>
      <h2>Set Birthyear</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">name: </label>
          <input
            value={name}
            id="name"
            onChange={({ target }) => setName(target.value)}
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
