const { response } = require("express")
const logger = require("./logger")

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: "unknown endpoint" })
}

const errorHandler = (error, request, response, next) => {
    logger.error(error.message)

    if (error.name === "CastError") {
        response.status(400).send({ error: "malformatted id" })
    } else if (error.name === "Validation Error") {
        response.status(400).send({ error: error.message })
    }

    next(error)
}

module.exports = { unknownEndpoint, errorHandler }