import React from "react";
import { CoursePart } from "../types";
import Part from "./Part";

interface ContentProps {
  courseParts: CoursePart[];
}

const Content = (props: ContentProps) => {
  return (
    <>
      {props.courseParts.map((part) => (
        <p key={part.name}>
          <Part coursePart={part} />
        </p>
      ))}
    </>
  );
};

export default Content;
