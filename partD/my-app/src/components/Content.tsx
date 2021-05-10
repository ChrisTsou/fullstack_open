import React from "react";
import { CourseParts } from "../types";

interface ContentProps {
  courseParts: CourseParts;
}

const Content = (props: ContentProps) => {
  return (
    <>
      {props.courseParts.map((part) => (
        <p key={part.name}>
          {part.name} {part.exerciseCount}
        </p>
      ))}
    </>
  );
};

export default Content;
