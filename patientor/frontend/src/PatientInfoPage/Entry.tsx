import React from "react";
import { Header, Segment } from "semantic-ui-react";
import { useStateValue } from "../state";
import { Entry as EntryType, HealthCheckRating } from "../types";

interface EntryProps {
  entry: EntryType;
}

const Entry = (props: EntryProps) => {
  const entry = props.entry;
  const [{ diagnoses }] = useStateValue();

  const getDiagnosisInfo = (code: string) => {
    const diagnosis = diagnoses.find((d) => d.code === code);

    if (!diagnosis) return null;

    return (
      <>
        {diagnosis.code}: {diagnosis.name}
      </>
    );
  };

  const healthCheckRatingColor = (rating: HealthCheckRating) => {
    switch (rating) {
      case HealthCheckRating.Healthy:
        return "green";
      case HealthCheckRating.LowRisk:
        return "yellow";
      case HealthCheckRating.HighRisk:
        return "orange";
      case HealthCheckRating.CriticalRisk:
        return "red";
      default:
        throw new Error("unknown health rating value");
    }
  };

  const BaseRender = () => (
    <>
      <Header as="h4">
        {entry.date}: {entry.type}
      </Header>
      <p style={{ color: "grey" }}>{entry.description}</p>
      {entry.diagnosisCodes ? (
        <ul>
          {entry.diagnosisCodes.map((code, index) => (
            <li key={index}>{getDiagnosisInfo(code)}</li>
          ))}
        </ul>
      ) : null}
    </>
  );

  switch (entry.type) {
    case "HealthCheck":
      return (
        <Segment>
          <BaseRender />
          <i
            className="heart icon"
            style={{
              color: `${healthCheckRatingColor(entry.healthCheckRating)}`,
            }}
          ></i>
        </Segment>
      );
    case "OccupationalHealthcare":
      return (
        <Segment>
          <BaseRender />
          {entry.sickLeave ? (
            <p>
              Leave: {entry.sickLeave.startDate} {"->"}{" "}
              {entry.sickLeave.endDate}
            </p>
          ) : null}
        </Segment>
      );
    case "Hospital":
      return (
        <Segment>
          <BaseRender />
          <p>
            Discharge: {entry.discharge.date} <br />
            Criteria: {entry.discharge.criteria}
          </p>
        </Segment>
      );
    default:
      throw new Error("Unknown Entry type");
  }
};

export default Entry;
