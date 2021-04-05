import React, { useEffect, useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import Login from "./components/Login";
import Recommend from "./components/Recommend";
import { useApolloClient, useSubscription } from "@apollo/client";
import { BOOK_ADDED } from "./gql/subscriptions";
import { ALL_BOOKS } from "./gql/queries";

const App = () => {
  const [page, setPage] = useState("books");
  const [token, setToken] = useState(null);

  const client = useApolloClient();

  useEffect(() => {
    const storageToken = localStorage.getItem("user-token");
    if (storageToken) {
      setToken(storageToken);
    }
  }, []);

  const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) => {
      set.map((p) => p.id).includes(object.id);
    };

    const dataInStore = client.readQuery({ query: ALL_BOOKS });
    if (!includedIn(dataInStore.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks: dataInStore.allBooks.concat(addedBook) },
      });
    }
  };

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded;
      window.alert("book added to the server");
      updateCacheWith(addedBook);
    },
  });

  const handleLogout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
  };

  return (
    <div>
      <div>
        <button onClick={() => setPage("books")}>books</button>
        <button onClick={() => setPage("authors")}>authors</button>
        {token ? (
          <>
            <button onClick={() => setPage("add")}>add book</button>
            <button onClick={() => setPage("recommend")}>recommend</button>
            <button onClick={handleLogout}>logout</button>
          </>
        ) : (
          <button onClick={() => setPage("login")}>login</button>
        )}
      </div>

      <Books show={page === "books"} />

      <Authors show={page === "authors"} token={token} />

      <NewBook show={page === "add"} />

      <Recommend show={page === "recommend"} />

      <Login show={page === "login"} setToken={setToken} />
    </div>
  );
};

export default App;
