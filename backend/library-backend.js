const { ApolloServer, gql } = require("apollo-server");
const mongoose = require("mongoose");
const Book = require("./schemas/Book");
const Author = require("./schemas/Author");

const MONGODB_URI =
  "mongodb+srv://fullstackopen:christsou@cluster0.mocqg.mongodb.net/libraryApp?retryWrites=true&w=majority";
console.log("connecting to", MONGODB_URI);

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => console.log("connected to MongoDB"))
  .catch((error) =>
    console.log("failed to connect to MongoDB: ", error.message)
  );

const typeDefs = gql`
  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String]!
    id: ID!
  }

  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book]!
    allAuthors: [Author]!
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book

    editAuthor(name: String!, setBornTo: Int!): Author
  }
`;

const getModelCount = async (model) => {
  const count = await model.countDocuments({});
  return count;
};

const resolvers = {
  Query: {
    bookCount: () => getModelCount(Book),
    authorCount: () => getModelCount(Author),
    allBooks: async (root, args) => {
      const genre = args.genre;
      if (genre) {
        const books = await Book.find({
          genres: { $elemMatch: { $eq: genre } },
        });
        return books;
      } else {
        const books = await Book.find({});
        return books;
      }
    },
    allAuthors: async () => {
      const authors = await Author.find({});
      return authors;
    },
  },

  Mutation: {
    addBook: async (root, { author, ...args }) => {
      const book = new Book({
        ...args,
        author: new Author({ name: "testAuthor" }),
      });
      await book.save();

      return book;
    },

    editAuthor: (root, args) => {
      authors = authors.map((author) =>
        author.name === args.name ? { ...author, born: args.setBornTo } : author
      );
      return authors.find((author) => author.name === args.name);
    },
  },

  Author: {
    bookCount: (root) => filterBooksByAuthor(root.name).length,
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
