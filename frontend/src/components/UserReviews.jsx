import React from "react";
import { GET_AUTHORIZED_USER } from "../graphql/queries";
import { DELETE_REVIEW } from "../graphql/mutations";
import { FlatList, View, Pressable, StyleSheet, Alert } from "react-native";
import { useQuery, useMutation } from "@apollo/client";
import { useHistory } from "react-router-native";

import ItemSeparator from "./ItemSeparator";
import ReviewItem from "./ReviewItem";
import theme from "../theme";
import Text from "./Text";

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  button: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 5,
    backgroundColor: theme.colors.primary,
  },
});

const UserReviews = () => {
  const history = useHistory();
  const { data, refetch } = useQuery(GET_AUTHORIZED_USER, {
    fetchPolicy: "cache-and-network",
    variables: {
      includeReviews: true,
    },
  });
  const [deleteReview] = useMutation(DELETE_REVIEW);

  const user = data?.authorizedUser;
  const reviewNodes = user?.reviews.edges.map((edge) => edge.node);

  const handleViewRepository = (id) => {
    history.push(`/repositories/${id}`);
  };

  const deleteReviewFunction = async (id) => {
    try {
      const response = await deleteReview({ variables: { id } });
      refetch();
    } catch (e) {
      console.error(e);
    }
  };

  const handleDeleteReview = (id) => {
    Alert.alert(
      "Delete review",
      "Are you sure you want to delete this review?",
      [
        {
          text: "CANCEL",
        },
        {
          text: "DELETE",
          onPress: () => deleteReviewFunction(id),
        },
      ]
    );
  };

  return (
    <FlatList
      data={reviewNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => (
        <>
          <ReviewItem review={item} />
          <View style={styles.buttonContainer}>
            <Pressable
              onPress={() => handleViewRepository(item.repositoryId)}
              style={styles.button}
              android_ripple={{ color: theme.colors.backgroundPrimary }}
            >
              <Text color="textTertiary" fontWeight="bold">
                View repository
              </Text>
            </Pressable>
            <Pressable
              onPress={() => handleDeleteReview(item.id)}
              style={[styles.button, { backgroundColor: "red" }]}
              android_ripple={{ color: theme.colors.backgroundPrimary }}
            >
              <Text color="textTertiary" fontWeight="bold">
                Delete Review
              </Text>
            </Pressable>
          </View>
        </>
      )}
    />
  );
};

export default UserReviews;
