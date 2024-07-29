const express = require('express'); // Imports the Express module to handle HTTP requests
const router = express.Router(); // Creates a new router object for handling routes


  let  applications= [
      {
        name: "Instagram",
        description: "Connect people from home",
        release_date: "2010-12-12",
        version: 2.2,
        ratings: 5,
        genre: "game",
        id: "967a"
      },
      {
        id: "21a8",
        name: "Temple run",
        description: "Dream game",
        release_date: "2024-07-02",
        version: 2.4,
        ratings: 4,
        genre: "game"
      }
    ];
// Route to get all users
router.get("/", (req, res) => {
    res.send(applications); // Sends the list of users as the response
});
// Browser/Postman Path: GET http://localhost:5002/user/

// Route to get a user by email
router.get("/:id", (req, res) => {
    const id = req.params.id; // Extracts the email parameter from the request URL
    let filtered_applications = applications.filter(app => app.id === id); // Finds the user with the matching email
    res.send(filtered_applications); // Sends the matching user(s) as the response
});
// Browser/Postman Path: GET http://localhost:5002/user/KrishnaKanth@gmail.com

// Route to delete a user by email
router.delete("/:id", (req, res) => {
    const id = req.params.id; // Extracts the email parameter from the request URL
    applications = applications.filter(app => app.id != id); // Removes the user with the matching email
    res.send(`User with the id ${id} deleted.`); // Sends a response indicating the user has been deleted
});
// Postman Path: DELETE http://localhost:5002/user/KrishnaKanth@gmail.com

// Route to add a new user
router.post("/", (req, res) => {
    applications.push({
        "id": req.query.id, // Adds the new user's first name from the query parameters
        "name": req.query.name,   // Adds the new user's last name from the query parameters
        "description": req.query.description,         // Adds the new user's email from the query parameters
        "release_date": req.query.release_date,
        "version" :  req.query.version,     // Adds the new user's age from the query parameters
        "ratings" :req.query.ratings,
       "genre":req.query.genre
   
    });
    res.send("The app has been added"); // Sends a response indicating the user has been added
});
// Postman Path: POST http://localhost:5002/user/
// Query parameters: firstName, lastName, email, age

// Route to update an existing user by email
router.put("/:id", (req, res) => {
    const id = req.params.id; // Extracts the email parameter from the request URL
    let filtered_applications = applications.filter(app => app.id === id); // Finds the user with the matching email

    if (filtered_applications.length > 0) {
        let filtered_application = filtered_applications[0]; // Gets the first matching user

        // Updates the user's details if new values are provided
        let name = req.query.name;
        let description = req.query.description;
        let release_date = req.query.release_date;
        let version = req.query.version;
        let ratings = req.query.ratings;
        let genre = req.query.genre;
        if (name) {
            filtered_application.name = name;
        }
        if (description) {
            filtered_application.description = description;
        }
        if (release_date) {
            filtered_application.release_date = release_date;
        }
        if (version) {
            filtered_application.version = version;
        }
        if (ratings) {
            filtered_application.ratings = ratings;
        }
        if (genre) {
            filtered_application.genre = genre;
        }

        // Updates the users array with the modified user
        applications = applications.filter(app => app.id != id); // Removes the old user data
        applications.push(filtered_application); // Adds the updated user data

        res.send("App has been updated!"); // Sends a response indicating the user has been updated
    } else {
        res.send("Unable to find app!"); // Sends a response indicating the user was not found
    }
});
// Postman Path: PUT http://localhost:5002/user/KrishnaKanth@gmail.com
// Query parameters: firstName, lastName, age

module.exports = router; // Exports the router to be used in the main server file
