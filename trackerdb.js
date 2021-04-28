const mysql = require('mysql');

const conn = mysql.createConnection({
  host: process.env.DBHOST,
  port: process.env.DBPORT,
  user: process.env.DBUSER,
  password: process.env.DBPASS
});

conn.connect(function (err) {
  if (err) throw err;

  console.log("Connected!");

  conn.query("CREATE DATABASE trackerdb", function (err, result) {
    if (err) throw err;

    console.log("Database created");
  });
});

let createDepTbl = "CREATE TABLE department (id INT PRIMARY KEY, name VARCHAR(30)"
let createRoleTbl = "CREATE TABLE role (id INT PRIMARY KEY, title VARCHAR(30), salary DECIMAL, department_id INT)"
let createEmpTbl = "CREATE TABLE employees (id INT, name VARCHAR(255), age INT(3), city VARCHAR(255))";

conn.query(createDepTbl, function (err, result) {
  if (err) throw err;
  console.log("Department table created");
});

conn.query(createRoleTbl, function (err, result) {
  if (err) throw err;
  console.log("Role table created");
});

conn.query(createEmpTbl, function (err, result) {
  if (err) throw err;
  console.log("Employee table created");
});