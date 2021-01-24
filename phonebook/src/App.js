import React, { useState } from "react";
import ListNumbers from "./components/ListNumbers";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456" },
    { name: "Ada Lovelace", number: "39-44-5323523" },
    { name: "Dan Abramov", number: "12-43-234345" },
    { name: "Mary Poppendieck", number: "39-23-6423122" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterString, setFilterString] = useState("");

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
      <ListNumbers persons={persons} filterString={filterString} />
    </div>
  );
};

export default App;
