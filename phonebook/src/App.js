import React, { useEffect, useState } from "react";
import Filter from "./components/Filter";
import ListNumbers from "./components/ListNumbers";
import Notification from "./components/Notification";
import PersonForm from "./components/PersonForm";
import personsSer from "./services/personsSer";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterString, setFilterString] = useState("");
  const [notificationMessage, setNotificationMessage] = useState(null);

  useEffect(() => {
    personsSer.getAll().then((returnedPersons) => {
      setPersons(returnedPersons);
    });
  }, []);

  const handleDeletion = (personToDelete) => {
    if (window.confirm(`delete ${personToDelete.name} ?`)) {
      personsSer.deletePerson(personToDelete.id).then(() => {
        setPersons(persons.filter((person) => person.id !== personToDelete.id));
      });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notificationMessage={notificationMessage} />
      <h3>Filter</h3>
      <Filter filterString={filterString} setFilterString={setFilterString} />
      <h3>Add new</h3>
      <PersonForm
        nameState={{ newName, setNewName }}
        numberState={{ newNumber, setNewNumber }}
        personsState={{ persons, setPersons }}
        notificationState={{ notificationMessage, setNotificationMessage }}
      />
      <h3>Numbers</h3>
      <ListNumbers
        persons={persons}
        filterString={filterString}
        handleDeletion={handleDeletion}
      />
    </div>
  );
};

export default App;
