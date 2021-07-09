import { format, parseJSON } from "date-fns";
import React from "react";
import { StyleSheet, View } from "react-native";

import theme from "../theme";
import Text from "./Text";

const scoreSize = 50;

const styles = StyleSheet.create({
  reviewContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignContent: "flex-start",
    alignItems: "flex-start",
    backgroundColor: theme.colors.backgroundPrimary,
    padding: 10,
  },
  score: {
    marginRight: 10,
    display: "flex",
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.colors.backgroundPrimary,
    width: scoreSize,
    height: scoreSize,
    borderWidth: 3,
    borderColor: theme.colors.primary,
    borderRadius: scoreSize / 2,
  },
  textContainer: {
    flex: 1,
  },
  reviewHeader: {
    marginBottom: 10,
  },
});

const ReviewItem = ({ review }) => {
  return (
    <View style={styles.reviewContainer}>
      <View style={styles.score}>
        <Text color="primary" fontWeight="bold">
          {review.rating}
        </Text>
      </View>
      <View style={styles.textContainer}>
        <View style={styles.reviewHeader}>
          <Text color="textPrimary" fontWeight="bold">
            {review.user.username}
          </Text>
          <Text color="textSecondary">
            {format(parseJSON(review.createdAt), "dd.MM.yyyy")}
          </Text>
        </View>
        <Text style={styles.reviewText}>{review.text}</Text>
      </View>
    </View>
  );
};

export default ReviewItem;
