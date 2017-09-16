'use strict'


const express = require('express')
const app = express()
const restPets = require('./restfulExpressServer')
const morgan = require('morgan')
const bodyParser = require('body-parser')

app.use(morgan('short'))
app.use(bodyParser.json())
app.use((req, res, next) => {
  res.setHeader('X-Powered-By', 'DREAMS and BACON')
  next()
})

app.use(restPets)


app.use((_req, res) => {
  console.log("WILD CARD!");
  res.sendStatus(404);
})


const port = process.env.PORT || 8000

app.listen(port, () => {
  console.log('Server listening on port: ', port)
})

module.exports = app
