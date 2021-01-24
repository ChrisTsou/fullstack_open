import React from "react";
import Number from "./Number";

function ListNumbers({ persons, filterString }) {
  return (
    <div>
      {persons
        .filter((person) =>
          person.name.toLowerCase().includes(filterString.toLowerCase())
        )
        .map((person) => (
          <Number key={person.name} person={person} />
        ))}
    </div>
  );
}

export default ListNumbers;
