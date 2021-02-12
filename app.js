const config = require("./utils/config")
const express = require("express")
require("express-async-errors")
const app = express()
const cors = require("cors")
const logger = require("./utils/logger")
const mongoose = require("mongoose")
const blogRouter = require("./controllers/blog")
const userRouter = require("./controllers/users")
const middleware = require("./utils/middleware")
const morgan = require("morgan")

logger.info("Connecting to", config.MONGODB_URI)

mongoose
    .connect(config.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
    })
    .then(() => logger.info("connected to MongoDB"))
    .catch((error) =>
        logger.error("error connecting to MongoDB:", error.message)
    )

app.use(cors())
app.use(express.json())
if (process.env.NODE_ENV !== "test") {
    app.use(morgan("tiny"))
}

app.use("/api/blogs", blogRouter)
app.use("/api/users", userRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
