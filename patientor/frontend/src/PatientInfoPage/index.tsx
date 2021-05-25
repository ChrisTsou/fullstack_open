import React, { useEffect } from "react";
import { useParams } from "react-router";

import { Container, Header, Icon } from "semantic-ui-react";
import { updatePatient, useStateValue } from "../state";
import patientService from "../services/patients";
import Entry from "./Entry";

const PatientInfoPage = () => {
  const { id: patientId } = useParams<{ id: string }>();
  const [{ patients }, dispatch] = useStateValue();

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
      {patient.entries.map((entry) => (
        <Entry key={entry.id} entry={entry} />
      ))}
    </Container>
  );
};

export default PatientInfoPage;
