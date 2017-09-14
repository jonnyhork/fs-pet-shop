'use strict'

let fs = require('fs')
const path = require('path')
const petsPath = path.join(__dirname, 'pets.json')
const express = require('express')
const app = express()


const bodyParser = require('body-parser');
app.use(bodyParser.json())

app.disable('x-powered-by') // disables the label 'x-powered-by', good for production, doesn't do anything.

app.get('/pets', (req, res) => {

  fs.readFile(petsPath, 'utf8', (err, data) => {
    if (err) {
      res.sendStatus(500)
    }
    let petsData = JSON.parse(data)

    res.send(petsData)

  })
})

app.get('/pets/:idx', (req, res) => {

  fs.readFile(petsPath, 'utf8', (err, data) => {
    if (err) {
      res.sendStatus(500)
    }

    let idx = Number(req.params.idx) //returns a string if not converted, access after :
    let petsData = JSON.parse(data)

    if (idx < 0 || idx >= petsData.length || Number.isNaN(idx)) { //typeof idx !== 'number'
      res.sendStatus(404) // equivalent to res.status(404).send('Not Found')
    }

    res.send(petsData[idx])


  })

})

app.post('/pets', (req, res) => {
  console.log(req.body);
  console.log(req.url);
  fs.readFile(petsPath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
    }

    let petsData = JSON.parse(data)
    let age = Number(req.body.age)
    let kind = req.body.kind
    let name = req.body.name

    if (isNaN(age) || !kind || !name) {
      return res.sendStatus(400)
    }

    let newPet = {
      age,
      kind,
      name
    }

    petsData.push(newPet)
    // console.log('new pet = ', newPet);
    let petsJSON = JSON.stringify(petsData)

    fs.writeFile(petsPath, petsJSON, (writeErr) => {
      if (writeErr) {
        console.error(writeErr)
      }
      res.send(newPet)
    })
  })
})

/* this is a catch-all error handle, if none of the other routes are matched then this will run*/
app.use((_req, res) => {
  res.sendStatus(404);
})

let port = process.env.PORT || 8000
app.listen(port, () => {
  console.log('The app is listening on 8000');
})

module.exports = app
