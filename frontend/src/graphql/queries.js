import { gql } from "@apollo/client";

const REPOSITORY_BASIC_INFO = gql`
  fragment RepositoryBasicInfo on Repository {
    id
    ownerAvatarUrl
    fullName
    description
    language
    stargazersCount
    forksCount
    reviewCount
    ratingAverage
    createdAt
  }
`;

const REVIEW_FIELDS = gql`
  fragment ReviewFields on Review {
    id
    text
    rating
    createdAt
    user {
      id
      username
    }
  }
`;

export const GET_REPOSITORIES = gql`
  query (
    $orderBy: AllRepositoriesOrderBy!
    $orderDirection: OrderDirection!
    $searchKeyword: String
    $first: Int
    $after: String
  ) {
    repositories(
      orderBy: $orderBy
      orderDirection: $orderDirection
      searchKeyword: $searchKeyword
      first: $first
      after: $after
    ) {
      totalCount
      edges {
        node {
          ...RepositoryBasicInfo
        }
        cursor
      }
      pageInfo {
        endCursor
        startCursor
        hasNextPage
      }
    }
  }
  ${REPOSITORY_BASIC_INFO}
`;

export const GET_REPOSITORY = gql`
  query GetRepository($id: ID!, $first: Int, $after: String) {
    repository(id: $id) {
      ...RepositoryBasicInfo
      url
      reviews(first: $first, after: $after) {
        totalCount
        edges {
          node {
            ...ReviewFields
          }
          cursor
        }
        pageInfo {
          endCursor
          startCursor
          hasNextPage
        }
      }
    }
  }
  ${REPOSITORY_BASIC_INFO}
  ${REVIEW_FIELDS}
`;

export const GET_AUTHORIZED_USER = gql`
  query getAuthorizedUser($includeReviews: Boolean = false) {
    authorizedUser {
      id
      username
      reviews @include(if: $includeReviews) {
        edges {
          node {
            ...ReviewFields
          }
          cursor
        }
        pageInfo {
          endCursor
          startCursor
          hasNextPage
        }
      }
    }
  }
  ${REVIEW_FIELDS}
`;
