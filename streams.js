const fs = require('fs');

const readStream = fs.createReadStream('./docs/post_1.txt', {encoding: 'utf8'}); // The second parameter is an array of optoins (it is the opetions parameter). In this case, we are encoding the data in UTF-8 so we don't have to call toString.
const writeStream = fs.createWriteStream('./docs/post_4.txt');

// The .on method is an event listener. A generic one that listens for whatever you tell it. In this cawse, 'data'.
// This fires every time a new piece of data comes in.
// This is copying the text from post_1.txt to post_4.txt
// readStream.on('data', (chunk) => {
//     console.log('----- NEW CHUNK -----');
//     // console.log(chunk.toString());
//     console.log(chunk); // Don't need to call toString b/c data is UTF-8 encoded.
//     writeStream.write('\n----- NEW CHUNK -----\n')
//     writeStream.write(chunk); // The stream writer will make a new file if it doesn't already exist.
// });


// PIPING

// Pipes must be from a readable stream to a writable stream.

// This does exactly the same thing as above. Only it doesn't print everything to the console. It is reading data from post_1.txt and writing it to post_4.txt.
readStream.pipe(writeStream);