'use strict';

let fs = require('fs')
let path = require('path')
let petsPath = path.join(__dirname, 'pets.json')

let node = path.basename(process.argv[0])
let file = path.basename(process.argv[1])
let cmd = process.argv[2]


if (cmd === 'read') {

  fs.readFile(petsPath, 'utf8', (err, data) => {
    let index = process.argv[3]
    let pets = JSON.parse(data)

    if (err) {
      throw err
    } else if (index > pets.length - 1) {
      console.error(`Usage: ${node} ${file} read INDEX`)
      process.exit(1)
    } else if (index === 0 || index) {
      console.log(pets[index])
    } else {
      console.log(pets)
    }
  })

} else if (cmd === 'create') {
  fs.readFile(petsPath, 'utf8', (readErr, data) => {

    let pets = JSON.parse(data)
    let age = Number(process.argv[3])
    let kind = process.argv[4]
    let name = process.argv[5]

    if (readErr) {
      throw readErr
    }

    if (!age && !kind && !name) {
      console.error(`Usage: ${node} ${file} create AGE KIND NAME`)
      process.exit(1)
    }

    let newPet = {
      age: `${age}`,
      kind: `${kind}`,
      name: `${name}`
    }

    pets.push(newPet)

    let petsJSON = JSON.stringify(pets)

    fs.writeFile(petsPath, petsJSON, (writeErr) => {
      if (writeErr) {
        throw writeErr
      }
      console.log(newPet);
    })
  })
} else {

  console.error(`Usage: ${node} ${file} [read | create | update | destroy]`)
}
