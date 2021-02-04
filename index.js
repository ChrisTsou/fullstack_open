const { response } = require("express");
const express = require("express");
const morgan = require("morgan");
const app = express();
const Person = require("./models/person");
// to deploy

app.use(express.static("build"));
app.use(express.json());
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :data")
);
morgan.token("data", (req, res) => {
  return JSON.stringify(req.body);
});

app.get("/api/people", (lequest, response, next) => {
  Person.find({})
    .then((result) => {
      response.json(result);
    })
    .catch((error) => next(error));
});

app.get("/info", (request, response, next) => {
  Person.count({})
    .then((result) => {
      response.send(
        `<p>Phonebook has info for ${result} people</p>
         <p>${new Date()}</p>`
      );
    })
    .catch((error) => next(error));
});

app.get("/api/people/:id", (request, response, next) => {
  Person.findById(request.params.id)
    .then((returnedPerson) => {
      response.json(returnedPerson);
    })
    .catch((error) => next(error));
});

app.delete("/api/people/:id", (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then((result) => {
      response.send(204).end();
    })
    .catch((error) => next(error));
});

app.post("/api/people", (request, response, next) => {
  const body = request.body;

  const newPerson = new Person({
    name: body.name,
    number: body.number,
  });

  newPerson
    .save()
    .then((savedPerson) => savedPerson.toJSON())
    .then((savedPerson) => {
      response.json(savedPerson);
    })
    .catch((error) => next(error));
});

app.put("/api/people/:id", (request, response, next) => {
  const body = request.body;

  const person = {
    name: body.name,
    number: body.number,
  };

  Person.findByIdAndUpdate(request.params.id, person, {
    new: true,
    runValidators: true,
    context: "query",
  })
    .then((updatedPerson) => {
      response.json(updatedPerson);
    })
    .catch((error) => next(error));
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name == "ValidationError") {
    return response.status(400).send({ error: error.message });
  }

  next(error);
};

app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
