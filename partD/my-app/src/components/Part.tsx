import React, { Fragment } from "react";
import { CoursePart } from "../types";

interface PartProps {
  coursePart: CoursePart;
}

const Part = (props: PartProps) => {
  const part = props.coursePart;

  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled descriminated union member: ${JSON.stringify(value)}`
    );
  };

  const partTypeRender = () => {
    switch (part.type) {
      case "normal":
        return <p>{part.description}</p>;
      case "groupProject":
        return <p>project exercises {part.groupProjectCount}</p>;
      case "submission":
        return (
          <>
            {part.description} <br />
            submit to {part.exerciseSubmissionLink}
          </>
        );
      case "special":
        return (
          <>
            {part.description} <br />
            required skills: {part.requirements.join()}
          </>
        );
      default:
        assertNever(part);
    }
  };

  return (
    <>
      <h4>
        {part.name} {part.exerciseCount}
      </h4>
      {partTypeRender()}
    </>
  );
};

export default Part;
