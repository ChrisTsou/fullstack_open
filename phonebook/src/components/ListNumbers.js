import React from "react";
import Number from "./Number";

function ListNumbers({ persons, filterString, handleDeletion }) {

  return (
    <div>
      {persons
        .filter((person) =>
          person.name.toLowerCase().includes(filterString.toLowerCase())
        )
        .map((person) => (
          <div key={person.name} >
            <Number person={person} />
            <button onClick={() => handleDeletion(person.id)}>delete entry</button>
          </div>
        ))}
    </div>
  );
}

export default ListNumbers;
