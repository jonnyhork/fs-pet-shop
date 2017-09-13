// 'use strict'
//
// const http = require('http')
// const fs = require('fs')
// const path = require('path')
//
//
// let server = http.createServer((req, res) => {
//
//   if (req.method === 'GET' && req.url === '/pets') {
//
//     fs.readFile('pets.json', 'utf8', (readErr, data) => {
//
//
//
//       // const petsJSON = JSON.parse(data)
//       // const petsData = JSON.stringify(petsJSON)
//       res.setHeader("Content-Type", "application/json")
//       res.end(data)
//
//     })
//
//   }
//
//
//
// })
// const port = process.env.PORT || 8000
// server.listen(port, () => {
//   console.log("server is listening on ", port)
// })
//
// module.exports = server

'use strict'

let http = require('http')
let fs = require('fs')
let path = require('path')


let server = http.createServer(function(req, res) {

  if (req.method === 'GET' && req.url === '/pets') {
    fs.readFile('pets.json', 'utf8', function(err, content) {
      if (err) console.error("this is the error " + err)
      res.statusCode = 200
      res.setHeader('Content-Type', 'application/json')
      res.end(content);
    })
  } else if (req.method === 'GET' && req.url === '/pets/0') {
    fs.readFile('pets.json', 'utf8', function(err, content) {
      if (err) console.error("this is the error " + err)
      let dataJSON = JSON.parse(content)
      res.statusCode = 200
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify(dataJSON[0]));
    })
  } else if (req.method === 'GET' && req.url === '/pets/1') {
    fs.readFile('pets.json', 'utf8', function(err, content) {
      if (err) console.error("this is the error " + err)
      let dataJSON = JSON.parse(content)
      res.statusCode = 200
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify(dataJSON[1]));
    })
  } else {
    res.statusCode = 404
    res.setHeader('Content-Type', 'text/plain')
    res.end("Not Found")
  }
}).listen(8000, function() {
  console.log("hey listen on 8000");
})


module.exports = server;
