'use strict'

let fs = require('fs')
const path = require('path')
const petsPath = path.join(__dirname, 'pets.json')
const express = require('express')
const app = express()

const morgan = require('morgan')
const bodyParser = require('body-parser')

app.use(morgan('short'))
app.use(bodyParser.json())
app.use((req, res, next) => {
  res.setHeader('X-Powered-By', 'DREAMS and BACON')
  next()
})


app.get('/pets', (_req, res) => {
  fs.readFile(petsPath, 'utf8', (readErr, petsJSON) => {
    if (readErr) {
      console.error('GET read error:', readErr)
      return res.sendStatus(500)
    }

    let petsData = JSON.parse(petsJSON)

    res.send(petsData)
  })
})

app.get('/pets/:idx', (req, res) => {
  fs.readFile(petsPath, 'utf8', (readErr, petsJSON) => {
    if (readErr) {
      console.error('GET read error:', readErr)
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

app.post('/pets', (req, res) => {
  console.log(req.body);
  console.log(req.url);

  fs.readFile(petsPath, 'utf8', (readErr, petsJSON) => {
    if (readErr) {
      console.error('POST read error:', readErr)
      return res.sendStatus(500)
    }

    let petsData = JSON.parse(petsJSON)
    let age = Number(req.body.age)
    // let kind = req.body.kind
    // let name = req.body.name
    let {
      kind,
      name
    } = req.body //ES6 syntax for assigning multiple variables to key value pairs. only obj?

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
        console.error('POST write error:', writeErr);
        return res.sendStatus(500)
      }
      res.send(newPet)
    })
  })
})

app.patch('/pets/:idx', (req, res) => {
  fs.readFile(petsPath, 'utf8', (readErr, petsJSON) => {

    if (readErr) {
      console.error('PATCH read error:', readErr)
      return res.sendStatus(500)
    }

    let idx = Number(req.params.idx)
    let petsData = JSON.parse(petsJSON)

    if (idx < 0 || idx >= petsData.length || Number.isNaN(idx)) {
      console.log('patch error')
      return res.sendStatus(404)
    }

    let patchPet = petsData[idx]
    let age = Number(req.body.age)

    let {
      kind,
      name
    } = req.body

    if (Number.isNaN(age)) {
      return res.sendStatus(400)
    }

    if (age) {
      patchPet.age = age
    }

    if (kind) {
      patchPet.kind = kind
    }

    if (name) {
      patchPet.name = name
    }

    petsJSON = JSON.stringify(petsData)

    fs.writeFile(petsPath, petsJSON, (writeErr) => {
      if (writeErr) {
        console.error('PATCH write error:', writeErr);
        return res.sendStatus(500)
      }
      res.send(patchPet)
    })

  })
})

app.delete('/pets/:idx', (req, res) => {
  fs.readFile(petsPath, 'utf8', (readErr, petsJSON) => {

    let idx = Number(req.params.idx)
    let petsData = JSON.parse(petsJSON)

    if (idx < 0 || idx >= petsData.length || Number.isNaN(idx)) {
      return res.sendStatus(400)
    }

    let delPet = petsData.splice(idx, 1)[0]
    // console.log(delPet);
    petsJSON = JSON.stringify(petsData)

    fs.writeFile(petsPath, petsJSON, (writeErr) => {
      if (writeErr) {
        console.error('DELETE write error:', writeErr)
        return res.sendStatus(500)
      }

      res.send(delPet)
    })
  })

})








module.exports = app






const port = process.env.PORT || 8000

app.listen(port, () => {
  console.log('Server listening on port: ', port)
})

module.exports = app
