import React from "react";
import { Text } from "react-native";

const RepositoryItem = (props) => {
  const item = props.item;

  return (
    <>
      <Text>Full Name: {item.fullName}</Text>
      <Text>Description: {item.description}</Text>
      <Text>Language: {item.language}</Text>
      <Text>Stars: {item.stargazersCount}</Text>
      <Text>Forks: {item.forksCount}</Text>
      <Text>Reviews: {item.reviewCount}</Text>
      <Text>Rating: {item.ratingAverage}</Text>
    </>
  );
};

export default RepositoryItem;
