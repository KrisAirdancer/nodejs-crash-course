// This file defines all of the routes for '/posts'.

// Here, instead of attaching all of our handlers to the 'app' object (as defined by app.js), we attach all of our handlers to the Router object. The Router is like a min app.js. We have to export the Router object (see bottom of file) for use as an import inside app.js.

const express = require('express');
const Post = require('../models/post')

const router = express.Router();

// Builds a page that displays all of the blog posts on it.
router.get('/', (req, res) => {
    Post.find().sort({ createdAt: -1 }) // Sorts the returned data based on the time it was created (createdAt) in descending order (-1).
        .then( (result) => {
            res.render('index', { title: 'All Posts', posts: result }); // This sends the retrieved data to the browser. The "title" tag matches the HTML tag in head.ejs partial and therefore MUST include it. The "blogs" field is sending over the data itself (the data is stored in "result").
        })
        .catch( (err) => {
            console.log(err.message);
        })
});

// Sends a new blog post to the database.
router.post('/posts', (req, res) => {
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

router.get('/create', (req, res) => {
    res.render('create', { title: 'Create'} );
});

// We must use the colon in front of the route parameter. If we don't, it will be interpreted as a string literal.
router.get('/:id', (req, res) => {
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


router.delete('/:id', (req, res) => {
    const id = req.params.id;
    
    Post.findByIdAndDelete(id)
      .then(result => {
        res.json({ redirect: '/posts' });
      })
      .catch(err => {
        console.log(err.message);
      });
  });

  module.exports = router;