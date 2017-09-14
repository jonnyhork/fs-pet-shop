'use strict'

const http = require('http')
let fs = require('fs')
const path = require('path')
const petsPath = path.join(__dirname, 'pets.json')

let server = http.createServer((req, res) => {

  if (req.method === 'GET' && req.url === '/pets') {

    fs.readFile(petsPath, 'utf8', (readErr, data) => {

      res.statusCode = 200
      res.setHeader("Content-Type", "application/json")
      res.end(data)

    })

  } else if (req.method === 'GET' && req.url === '/pets/0') {

    fs.readFile(petsPath, 'utf8', (readErr, data) => {

      let petsJSON = JSON.parse(data)

      res.statusCode = 200
      res.setHeader("Content-Type", "application/json")
      res.end(JSON.stringify(petsJSON[0]))

    })
  } else if (req.method === 'GET' && req.url === '/pets/1') {

    fs.readFile(petsPath, 'utf8', (readErr, data) => {

      let petsJSON = JSON.parse(data)

      res.statusCode = 200
      res.setHeader("Content-Type", "application/json")
      res.end(JSON.stringify(petsJSON[1]))

    })

  } else {
    res.statusCode = 404
    res.setHeader('Content-Type', 'text/plain')
    res.end('Not Found')
  }



})

const port = process.env.PORT || 8000
server.listen(port, () => {
  console.log("server is listening on ", port)
})

module.exports = server
