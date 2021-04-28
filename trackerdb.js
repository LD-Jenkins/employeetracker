const mysql = require('mysql');
const tableify = require('console.table');

const conn = mysql.createConnection({
  host: process.env.DBHOST,
  port: process.env.DBPORT,
  user: process.env.DBUSER,
  password: process.env.DBPASS
});

conn.connect(function (err) {
  if (err) throw err;

  console.log("Connected!");

  conn.query("CREATE DATABASE IF NOT EXISTS trackerdb", function (err, result) {
    if (err) throw err;

    console.log("Database created");
  });
});

const createDeptTbl = "CREATE TABLE department (id INT PRIMARY KEY, name VARCHAR(30)"
const createRoleTbl = "CREATE TABLE role (id INT PRIMARY KEY, title VARCHAR(30), salary DECIMAL, department_id INT)"
const createEmpTbl = "CREATE TABLE employee (id INT PRIMARY KEY, first_name VARCHAR(30), last_name VARCHAR(30), role_id INT, manager_id INT)";

conn.query(createDeptTbl, function (err, result) {
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

const db = () => {
  
  this.addDept = (name) => {
    conn.query(`INSERT INTO department (name) VALUES (${name})`, (err) => {
      if (err) throw err;
    });
  };

  this.addRole = (title, salary, id) => {
    conn.query(`INSERT INTO role (title, salary, department_id) VALUES (${title}, ${salary}, ${id})`, (err) => {
      if (err) throw err;
    });
  };

  this.addEmp = (fname, lname, roleId, manId) => {
    conn.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (${fname}, ${lname}, ${roleId}, ${manId})`, (err) => {
      if (err) throw err;
    });
  };

  this.viewDepts = () => {
    conn.query('SELECT * FROM department', (err, res) => {
      if (err) throw err;
      console.table(res);
    });
  }

  this.viewRoles = () => {
    conn.query('SELECT * FROM role', (err, res) => {
      if (err) throw err;
      console.table(res);
    });
  }

  this.viewEmps = () => {
    conn.query('SELECT * FROM employee', (err, res) => {
      if (err) throw err;
      console.table(res);
    });
  }

  this.viewEmpByDept = (dept) => {
    conn.query(`SELECT id FROM department WHERE (name = '${dept}')`, (err, res) => {
      if (err) throw err;
      conn.query(`SELECT id FROM role WHERE (department_id = '${res}')`, (err, res) => {
        if (err) throw err;
        conn.query(`SELECT * FROM employee WHERE (role_id = '${res}')`, (err, res) => {
          if (err) throw err;
          console.table(res);
        });
      });
    });
  }

  this.viewEmpByRole = (role) => {
    conn.query(`SELECT id FROM role WHERE (title = '${role}')`, (err, res) => {
      if (err) throw err;
      conn.query(`SELECT * FROM employee WHERE (role_id = '${res}')`, (err, res) => {
        if (err) throw err;
        console.table(res);
      });
    });
  }

  this.viewEmpByMan = (man) => {
    
  }
}

module.exports = db;

