// lib/db.js
import mysql from "mysql2/promise";

export async function getConnection() {
  return await mysql.createConnection({
    host: "localhost", // Your MySQL host
    user: "mazedanetworks_miraz", // Your MySQL user
    password: "h[JMkzARs8x6", // Your MySQL password
    database: "mazedanetworks_mazeda_nextjs", // Your MySQL database name
  });
}
