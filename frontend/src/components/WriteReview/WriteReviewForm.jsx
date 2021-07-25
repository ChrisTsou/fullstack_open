import React from "react";

import FormikTextInput from "../FormikTextInput";
import FormTemplate from "../FormTemplate";

const WriteReviewForm = ({ onSubmit }) => {
  return (
    <FormTemplate submitText={"Create Review"} onSubmit={onSubmit}>
      <FormikTextInput name="ownerName" placeholder="Repository Owner Name" />
      <FormikTextInput name="repositoryName" placeholder="Repository Name" />
      <FormikTextInput name="rating" placeholder="Rating" />
      <FormikTextInput multiline name="text" placeholder="Review" />
    </FormTemplate>
  );
};

export default WriteReviewForm;
