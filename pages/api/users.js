// pages/api/users.js

import mysql from "mysql";

// Create MySQL connection
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "mealready",
});

// Connect to MySQL
connection.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL database:", err);
    return;
  }
  console.log("Connected to MySQL database");
});

// Define API route handler
export default function handler(req, res) {
  // Query to fetch data from mrd_user table
  const query = "SELECT * FROM mrd_user";

  // Execute the query
  connection.query(query, (error, results) => {
    if (error) {
      console.error("Error executing MySQL query:", error);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }

    // Send the results as JSON response
    res.status(200).json(results);
  });
}
