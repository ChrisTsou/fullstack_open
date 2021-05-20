import React from "react";
import { useParams } from "react-router";

import { Container, Header, Icon } from "semantic-ui-react";
import { updatePatient, useStateValue } from "../state";
import patientService from "../services/patients";

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

  if (!patient?.entries || !patient?.ssn) {
    void fetchPatient();
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
      <p>ssn: {patient.ssn}</p>
      <p>occupation: {patient.occupation}</p>
      <Header as="h3">entries</Header>
      {patient.entries.map((entry) => {
        return (
          <>
            <p>
              {entry.date} {entry.description}
            </p>
            {entry.diagnosisCodes ? (
              <ul>
                {entry.diagnosisCodes.map((code) => (
                  <li key="code">{code}</li>
                ))}
              </ul>
            ) : null}
          </>
        );
      })}
    </Container>
  );
};

export default PatientInfoPage;
