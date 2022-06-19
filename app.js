/* This file, the app.js file, is exactly the same as the server.js file we made earlier in this course
 * (with maybe a few additional features). That is, they do the same thing, but this one takes advantage
 * of the Express package for Node.js. The Express package simplifies
 * Node.js development by abstracting away routing code and other common operations into functions built
 * in Node.js. This simplifies our code and makes it faster and easier to write Node.js applications.
 * 
 * Note: The server.js file was deleted as part of this commit b/c it was replaced by the app.js file.
 * To view the server.js file, go to the commit just before this one.
 */

const express = require('express');
const { appendFile } = require('fs');

// Setting up the Express app object
const app = express(); // Initialize the Express app object. Not an instance of this file (app.js).

// Listen for incoming messages
app.listen(3000); // Listen on port 3000. This returs an instance of the server so we could save it and work with it.

// Listen for GET requests for the root of the domain ('/').
app.get('/', (req, res) => {
    
    // res.send('<p>Hello world!</p>'); // This Express method infers the content type and status code and sets these headers for us.

    // Sending HTML from a file
    res.sendFile('./views/index.html', { root: __dirname }); // We need to tell express that this is a relative path. Express looks for a direct path by default. This is what the root: paramater is doing.
});

app.get('/about', (req, res) => {
    
    // res.send('<p>About</p>');

    res.sendFile('./views/about.html', { root: __dirname });
});

// Redirect from about-us to about
app.get('/about-us', (req, res) => {
    res.redirect('/about'); // Automatically sets the status code for the redirect.
});

// Handling invalid URLs by redirecting that request to the 404 page. If no match is found in any of the above functions, this function will fire. If a match is found above, this function will never run.
// This function does not take in a URL as a parameter b/c it fires for any request. This is why this one must be at the bottom of the file. It is the default case if all others don't match the incoming request. If you move this up in the code, it will cause other valid URLs to go to the 404 page.
// This method does not automatically know that we're handling a 404 or serving any other kind of page for that matter. So we have to specify with the .status() function.
// This method is used to run middleware
app.use( (req, res) => { 
    res.status(404).sendFile('./views/404.html', { root: __dirname }); // This is setting the status code and sending the contents of the specified file.
});

