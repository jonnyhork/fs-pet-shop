'use strict'

let fs = require('fs')
const path = require('path')
const petsPath = path.join(__dirname, 'pets.json')

const express = require('express')
const router = express.Router()

// const morgan = require('morgan')
// const bodyParser = require('body-parser')
//
// router.use(morgan('short'))
// router.use(bodyParser.json())


router.get('/pets', (_req, res) => {
  fs.readFile(petsPath, 'utf8', (err, petsJSON) => {
    if (err) {
      return res.sendStatus(500)
    }

    let petsData = JSON.parse(petsJSON)

    res.send(petsData)
  })
})

router.get('/pets/:idx', (req, res) => {
  fs.readFile(petsPath, 'utf8', (err, petsJSON) => {
    if (err) {
      return res.sendStatus(500)
    }

    let idx = Number(req.params.idx)
    // console.log("index is: ", idx);
    let petsData = JSON.parse(petsJSON)

    if (idx < 0 || idx >= petsData.length || Number.isNaN(idx)) {
      return res.sendStatus(404)
    }

    res.send(petsData[idx])
  })

})

router.post('/pets', (req, res) => {
  console.log(req.body);
  console.log(req.url);

  fs.readFile(petsPath, 'utf8', (readErr, petsJSON) => {
    if (readErr) {
      console.error(readErr)
      return res.sendStatus(500)
    }

    let petsData = JSON.parse(petsJSON)
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
    petsJSON = JSON.stringify(petsData)

    fs.writeFile(petsPath, petsJSON, (writeErr) => {
      if (writeErr) {
        console.error(writeErr);
        return res.sendStatus(500)
      }
      res.send(newPet)
    })
  })





})




module.exports = router
