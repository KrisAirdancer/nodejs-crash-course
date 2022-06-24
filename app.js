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
const morgan = require('morgan'); // A middleware package for logging
const mongoose = require('mongoose');
const Post = require('./models/post')
require('dotenv/config');

// Setting up the Express app object
const app = express(); // Initialize the Express app object. Not an instance of this file (app.js).

// Connect to MongoDB
// We only begin listening for incoming requests from the browser if we successfuly establish a connection with the database. If we haven't connected to the database, we won't be able to return any data to the browser, so there is no point in connecting.
const dbURI = `mongodb+srv://${process.env.MONGODB_ATLAS_USER}:${process.env.MONGODB_ATLAS_PWD}@nodejs-cluster.tp6w6.mongodb.net/nodejs-database?retryWrites=true&w=majority`;
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true }) // This establishes a connection asynchronously to the database using the database connection string. The passed options are optional. We don't need them to establish a connection.
    .then( (result) => { app.listen(3000) }) // When the Promise is returned, this callback is fired. It is not required to add this, but we can use it to confirm that a connection was established.
    .catch( (err) => { console.log(err.message)}); // This function is for catching errors if they occur


// Register view engine (specify that this is the view engine this project is using - you should only ever use one)
app.set('view engine', 'ejs');
// EJS looks in the views folder for its files by default. This is changing that from the default "views" to "myviews"
// app.set('views', "myviews"); // We aren't changing the directory for EJS files.

// Allows app.js to use functions that can parse URL encoded data.
app.use(express.urlencoded({ extended: true }));

// Middleware & Static Files
app.use(express.static('public')); // This makes the directory 'public' and all of it's contents available to the frontend.

// Setting up logging with morgan. This loggs information to the console.
app.use(morgan('dev'));

// End MongoDB database functions

// Listen for GET requests for the root of the domain ('/').
app.get('/', (req, res) => {
    res.redirect('/posts'); // Redirects homepage traffic to the page displaying all of the blog posts.
});

// Builds the about page.
app.get('/about', (req, res) => {
    res.render('about', { title: 'About'} );
});

// Builds a page that displays all of the blog posts on it.
app.get('/posts', (req, res) => {
    Post.find().sort({ createdAt: -1 }) // Sorts the returned data based on the time it was created (createdAt) in descending order (-1).
        .then( (result) => {
            res.render('index', { title: 'All Posts', posts: result }); // This sends the retrieved data to the browser. The "title" tag matches the HTML tag in head.ejs partial and therefore MUST include it. The "blogs" field is sending over the data itself (the data is stored in "result").
        })
        .catch( (err) => {
            console.log(err.message);
        })
});

// Sends a new blog post to the database.
app.post('/posts', (req, res) => {
    // req.body contains all of the information from the submitted new blog post form. But we can only parse the data as a string if we use the .urlencoded middleware.
    const post = new Post(req.body); // This property (req.body) is made readable in app.js by the app.use(express.urlencoded()) call above.

    post.save()
        .then( (result) => {
            res.redirect('/posts');
        })
        .catch( (err) => {
            console.log(err.message);
        })
});

app.get('/posts/create', (req, res) => {
    res.render('create', { title: 'Create'} );
});

// We must use the colon in front of the route parameter. If we don't, it will be interpreted as a string literal.
app.get('/posts/:id', (req, res) => {
    const id = req.params.id; // This gets the ID from the path that was generated in the browser by the JavaScript. I think. Something close to that. It definitely isn't accessing the database.
    // console.log(id); // This just logs the id to the console to show that it is working.
    Post.findById(id) // This retrieves the post associated with the ID from the database.
        .then(result => {
            res.render('details', { post: result, title: 'Post Details' }); // 'details' is the view (an file called details.ejs) that contains the HTML outline of the page.
        })
        .catch(err => {
            console.log(err.message);
        })
});


app.delete('/posts/:id', (req, res) => {
    const id = req.params.id;
    
    Post.findByIdAndDelete(id)
      .then(result => {
        res.json({ redirect: '/posts' });
      })
      .catch(err => {
        console.log(err.message);
      });
  });

// Handling invalid URLs by redirecting that request to the 404 page. If no match is found in any of the above functions, this function will fire. If a match is found above, this function will never run.
// This function does not take in a URL as a parameter b/c it fires for any request. This is why this one must be at the bottom of the file. It is the default case if all others don't match the incoming request. If you move this up in the code, it will cause other valid URLs to go to the 404 page.
// This method does not automatically know that we're handling a 404 or serving any other kind of page for that matter. So we have to specify with the .status() function.
// This method is used to run middleware
app.use( (req, res) => { 
    res.status(404).render('404', { title: '404'} );
});

