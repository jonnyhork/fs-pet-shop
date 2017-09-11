'use strict';

let fs = require('fs')
let path = require('path')
let petsPath = path.join(__dirname, 'pets.json')

let node = path.basename(process.argv[0])
let file = path.basename(process.argv[1])
let cmd = process.argv[2]
let index = process.argv[3]

if (cmd === 'read') {
  fs.readFile(petsPath, 'utf8', (err, data) => {
    if (err) {
      throw err
    } else if (index === 0 || index) {
      let pets = JSON.parse(data)
      console.log(pets[index])
    } else {
      let pets = JSON.parse(data)
      console.log(data);
    }
  })

} else if ()

  console.error(`Usage: ${node} ${file} [read | create | update | destroy]`);
