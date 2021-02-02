const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log(
    "Please provide the password as an argument: node mongo.js <password>"
  );
  process.exit(1);
}

const password = process.argv[2];
const url = `mongodb+srv://fullstackopen:${password}@cluster0.mocqg.mongodb.net/phonebook?retryWrites=true&w=majority`;

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

//list all people
if (process.argv.length == 3) {
  Person.find({}).then((result) => {
    console.log("phonebook:");

    result.forEach((person) => {
      console.log(person.name, person.number);
    });

    mongoose.connection.close();
  });
}

//add person
if (process.argv.length == 5) {
  const entryName = process.argv[3];
  const entryNumber = process.argv[4];

  const person = new Person({
    name: entryName,
    number: entryNumber,
  });

  person.save().then((result) => {
    console.log("person saved!");

    mongoose.connection.close();
  });
}

//else
if (process.argv.length > 5) {
  console.log(
    'wrong number of arguments, make sure the name is in quotes if it has whitespace, eg: "chris black"'
  );

  mongoose.connection.close();
  console.log("connection closed");
}
