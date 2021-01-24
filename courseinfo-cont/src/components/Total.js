import React from "react";

const Total = ({ course }) => {
  return (
    <p>
      <b>
        Total num of exercises{" "}
        {course.parts.reduce((s, p) => s + p.exercises, 0)}
      </b>
    </p>
  );
};

export default Total;
