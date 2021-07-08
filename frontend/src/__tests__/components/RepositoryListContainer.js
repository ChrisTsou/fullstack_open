import React from "react";
import { render } from "@testing-library/react-native";
import RepositoryListContainer from "../../components/RepositoryListContainer";

describe("RepositoryList", () => {
  describe("RepositoryListContainer", () => {
    it("renders repository information correctly", () => {
      const repositories = {
        totalCount: 8,
        pageInfo: {
          hasNextPage: true,
          endCursor:
            "WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==",
          startCursor: "WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd",
        },
        edges: [
          {
            node: {
              id: "jaredpalmer.formik",
              fullName: "jaredpalmer/formik",
              description: "Build forms in React, without the tears",
              language: "TypeScript",
              forksCount: 1619,
              stargazersCount: 21856,
              ratingAverage: 88,
              reviewCount: 3,
              ownerAvatarUrl:
                "https://avatars2.githubusercontent.com/u/4060187?v=4",
            },
            cursor: "WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd",
          },
          {
            node: {
              id: "async-library.react-async",
              fullName: "async-library/react-async",
              description: "Flexible promise-based React data loader",
              language: "JavaScript",
              forksCount: 69,
              stargazersCount: 1760,
              ratingAverage: 72,
              reviewCount: 3,
              ownerAvatarUrl:
                "https://avatars1.githubusercontent.com/u/54310907?v=4",
            },
            cursor:
              "WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==",
          },
        ],
      };

      const truncateNumber = (num) =>
        num >= 1000 ? `${(num / 1000).toFixed(1)}k` : num;

      const { getAllByTestId } = render(
        <RepositoryListContainer repositories={repositories} />
      );

      const renderedRepositories = getAllByTestId("repositoryContainer");

      renderedRepositories.forEach((repo, index) => {
        const currentRepo = repositories.edges[index].node;

        expect(repo).toHaveTextContent(currentRepo.fullName);
        expect(repo).toHaveTextContent(currentRepo.description);
        expect(repo).toHaveTextContent(currentRepo.language);
        expect(repo).toHaveTextContent(truncateNumber(currentRepo.forksCount));
        expect(repo).toHaveTextContent(
          truncateNumber(currentRepo.stargazersCount)
        );
        expect(repo).toHaveTextContent(
          truncateNumber(currentRepo.ratingAverage)
        );
        expect(repo).toHaveTextContent(truncateNumber(currentRepo.reviewCount));
      });
    });
  });
});
