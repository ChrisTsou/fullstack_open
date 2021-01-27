import React from "react";
import personsSer from "../services/personsSer";

function PersonForm({ nameState, numberState, personsState }) {
  const handleNameChange = (event) => nameState.setNewName(event.target.value);
  const handleNumberChange = (event) =>
    numberState.setNewNumber(event.target.value);

  const addPerson = (event) => {
    event.preventDefault();

    const newPerson = {
      name: nameState.newName,
      number: numberState.newNumber,
    };

    personsSer
      .create(newPerson)
      .then((returnedPerson) =>
        personsState.setPersons(personsState.persons.concat(returnedPerson))
      )
      .catch((error) =>
        window.alert(`${nameState.newName} is already in the phonebook`)
      );
  };

  return (
    <div>
      <form>
        <div>
          name: <input onChange={handleNameChange} value={nameState.newName} />
        </div>
        <div>
          number:{" "}
          <input onChange={handleNumberChange} value={numberState.newNumber} />
        </div>
        <div>
          <button onClick={addPerson} type="submit">
            add
          </button>
        </div>
      </form>
    </div>
  );
}

export default PersonForm;
