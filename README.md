# nodejs-crash-course
My code from following The Net Ninja's YouTube tutorial on Node.js: https://www.youtube.com/watch?v=zb3Qk8SG5Ms&amp;list=PL4cUxeGkcC9jsz4LDYc6kv3ymONOKxwBU&amp;index=1

**Setting up this project**

- 1. Clone the repository to local.
- 2. Run 'npm install' in the terminal to download all of the requried dependencies.
    - The required dependencies are listed in the projects.json file and will be downloaded by this command.


**Notes**

- The package-lock.json file keeps track of the different dependency versions for our project.
- The package.json file keeps track of details regarding our project.
    - This includes scripts that can be run for our project.
    - keeps track of our project's dependencies.
    - The package.json file can be generated automatically using the terminal command 'npm init' and then answering the questions when prompted. The answers to those questions are placed in the package.json file and can thus be changed there later.
    - The package.json file makes sharing the project easier.
        - The node_modules file could be huge b/c of many dependencies. The package.json file allows us to specify the required dependencies so we can share only the project code, and not the node_modules folder with all of the dependency code, which saves bandwidth and cloud storage space when sharing the project.
        - If we download a project, we can run the 'npm install' command and it will parse the packages.json file and install all of the specified dependencies for us.
- View engines are used to add dynamic content to webpages.
    - We can use HTML syntax, but include variables that get filled from something like a database before sending the HTML to the browser.
    - Some options for view engines inclue Express Handlebars, Pug, or EJS (the one we are using in this tutorial).
- Middleware
    - Code that runs on the server between the server receiving a request and sending a response is middleware.
        - ex. Server gets a request > middleware runs to do something > server sends a response
    - Middleware is generally run using the .use() function.
    - We can have many different middleware running.
    - ex. The .get() function is middleware.
    - Middleware runs top to bottom in the code and will keep running unitl it completes or we tell it to stop.
    - Middleware can be used for...
        - Logging
        - Authentication
        - Parsing JSON requests
        - Returning 404 pages
        - And much, much more!
