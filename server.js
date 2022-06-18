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
    // console.log(req); // This returns the entire request object contents.
    console.log(req.url, req.method); // If you type just 'req', the entire request will be printed. No need to call toString

    // The following are the slopy way to send text. Use a .html file instead.

    // Headers are used by the browser to determine what kind of information it is recieving. Such as data type (JSON, HTML, etc.) or setting cookies.
    // Set header content type
    // res.setHeader('Content-Type', 'text/plain'); // Sending plain text to the browser.
    // res.write("Hello world!"); // This sends information back to the browser.
    
    res.setHeader('Content-Type', 'text/html');
    // The browser will automatically add header html tags to the site if we don't. But we did, so it won't.
    res.write('<head><link rel="styleseet" href="#"></head>')
    res.write('<p>Hello world!</p>');
    res.write('<p>Hello slime mold!</p>');

    res.end(); // Ends the response and sends the information to the browser. This is the step that sends the data.
});

// This tells the server to listen on the specified port at the specified address.
// The callback fires when we start listening for requests as a notification that listening has started.
server.listen(3000, 'localhost', () => {
    console.log('listening on port 3000');
});



