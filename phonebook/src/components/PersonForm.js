import React from "react";
import personsSer from "../services/personsSer";

const PersonForm = ({
  nameState,
  numberState,
  personsState,
  notificationState,
}) => {
  const handleNameChange = (event) => nameState.setNewName(event.target.value);
  const handleNumberChange = (event) =>
    numberState.setNewNumber(event.target.value);

  const personExists = (personName) =>
    personsState.persons.some((p) => p.name === personName);

  const displayNotification = (message, isAlert) => {
    notificationState.setNotificationMessage({message, isAlert});
    setTimeout(() => {
      notificationState.setNotificationMessage(null);
    }, 5000);
  };

  const addPerson = (newPerson) => {
    personsSer
      .create(newPerson)
      .then((returnedPerson) => {
        personsState.setPersons(personsState.persons.concat(returnedPerson));
        displayNotification(`Added ${returnedPerson.name}`);
      })
      .catch((error) =>
        window.alert(`${nameState.newName} cannot be added`, false)
      );
  };

  const updatePersonNumber = (newPerson) => {
    const oldPerson = personsState.persons.find(
      (p) => p.name === newPerson.name
    );

    if (window.confirm(`update ${oldPerson.name} number?`)) {
      personsSer
        .updatePerson(oldPerson.id, { ...oldPerson, number: newPerson.number })
        .then((returnedPerson) => {
          personsState.setPersons(
            personsState.persons.map((person) =>
              person.id === returnedPerson.id ? returnedPerson : person
            )
          );
          displayNotification(`Updated ${returnedPerson.name}`, false);
        })
        .catch((error) => {
          displayNotification(
            `Information of ${oldPerson.name} has been already been removed from the server`,
            true
          );
          personsState.setPersons(
            personsState.persons.filter((p) => p.name !== oldPerson.name)
          );
        });
    }
  };

  const handleAddPerson = (event) => {
    event.preventDefault();

    const newPerson = {
      name: nameState.newName,
      number: numberState.newNumber,
    };

    personExists(newPerson.name)
      ? updatePersonNumber(newPerson)
      : addPerson(newPerson);
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
          <button onClick={handleAddPerson} type="submit">
            add
          </button>
        </div>
      </form>
    </div>
  );
};

export default PersonForm;
