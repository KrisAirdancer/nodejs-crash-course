// This file defines a model for a blog post.

const mongoose = require('mongoose');
const Scheme = monggose.Scheme; // .Scheme is a constructor function

// This defines a scheme for a blog post
const postScheme = new Scheme({
    title: {
        type: String,
        required: true
    },
    snippet: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    }
}, { timestamps: true }); // This will automatically genrate timestamps on each blog object

// This will mean that mongoose is looking for the "Posts" collection in the MongoDB database. The name it looks for is the plural of the passed name.
const Post = mongoose.model('Post', postScheme);

// Exporting this module so that it can be used elsewhere in the project.
module.exports = Post;