'use strict'

let fs = require('fs')
const path = require('path')
const petsPath = path.join(__dirname, 'pets.json')
const express = require('express')
const app = express()

app.get('/pets', (req, res) => {

  fs.readFile(petsPath, 'utf8', (err, data) => {
    if (err) {
      console.error('readFile /pets error', err)
    }
    let petsData = JSON.parse(data)

    res.send(petsData)

  })
})

app.get('/pets/:idx', (req, res) => {

  fs.readFile(petsPath, 'utf8', (err, data) => {

    let idx = Number(req.params.idx) //returns a string if not converted, access after :
    let petsData = JSON.parse(data)

    if (idx < 0 || idx >= petsData.length || Number.isNaN(idx)) { //typeof idx !== 'number'

      res.sendStatus(404) // equivalent to res.status(404).send('Not Found')

    }

    res.send(petsData[idx])
  })

})

// app.post()

app.listen(8000, () => {
  console.log('The app is listening on 8000');
})

module.exports = app
