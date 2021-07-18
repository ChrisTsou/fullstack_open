import { Formik } from "formik";
import React from "react";
import * as yup from "yup";

import WriteReviewForm from "./WriteReviewForm";

const WriteReviewFormik = ({ onSubmit }) => {
  const initialValues = {
    ownerName: "",
    repositoryName: "",
    rating: "",
    text: "",
  };

  const validationSchema = yup.object().shape({
    ownerName: yup.string().required("Owner Name is required"),
    repositoryName: yup.string().required("Repository Name is required"),
    rating: yup
      .number()
      .required("Rating is required")
      .min(0, "Minimum rating is 0")
      .max(100, "Maximum rating is 100"),
    text: yup.string(),
  });

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <WriteReviewForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default WriteReviewFormik;
