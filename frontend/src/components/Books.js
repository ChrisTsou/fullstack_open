import React, { useState } from "react";
import { ALL_BOOKS } from "../gql/queries";
import { useQuery } from "@apollo/client";
import BookTable from "./BookTable";

const Books = (props) => {
  const result = useQuery(ALL_BOOKS);
  const [genreFilter, setGenreFilter] = useState(null);

  if (!props.show || result.loading) {
    return null;
  }

  let books = result.data.allBooks;
  const genres = [...new Set(books.flatMap((book) => book.genres))];

  if (genreFilter) {
    books = books.filter((b) => b.genres.includes(genreFilter));
  }

  return (
    <div>
      <h2>books</h2>
      {genreFilter ? (
        <h4>
          in genre <em>{genreFilter}</em>
        </h4>
      ) : null}
      <BookTable books={books} />
      <div>
        {genres.map((genre, index) => (
          <button key={index} onClick={() => setGenreFilter(genre)}>
            {genre}
          </button>
        ))}
        <button onClick={() => setGenreFilter(null)}>all genres</button>
      </div>
    </div>
  );
};

export default Books;
