// Importing the data from people.js into modules.js
// This doesn't actually bring the data over, it just makes it accesible from this file.
// const peopleImport = require('./people'); // the './' tells Node to look in the same directory as this file for people.js.
// Destructuring
const {people, ages} = require('./people'); // Must have the same names as the varibles being imported.

// console.log(peopleImport); // Prints everything
// // These two print only the specified data
// console.log(peopleImport.people);
// console.log(peopleImport.ages);

console.log(people);
console.log(ages);
console.log(people, ages);

const os = require('os'); // Importing the os module that is already built into NodeJS that contains information about our machine's operating system.

console.log(os.platform(), os.homedir());

const fs = require('fs');