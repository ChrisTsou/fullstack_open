import React from "react";
import peopleService from "../services/peopleService";

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
    notificationState.setNotificationMessage({ message, isAlert });
    setTimeout(() => {
      notificationState.setNotificationMessage(null);
    }, 5000);
  };

  const addPerson = (newPerson) => {
    peopleService
      .create(newPerson)
      .then((createdPerson) => {
        personsState.setPersons(personsState.persons.concat(createdPerson));
        displayNotification(`Added ${createdPerson.name}`);
      })
      .catch((error) => displayNotification(error.response.data.error, true));
  };

  const updatePersonNumber = (newPerson) => {
    const oldPerson = personsState.persons.find(
      (p) => p.name === newPerson.name
    );

    if (window.confirm(`update ${oldPerson.name} number?`)) {
      peopleService
        .updatePerson(oldPerson.id, { ...oldPerson, number: newPerson.number })
        .then((returnedPerson) => {
          personsState.setPersons(
            personsState.persons.map((person) =>
              person.id === returnedPerson.id ? returnedPerson : person
            )
          );
          displayNotification(`Updated ${returnedPerson.name}`, false);
        })
        .catch((error) => displayNotification(error.response.data.error, true));
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
