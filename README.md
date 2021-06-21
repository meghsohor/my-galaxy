# JS Frontend Test
The project is built with **React, React-Router, Axios, Material UI**.
## Run the project

In the project directory:

```bash
# Install dependenicies
npm install
# Run the FE project and the BE mock server simultaniously
npm run dev
# Run the test suit
npm run test
```

## Task 0 - a little bit of writing 

   * What’s your proudest achievement? It can be a personal project or something you’ve worked on professionally. Just a short paragraph is fine, but we’d love to know why you’re proud of it.
   * **Ans:** My personal blog site ([www.meghsohor.com](https://www.meghsohor.com/)) which I built using Gatsby JS and deployed the site in Netlify. The site I built from the scratch and it was my first Gatsby project. Not only I learned new technologies when I worked on this project but also I managed to cut down the hosting cost by moving the site in Netlify for free of charge.
   
   * Tell us about a technical book or article you read recently, why you liked it, and why we should read it as well.
   * **Ans:** I have recently read this article from Stackblitz: [Run Node js in the Web Browsers](https://blog.stackblitz.com/posts/introducing-webcontainers/). Here the author talks about a new technology called **WebContainer** that allows to run Node.js server in the web browsers. This technology has many significant benefits like: 1) Faster than local environment 2) Debugging Node applications in the browser 3) Secured environment etc.


## Task 1 - Show a static HTML page

   * Add an index.html with a headline to your project with a simple "Hello World"
   * Include a css-file and a js-file
   * Open the page in the browser, it should display the page and load the css- and js-file.


## Task 2 - Add a Menu & Single-Page-Site

   * Add a menu to your page with the three entries:
      * Universes
      * Stars
      * Imprint
   * The three pages should be navigable and it should be a single page website
   * What could the design of the site look like? Implement some of your ideas.
   * Use a logo of your choice for the site 
   * BONUS: The current page is highlighted in the menu


## Task 3 - Loading Data from a REST-Service

   * Display all Universes and Stars provided by the mock server 
   * A simple table on the "universes"-site for displaying all universes
   * A simple table on the "stars"-site for displaying all the stars
   * HINT: A simple table means a simple representation - just display the info
   * BONUSES:
      * Universes: display the maximum and current size
      * Stars: display the name of the universe
      * Use the color of the star for some CSS styling (the colors are RED, BLUE, GREEN, YELLOW, BLACK)

If you start the json-server with the mocked data it will present you with the list of available resource paths.


## Task 4 - JavaScript Toolchain

   * Use a CSS-Preprocessor to generate your CSS
   * Minify your CSS and JS and use the minified version in your application
   * HINT You don't need to automate the CSS-Preprocessor or minifying
   * BONUS-Task: Use a build tool or task runner to automate the build of your application
      * Do this only if you can do this fast enough, don't waste time


## Task 5 - Test your application

   * Implement at least one test that encodes the business rules of your application
   * It is ok if the test(s) is called manually
   * BONUS: your test(s) run without network access to the api (json-server)


## Task 6 - CRUD for universes

   * Add a "Create-Universe-View" to the universe site where you can add a new universe. Each universe should have a unique id. 
   * Add a "Details-Universe-View" to the universe where you display only the stars from this universe
   * Add a "Create-Star-View" in the details view where you can add a star to the universe. A star can only be added to an existing universe.
   * Add a "Delete-Star-Button" to the details view where you can delete a star.
   * BONUS: The details view for a given universe can be reached with a deep link (e.g. ```http://localhost:1234/.../universes/<id>```)

