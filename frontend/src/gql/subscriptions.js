import { BOOK_DETAILS } from "./fragments";
import { gql } from "@apollo/client";

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`;
