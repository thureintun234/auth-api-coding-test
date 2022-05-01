const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const config = require('./utils/config')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')
const userRouters = require('./routes/users')

// mongodb atlas connection
mongoose.connect(config.MONGODB_URI)
  .then(() => logger.info(`MongoDB connected successfully`))
  .catch(err => logger.error(`MongoDB connection err ${err}`))

// middlewares
app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)

// routes
app.use('/api/users', userRouters)

// error Handlers
app.use(middleware.unknownEndPoint)
app.use(middleware.errorHandler)

module.exports = app