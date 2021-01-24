import React from "react";

function PersonForm({ nameState, numberState, personsState }) {
  const handleNameChange = (event) => nameState.setNewName(event.target.value);
  const handleNumberChange = (event) => numberState.setNewNumber(event.target.value);

  const addPerson = (event) => {
    event.preventDefault();

    personsState.persons.some((e) => e.name === nameState.newName)
      ? window.alert(`${nameState.newName} is already in the phonebook`)
      : personsState.setPersons(personsState.persons.concat({ name: nameState.newName, number: numberState.newNumber }));
  };

  return (
    <div>
      <form>
        <div>
          name: <input onChange={handleNameChange} value={nameState.newName} />
        </div>
        <div>
          number: <input onChange={handleNumberChange} value={numberState.newNumber} />
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
