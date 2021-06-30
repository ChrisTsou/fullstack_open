import React from "react";
import { View, StyleSheet, Image } from "react-native";
import Text from "./Text";
import theme from "../theme";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    backgroundColor: theme.colors.backgroundPrimary,
  },
  topContainer: {
    flexDirection: "row",
  },
  infoContainer: {
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  imageContainer: {
    justifyContent: "flex-start",
  },
  bottomContainer: {
    margin: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  bottomItemContainer: {
    justifyContent: "space-between",
  },
  userImage: {
    width: 50,
    height: 50,
    margin: 15,
    borderRadius: 5,
  },
  text: {
    marginTop: 5,
    marginBottom: 5,
  },
  languageText: {
    margin: 0,
    padding: 5,
    backgroundColor: theme.colors.primary,
    borderRadius: 5,
  },
});

const RepositoryListItem = (props) => {
  const item = props.item;

  const truncateNumber = (num) =>
    num >= 1000 ? `${(num / 1000).toFixed(1)}k` : num;

  return (
    <View style={styles.container}>
      <View style={[styles.container, styles.topContainer]}>
        <View style={[styles.container, styles.imageContainer]}>
          <Image
            style={styles.userImage}
            source={{ uri: item.ownerAvatarUrl }}
          />
        </View>
        <View style={[styles.container, styles.infoContainer]}>
          <Text style={styles.text} fontWeight="bold" fontSize="subheading">
            {item.fullName}
          </Text>
          <Text style={styles.text} color="textSecondary">
            {item.description}
          </Text>
          <Text style={[styles.text, styles.languageText]} color="textTertiary">
            {item.language}
          </Text>
        </View>
      </View>
      <View style={[styles.container, styles.bottomContainer]}>
        <View style={[styles.container, styles.bottomItemContainer]}>
          <Text fontWeight="bold" fontSize="subheading">
            {truncateNumber(item.stargazersCount)}
          </Text>
          <Text color="textSecondary">Stars</Text>
        </View>
        <View style={[styles.container, styles.bottomItemContainer]}>
          <Text fontWeight="bold" fontSize="subheading">
            {truncateNumber(item.forksCount)}
          </Text>
          <Text color="textSecondary">Forks</Text>
        </View>
        <View style={[styles.container, styles.bottomItemContainer]}>
          <Text fontWeight="bold" fontSize="subheading">
            {truncateNumber(item.reviewCount)}
          </Text>
          <Text color="textSecondary">Reviews</Text>
        </View>
        <View style={[styles.container, styles.bottomItemContainer]}>
          <Text fontWeight="bold" fontSize="subheading">
            {item.ratingAverage}
          </Text>
          <Text color="textSecondary">Rating</Text>
        </View>
      </View>
    </View>
  );
};

export default RepositoryListItem;
