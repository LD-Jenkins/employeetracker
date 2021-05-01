const tableify = require('console.table');
const conn = require('./config/connection').conn;

function db() {

  console.log('in db');
  // const conn = await connection();
  // await conn.connect();
  
  
  this.addDept = (name) => {
    console.log('in addDept');
    conn.query(`INSERT INTO department(name) VALUES ('${name}')`, (err) => {
      if (err) console.log(err);
    });
  };

  this.addRole = (title, salary, id) => {
    conn.query(`INSERT INTO role (title, salary, department_id) VALUES (${title}, ${salary}, ${id})`, (err) => {
      if (err) throw err;
    });
  };

  this.addEmp = (eFirst, eLast, role, mFirst, mLast) => {
    let roleId;
    let manId;

    conn.query(`SELECT m.id FROM employee m WHERE m.first_name = ${mFirst} AND m.last_name = ${mLast}`, (err, res) => {
      if (err) throw err;
      manId = res[0].id;
    });

    conn.query(`SELECT r.id FROM role r WHERE r.title = ${role}`, (err, res) => {
      if (err) throw err;
      roleId = res[0].id;
    });

    conn.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (${eFirst}, ${eLast}, ${roleId}, ${manId})`, (err) => {
      if (err) throw err;
    });
  };

  this.viewDepts = () => {
    conn.query('SELECT name AS Department FROM department', (err, res) => {
      if (err) throw err;
      console.table(res);
    });
  }

  this.viewRoles = () => {
    conn.query(
      `SELECT r.title AS Role, r.salary AS Salary, d.name AS Department
      FROM role r
      LEFT JOIN department d ON d.id = r.department_id
      `, (err, res) => {
      if (err) throw err;
      console.table(res);
    });
  }

  this.viewEmps = () => {
    conn.query(
      `SELECT CONCAT(e.first_name, ' ', e.last_name) AS Employee, d.name AS Department, r.title AS Role, r.salary AS Salary, CONCAT(m.first_name, ' ', m.last_name) AS Manager
      FROM employee e
      LEFT JOIN
      (
      SELECT id, title, salary, department_id
      FROM role
      ) r ON r.id = e.role_id
      LEFT JOIN
      (
      SELECT id, name
      FROM department
      ) d ON d.id = r.department_id
      LEFT JOIN
      (
      SELECT id, first_name, last_name, manager_id
      FROM employee
      ) m ON e.manager_id = m.id`, (err, res) => {
      if (err) throw err;
      console.table(res);
    });
  }

  this.viewEmpByDept = (dept) => {
    conn.query(
      `SELECT CONCAT(e.first_name, ' ', e.last_name) AS Employee, d.name AS Department, r.title AS Role, r.salary AS Salary, CONCAT(m.first_name, ' ', m.last_name) AS Manager
      FROM employee e
      LEFT JOIN
      (
      SELECT id, title, salary, department_id
      FROM role
      ) r ON r.id = e.role_id
      LEFT JOIN
      (
      SELECT id, name
      FROM department
      ) d ON d.id = r.department_id
      LEFT JOIN
      (
      SELECT id, first_name, last_name, manager_id
      FROM employee
      ) m ON e.manager_id = m.id
      WHERE d.name = ${dept}`, (err, res) => {
        if (err) throw err;
        console.table(res);
    });
  }

  this.viewEmpByRole = (role) => {
    conn.query(
      `SELECT CONCAT(e.first_name, ' ', e.last_name) AS Employee, d.name AS Department, r.title AS Role, r.salary AS Salary, CONCAT(m.first_name, ' ', m.last_name) AS Manager
      FROM employee e
      LEFT JOIN
      (
      SELECT id, title, salary, department_id
      FROM role
      ) r ON r.id = e.role_id
      LEFT JOIN
      (
      SELECT id, name
      FROM department
      ) d ON d.id = r.department_id
      LEFT JOIN
      (
      SELECT id, first_name, last_name, manager_id
      FROM employee
      ) m ON e.manager_id = m.id
      WHERE r.title = ${role}`, (err, res) => {
        if (err) throw err;
        console.table(res);
    });
  }

  this.viewEmpByMan = (first, last) => {
    conn.query(
      `SELECT CONCAT(e.first_name, ' ', e.last_name) AS Employee, d.name AS Department, r.title AS Role, r.salary AS Salary, CONCAT(m.first_name, ' ', m.last_name) AS Manager
      FROM employee e
      LEFT JOIN
      (
      SELECT id, title, salary, department_id
      FROM role
      ) r ON r.id = e.role_id
      LEFT JOIN
      (
      SELECT id, name
      FROM department
      ) d ON d.id = r.department_id
      LEFT JOIN
      (
      SELECT id, first_name, last_name, manager_id
      FROM employee
      ) m ON e.manager_id = m.id
      WHERE m.first_name = ${first} AND m.last_name = ${last}`, (err, res) => {
        if (err) throw err;
        console.table(res);
    });
  }

  this.updateEmpRole = (first, last, role) => {
    let roleId;

    conn.query(`SELECT r.id FROM role r WHERE r.title = ${role}`, (err, res) => {
      if (err) throw err;
      roleId = res[0].id;
    });

    conn.query(`UPDATE employee e SET role_id = ${roleId} WHERE e.first_name = ${first} AND e.last_name = ${last}`, (err) => {
      if (err) throw err;
      console.log('Employee role updated.')
    });
  }

  this.updateEmpManager = (eFirst, eLast, mFirst, mLast) => {
    let manId;

    conn.query(`SELECT m.id FROM employee m WHERE m.first_name = ${mFirst} AND m.last_name = ${mLast}`, (err, res) => {
      if (err) throw err;
      manId = res[0].id;
    });

    conn.query(`UPDATE employee e SET manager_id = ${manId} WHERE e.first_name = ${eFirst} AND e.last_name = ${eLast}`, (err) => {
      if (err) throw err;
      console.log('Employee manager updated.')
    });
  }

  this.deleteDept = (dept) => {
    conn.query(`DELETE FROM department WHERE name = ${dept}`, (err) => {
      if (err) throw err;
      console.log('Department deleted.')
    })
  }

  this.deleteRole = (role) => {
    conn.query(`DELETE FROM role WHERE title = ${role}`, (err) => {
      if (err) throw err;
      console.log('Role deleted.')
    })
  }

  this.deleteEmp = (first, last) => {
    conn.query(`DELETE FROM employee WHERE first_name = ${first} AND last_name = ${last}`, (err) => {
      if (err) throw err;
      console.log('Employee deleted.')
    })
  }
}

module.exports = db;

