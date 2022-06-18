// Node.js servers are different from other languages like PHP. PHP doesn't build the server, instead, it is run by server software like Apache or NginX.
// In Node.js, we write the server code ourselves (normally Apache would do this) and handle all of the requests from the browsser ourselves. The developer has to handle everything.
// This server listens for requests and responds to those requests using the logic we create.

// This file does not have to be called 'server.js' - it can be anything we want.

const http = require('http');

// This creates a server (and server object) AND stores it in a variable so it can be accessed if we need.
// const server = http.createServer();

// This runs every time a request is made of the server by the browser. The callback fires every time this method is called, therefore, it fires every time the browser sends a message to the server.
const server = http.createServer( (req, res) => { // req = request (incomming messages from browser), res = response (outgoing messages written and sent by us)
    console.log('request made');
});

// This tells the server to listen on the specified port at the specified address.
// The callback fires when we start listening for requests as a notification that listening has started.
server.listen(3000, 'localhost', () => {
    console.log('listening on port 3000');
});



