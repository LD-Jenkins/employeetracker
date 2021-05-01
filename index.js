const inq = require('inquirer');
const Setup = require('./trackerdb');
const connection = require('./config/connection').connection;

connection.then(() => { main() });

const db = new Setup();

const choicesObj = {
  'Add Department': () => {return getDeptInfo().then((ans) => db.addDept(ans))},
  'Add Role': () => db.addRole(),
  'Add Employee': () => db.addEmp(),
  'Delete Department': () => db.deleteDept(),
  'Delete Role': () => db.deleteRole(),
  'Delete Employee': () => db.deleteEmp(),
  'Update Employee Role': () => db.updateEmpRole(),
  'Update Employee Manager': () => db.updateEmpManager(),
  'View Departments': () => db.viewDepts(),
  'View Roles': () => db.viewRoles(),
  'View Employees': () => db.viewEmps(),
  'View Employees By Deptartment': () => db.viewEmpByDept(),
  'View Employee By Role': () => db.viewEmpByRole(),
  'View Employee By Manager': () => db.viewEmpByMan(),
  'Quit': () => console.log('Goodbye!')
};

const mainChoices = Object.keys(choicesObj);

const menu = () => {
  return inq.prompt([
    {
      type: 'list',
      name: 'menu',
      message: 'What would you like to do?',
      choices: mainChoices
    }
  ])
  .then(ans => {
    return ans.menu;
  });
}

const getDeptInfo = () => {
  return inq.prompt([
    {
      name: 'name',
      message: 'Department name?'
    }
  ])
  .then(ans => {
    return ans.name;
  });
}

async function main() {

  let quit = false;

  while (!quit) {

    const ans = await menu();
    
    if (ans === 'Quit') {
      quit = true;
      await choicesObj[ans]();
    } else {
      await choicesObj[ans]();
    }

  }

  process.exit();
}




