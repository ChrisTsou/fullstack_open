const {
  ApolloServer,
  gql,
  UserInputError,
  AuthenticationError,
  PubSub,
} = require("apollo-server");
const mongoose = require("mongoose");
const Book = require("./schemas/Book");
const Author = require("./schemas/Author");
const User = require("./schemas/User");
const jwt = require("jsonwebtoken");

const pubsub = new PubSub();

const JWT_SECRET = "1234";

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

mongoose.set("debug", true);

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

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(genre: String): [Book]!
    allAuthors: [Author]!
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book

    editAuthor(name: String!, setBornTo: Int!): Author

    createUser(username: String!, favoriteGenre: String!): User

    login(username: String!, password: String!): Token
  }

  type Subscription {
    bookAdded: Book!
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
        }).populate("author");
        return books;
      } else {
        const books = await Book.find({}).populate("author");
        return books;
      }
    },

    allAuthors: async () => {
      const authors = await Author.find({});
      return authors;
    },

    me: (root, args, context) => context.currentUser,
  },

  Mutation: {
    addBook: async (root, { author, ...args }, context) => {
      const currentUser = context.currentUser;

      if (!currentUser) {
        throw new AuthenticationError("not authenticated");
      }

      let authorFromDb = await Author.findOne({ name: author });

      if (!authorFromDb) {
        const newAuthor = new Author({ name: author, bookCount: 1 });
        try {
          authorFromDb = await newAuthor.save();
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          });
        }
      } else {
        await Author.findByIdAndUpdate(authorFromDb._id, {
          bookCount: authorFromDb.bookCount + 1,
        });
      }

      const book = new Book({
        ...args,
        author: authorFromDb._id,
      });

      try {
        await book.save();
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }

      const populatedBook = await book.populate("author").execPopulate();

      pubsub.publish("BOOK_ADDED", { bookAdded: populatedBook });

      return populatedBook;
    },

    editAuthor: async (root, args, context) => {
      if (!context.currentUser) {
        throw new AuthenticationError("not authenticated");
      }

      const updatedAuthor = Author.findOneAndUpdate(
        { name: args.name },
        { born: args.setBornTo },
        { new: true }
      );
      return updatedAuthor;
    },

    createUser: async (root, { username, favoriteGenre }) => {
      const newUser = new User({
        username,
        favoriteGenre,
      });
      try {
        return newUser.save();
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }
    },

    login: async (root, { username, password }) => {
      const user = await User.findOne({ username });

      if (!user || password !== "pwd") {
        throw new UserInputError("Wrong credentials");
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      };

      return { value: jwt.sign(userForToken, JWT_SECRET) };
    },
  },

  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(["BOOK_ADDED"]),
    },
  },

  // Author: {
  //   bookCount: async (root) => {
  //     if (root.bookCount || root.bookCount === 0) {
  //       return root.bookCount;
  //     } else {
  //       console.log("counting author books");
  //       const count = await Book.countDocuments({ author: root.id });
  //       try {
  //         await Author.findByIdAndUpdate(
  //           root.id,
  //           {
  //             bookCount: count,
  //           },
  //           {
  //             new: true,
  //           }
  //         );
  //       } catch (error) {
  //         console.log(error.message);
  //       }
  //       root.bookCount = count;
  //       return root.bookCount;
  //     }
  //   },
  // },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null;
    if (auth && auth.toLowerCase().startsWith("bearer ")) {
      const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET);
      const currentUser = await User.findById(decodedToken.id);
      return { currentUser };
    }
  },
});

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`);
  console.log(`Subscriptions ready at ${subscriptionsUrl}`);
});
