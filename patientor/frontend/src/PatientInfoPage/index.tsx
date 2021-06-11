import React, { useEffect } from "react";
import { useParams } from "react-router";

import { Button, Container, Header, Icon } from "semantic-ui-react";
import { addEntry, updatePatient, useStateValue } from "../state";
import patientService from "../services/patients";
import Entry from "./Entry";
import AddEntryModal from "./AddEntryModal";
import { EntryFormValues } from "./AddEntryModal/AddEntryForm";

const PatientInfoPage = () => {
  const { id: patientId } = useParams<{ id: string }>();
  const [{ patients }, dispatch] = useStateValue();
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();

  const openModal = () => setModalOpen(true);
  const closeModal = () => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewEntry = async (values: EntryFormValues) => {
    try {
      const newEntry = await patientService.addEntry(patientId, values);

      dispatch(addEntry(patientId, newEntry));
      closeModal();
    } catch (e) {
      console.error(e.response?.data || "Unknown Error");
      setError(e.response?.data?.error || "Unknown error");
    }
  };

  const patient = patients[patientId];

  const fetchPatient = async () => {
    try {
      const fetchedPatient = await patientService.getOne(patientId);

      void dispatch(updatePatient(fetchedPatient));
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    void fetchPatient();
  }, []);

  if (!patient?.entries || !patient?.ssn) {
    return <p>loading...</p>;
  }

  const genderIcon = () => {
    if (patient.gender === "male") {
      return <Icon name="mars" />;
    } else if (patient.gender === "female") {
      return <Icon name="venus" />;
    } else {
      return `: ${patient.gender}`;
    }
  };

  return (
    <Container>
      <Header as="h2">
        {patient.name} {genderIcon()}
      </Header>
      <p>
        ssn: {patient.ssn} <br />
        occupation: {patient.occupation}
      </p>
      <Header as="h3">entries</Header>
      <AddEntryModal
        modalOpen={modalOpen}
        onClose={closeModal}
        onSubmit={submitNewEntry}
        error={error}
      />
      <Button onClick={openModal}>Add New Entry</Button>
      {patient.entries.map((entry) => (
        <Entry key={entry.id} entry={entry} />
      ))}
    </Container>
  );
};

export default PatientInfoPage;
