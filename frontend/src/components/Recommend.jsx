import { useQuery } from "@apollo/client";
import React from "react";
import { ALL_BOOKS, ME } from "../queries";
import BookTable from "./BookTable";

const Recommend = ({ show }) => {
  const meResult = useQuery(ME);
  const booksResult = useQuery(ALL_BOOKS);

  if (!show || meResult.loading || booksResult.loading) {
    return null;
  }

  const favoriteGenre = meResult.data.me.favoriteGenre;
  const books = booksResult.data.allBooks.filter((b) =>
    b.genres.includes(favoriteGenre)
  );

  return (
    <>
      <h2>Recommendations</h2>
      <h4>
        books in your favorite genre <em>{favoriteGenre}</em>
      </h4>
      <BookTable books={books} />
    </>
  );
};

export default Recommend;
