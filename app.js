/* This file, the app.js file, is exactly the same as the server.js file we made earlier in this course
 * (with maybe a few additional features). That is, they do the same thing, but this one takes advantage
 * of the Express package for Node.js. The Express package simplifies
 * Node.js development by abstracting away routing code and other common operations into functions built
 * in Node.js. This simplifies our code and makes it faster and easier to write Node.js applications.
 */

const express = require('express');
const { appendFile } = require('fs');

// Setting up the Express app object
const app = express(); // Initialize the Express app object. Not an instance of this file (app.js).

// Listen for incoming messages
app.listen(3000); // Listen on port 3000. This returs an instance of the server so we could save it and work with it.

// Listen for GET requests for the root of the domain ('/').
app.get('/', (req, res) => {
    
    res.send('<p>Hello world!</p>'); // This Express method infers the content type and status code and sets these headers for us.
});





