import { useQuery, useLazyQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { ALL_BOOKS, ME } from "../queries";
import BookTable from "./BookTable";

const Recommend = ({ show }) => {
  const meResult = useQuery(ME);
  const [getBooks, booksResult] = useLazyQuery(ALL_BOOKS);
  const [books, setBooks] = useState(null);

  useEffect(() => {
    if (meResult.data && meResult.data.me) {
      getBooks({ variables: { genre: meResult.data.me.favoriteGenre } });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [meResult.data]);

  useEffect(() => {
    if (booksResult.data) {
      setBooks(booksResult.data.allBooks);
    }
  }, [booksResult.data]);

  if (!show || !meResult.data.me || !books) {
    return null;
  }

  const favoriteGenre = meResult.data.me.favoriteGenre;

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
