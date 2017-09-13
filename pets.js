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
     let age = process.argv[3]
     let kind = process.argv[4]
     let name = process.argv[5]

     let newPet = {
       age: Number(`${age}`),
       kind: `${kind}`,
       name: `${name}`
     }

     if (readErr) {
       throw readErr
     }

     if (!age || !kind || !name) {
       console.error(`Usage: ${node} ${file} create AGE KIND NAME`)
       process.exit(1)
     } else {
       pets.push(newPet)
     }



     let petsJSON = JSON.stringify(pets)

     fs.writeFile(petsPath, petsJSON, (writeErr) => {
       if (writeErr) {
         throw writeErr
       }
       console.log(newPet);
     })
   })
 } else if (cmd === 'update') {

   fs.readFile(petsPath, 'utf8', (updateErr, data) => {

     if (updateErr) {
       console.error(updateErr);
     }

     const pets = JSON.parse(data)
     const idx = process.argv[3]
     const age = process.argv[4]
     const kind = process.argv[5]
     const name = process.argv[6]

     let updatePet = {

       age: Number(`${age}`),
       kind: `${kind}`,
       name: `${name}`

     }

     if (!idx || !age || !kind || !name) {
       console.error(`Usage: ${node} ${file} update INDEX AGE KIND NAME`)
       process.exit(1)
     } else {
       pets[idx] = updatePet
     }



     const petsJSON = JSON.stringify(pets)

     fs.writeFile(petsPath, petsJSON, (writeErr) => {
       if (writeErr) {
         console.error("update write error: ", writeErr);
       }
       console.log(updatePet);
     })

   })

 } else if (cmd === 'destroy') {

   fs.readFile(petsPath, 'utf8', (destroyErr, data) => {

     if (destroyErr) {
       console.error("destroy error is: ", destroyErr);
     }
     const pets = JSON.parse(data)
     const idx = process.argv[3]

     if (!idx) {
       console.error(`Usage: ${node} ${file} destroy INDEX`);
       process.exit(1)
     } else {
       pets.splice(Number(idx), 1)
     }


     const petsJSON = JSON.stringify(pets)

     fs.writeFile(petsPath, petsJSON, (writeErr) => {
       if (writeErr) {
         console.error("destroy write error", writeErr);
       }

     })
   })
 } else {

   console.error(`Usage: ${node} ${file} [read | create | update | destroy]`)
   process.exit(1)
 }
