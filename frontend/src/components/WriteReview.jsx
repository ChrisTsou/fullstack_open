import React from "react";
import { useMutation } from "@apollo/client";
import WriteReviewFormik from "./WriteReviewFormik";
import { CREATE_REVIEW } from "../graphql/mutations";
import { useHistory } from "react-router-native";

const WriteReview = () => {
  const [mutate] = useMutation(CREATE_REVIEW);
  const history = useHistory();

  const onSubmit = async (values) => {
    try {
      const rating = parseInt(values.rating, 10);
      const response = await mutate({ variables: { ...values, rating } });

      const id = response.data.createReview.repository.id;
      history.push(`/repositories/${id}`);
    } catch (e) {
      console.error(e);
    }
  };

  return <WriteReviewFormik onSubmit={onSubmit} />;
};

export default WriteReview;
