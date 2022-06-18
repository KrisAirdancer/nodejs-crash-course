const fs = require('fs');

// READING FILES

// This method is asynchronos
// fs.readFile('./docs/ipsum-post.txt', (err, data) => {
//     if (err) {
//         console.log(err.message);
//     }
//     console.log(data.toString());
// });

// WRITING FILES

const message = "Hello world!"

// This method is asynchronos - all asynchronos functions have callbacks
// This will create a new file if the requested file doesn't exist.
// fs.writeFile('./docs/ipsum-post.txt', message, () => {
//     console.log('File was written.')
// });

// DIRECTORIES

// This method creates a new directory.
// We get an error if the directory already exists.
// if (!fs.existsSync('./assets')) { // This method is blocking (synchronous), therefore it will stop the code until it completes.

//     fs.mkdir('./assets', (err) => {
//         if (err) {
//             console.log(err.message);
//         }
//         console.log('Directory created.')
//     });
// } else { // Removes the directory if it already exists.
//     fs.rmdir('./assets', (err) => {
//         if (err) {
//             console.log(err.message);
//         }
//         console.log('Directory deleted.')
//     });
// }

// DELETING FILES

// This deletes a file. To test this, manually create a file called "deleteme.txt" and then run this code.
if (fs.existsSync('./docs/deleteme.txt')) {
    fs.unlink('./docs/deleteme.txt', (err) => {
        if (err) {
            console.log(err.message);
        }
        console.log('File deleted.')
    });
}







