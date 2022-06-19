// Node.js servers are different from other languages like PHP. PHP doesn't build the server, instead, it is run by server software like Apache or NginX.
// In Node.js, we write the server code ourselves (normally Apache would do this) and handle all of the requests from the browsser ourselves. The developer has to handle everything.
// This server listens for requests and responds to those requests using the logic we create.

// This file does not have to be called 'server.js' - it can be anything we want.

const http = require('http');
const fs = require('fs');

// This creates a server (and server object) AND stores it in a variable so it can be accessed if we need.
// const server = http.createServer();

// This runs every time a request is made of the server by the browser. The callback fires every time this method is called, therefore, it fires every time the browser sends a message to the server.
const server = http.createServer( (req, res) => { // req = request (incomming messages from browser), res = response (outgoing messages written and sent by us)
    console.log('request made');
    // console.log(req); // This returns the entire request object contents.
    console.log(req.url, req.method); // If you type just 'req', the entire request will be printed. No need to call toString

    // Send HTML file
    res.setHeader('Content-Type', 'text/html');

    // This determines which URL the user went to and builds a directory path to the file that should be returned based on the page the requested. This path is used below to send the correct HTML page.
    let path = './views/'; // This just allows us to not have to type this part of the path over and over again below.
    switch (req.url) {
        case '/':
            path += 'index.html';
            res.statusCode = 200; // Setting the status code that gets sent with the response with the response.
            break;
        case '/about':
            path += 'about.html';
            res.statusCode = 200;
            break;
        case '/about-me': // This is a redirect from the URL about-me to about. Such as if we originally had the about page named about-me but later changed it to about.
            res.setHeader('Location', '/about'); // This does the redirect. It changes the URL that the user sees in their browser and directs them to the about page instead of the non-extant about-me page.
            res.statusCode = 301; // 301 code says the resource has been permenately moved
            break;
        default:
            path += '404.html';
            res.statusCode = 404;
            break;
    }

    // Sending the HTML file
    // The path is determined by the switch statement above
    fs.readFile(path, (err, data) => { // This reads the file and fires a callback that either returns an error or the information read from the file.
        if (err) {
            console.log(err.message);
            res.end(); // If you don't kill the request here, the request will be left hanging.
        } else {
            res.write(data); // Sends the data to the browser.
            res.end();
            // res.end(data); // This is a shorthand if you are sending only a single thing. The .end function can do it.
        }
    });
});

// This tells the server to listen on the specified port at the specified address.
// The callback fires when we start listening for requests as a notification that listening has started.
server.listen(3000, 'localhost', () => {
    console.log('listening on port 3000');
});



