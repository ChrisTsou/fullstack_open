import React, { useState, useEffect } from "react";
import ListNumbers from "./components/ListNumbers";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import personsSer from "./services/personsSer";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterString, setFilterString] = useState("");

  useEffect(() => {
    personsSer.getAll().then((returnedPersons) => {
      setPersons(returnedPersons);
    });
  }, []);

  const handleDeletion = (personId) => {
    personsSer.deletePerson(personId).then((returnedPerson) => {
      setPersons(persons.filter((person) => person.id !== personId));
    });
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <h3>Filter</h3>
      <Filter filterString={filterString} setFilterString={setFilterString} />
      <h3>Add new</h3>
      <PersonForm
        nameState={{ newName, setNewName }}
        numberState={{ newNumber, setNewNumber }}
        personsState={{ persons, setPersons }}
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
