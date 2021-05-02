const mysql = require('mysql');
require('dotenv').config();

const conn = mysql.createConnection({
  host: process.env.DBHOST,
  port: process.env.DBPORT,
  user: process.env.DBUSER,
  password: process.env.DBPASS
});

const connection = new Promise((resolve, reject) =>{
  
  const createDeptTbl = "CREATE TABLE IF NOT EXISTS department (id INT NOT NULL AUTO_INCREMENT, name VARCHAR(30), PRIMARY KEY (id))"
  const createRoleTbl = "CREATE TABLE IF NOT EXISTS role (id INT NOT NULL AUTO_INCREMENT, title VARCHAR(30), salary DECIMAL, department_id INT, PRIMARY KEY (id))"
  const createEmpTbl = "CREATE TABLE IF NOT EXISTS employee (id INT NOT NULL AUTO_INCREMENT, first_name VARCHAR(30), last_name VARCHAR(30), role_id INT, manager_id INT, PRIMARY KEY (id))";
  
  conn.connect((err) => {
    if (err) throw err;
    console.log("Connected!");
    
      conn.query("CREATE DATABASE IF NOT EXISTS trackerdb", (err) => {
        if (err) throw err;
        console.log("Database available");
        conn.query("USE trackerdb", (err) => {
          if (err) throw err;
          console.log("Using trackerdb!");
          conn.query(createDeptTbl, function (err, result) {
            if (err) throw err;
            console.log("Department table available");
            conn.query(createRoleTbl, function (err, result) {
              if (err) throw err;
              console.log("Role table available");
              conn.query(createEmpTbl, function (err, result) {
                if (err) throw err;
                console.log("Employee table available");
                resolve();
              });
            });
          });
        });
      });
    });
  }); 


module.exports.connection = connection;
module.exports.conn = conn;