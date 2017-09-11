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
    let pets = JSON.parse(data)

    if (err) {
      throw err
    } else if (index > pets.length - 1) {
      console.error(`Usage: ${node} ${file} read INDEX`);
    } else if (index === 0 || index) {
      console.log(pets[index])
    } else {
      console.log(pets);
    }
  })

}

console.error(`Usage: ${node} ${file} [read | create | update | destroy]`);
