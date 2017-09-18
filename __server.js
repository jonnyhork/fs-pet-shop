'use strict'


const express = require('express')
const app = express()
const restPets = require('./restfulExpressServer2')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const auth = require('basic-auth')

app.use(morgan('short'))
app.use(bodyParser.json())
app.use((req, res, next) => {
  res.setHeader('X-Powered-By', 'DREAMS and BACON')
  next()
})

app.use((req, res, next) => {
  let credentials = auth(req)
  console.log("creds are: ", credentials);

  if (credentials && credentials.name === 'admin' && credentials.pass === 'meowmix') {
    next() //move in to the next thing and fulfill the requst
  } else {

    res.setHeader('WWW-Authenticate', 'Basic realm="Required"')
    res.sendStatus(401)
    res.end('Access Denied')

  }

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
