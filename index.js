const inq = require('inquirer');
const Setup = require('./trackerdb');
const connection = require('./config/connection').connection;

connection.then(() => { main() });

const db = new Setup();

const choicesObj = {
  'Add Department': () => {return getDeptInfo().then((ans) => db.addDept(ans.name))},
  'Add Role': () => {return getRoleInfo().then((ans) => db.addRole(ans.title, ans.salary, ans.name))},
  'Add Employee': () => {return getEmpInfo().then((ans) => db.addEmp(ans.eFirst, ans.eLast, ans.role, ans.mFirst, ans.mLast))},
  'Delete Department': () => {return getDeptInfoDelete().then((ans) => db.deleteDept(ans.name))},
  'Delete Role': () => {return getRoleInfoDelete().then((ans) => db.deleteRole(ans.title))},
  'Delete Employee': () => {return getEmpInfoDelete().then((ans) => db.deleteEmp(ans.eFirst, ans.eLast))},
  'Update Employee Role': () => {return getEmpInfoUR().then((ans) => db.updateEmpRole(ans.eFirst, ans.eLast, ans.role))},
  'Update Employee Manager': () => {return getEmpInfoUM().then((ans) => db.updateEmpManager(ans.eFirst, ans.eLast, ans.mFirst, ans.mLast))},
  'View Departments': () => db.viewDepts(),
  'View Roles': () => db.viewRoles(),
  'View Employees': () => db.viewEmps(),
  'View Employees By Deptartment': () => {return getEmpInfoViewByDept().then((ans) => db.viewEmpByDept(ans.name))},
  'View Employee By Role': () => {return getEmpInfoViewByRole().then((ans) => db.viewEmpByRole(ans.title))},
  'View Employee By Manager': () => {return getEmpInfoViewByMan().then((ans) => db.viewEmpByMan(ans.mFirst, ans.mLast))},
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

const getRoleInfo = () => {
  return inq.prompt([
    {
      name: 'title',
      message: 'Role title?'
    },
    {
      name: 'salary',
      message: 'Role salary?'
    },
    {
      name: 'name',
      message: 'What department does this role belong to?'
    }
  ])
  .then(ans => {
    return ans;
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
    return ans;
  });
}

const getEmpInfo = () => {
  return inq.prompt([
    {
      name: 'eFirst',
      message: 'Employee\'s first name?'
    },
    {
      name: 'eLast',
      message: 'Employee\'s last name?'
    },
    {
      name: 'role',
      message: 'Employee\'s role title?'
    },
    {
      name: 'mFirst',
      message: 'Employee\'s manager\'s first name?'
    },
    {
      name: 'mLast',
      message: 'Employee\'s manager\'s last name?'
    }
  ])
  .then(ans => {
    return ans;
  });
}

const getEmpInfoUR = () => {
  return inq.prompt([
    {
      name: 'eFirst',
      message: 'Employee\'s first name?'
    },
    {
      name: 'eLast',
      message: 'Employee\'s last name?'
    },
    {
      name: 'role',
      message: 'Employee\'s new role title?'
    }
  ])
  .then(ans => {
    return ans;
  });
}

const getEmpInfoUM = () => {
  return inq.prompt([
    {
      name: 'eFirst',
      message: 'Employee\'s first name?'
    },
    {
      name: 'eLast',
      message: 'Employee\'s last name?'
    },
    {
      name: 'mFirst',
      message: 'Employee\'s new manager\'s first name?'
    },
    {
      name: 'mLast',
      message: 'Employee\'s new manager\'s last name?'
    }
  ])
  .then(ans => {
    return ans;
  });
}

const getRoleInfoDelete = () => {
  return inq.prompt([
    {
      name: 'title',
      message: 'Role title to delete?'
    }
  ])
  .then(ans => {
    return ans;
  });
}

const getDeptInfoDelete = () => {
  return inq.prompt([
    {
      name: 'name',
      message: 'Department name to delete?'
    }
  ])
  .then(ans => {
    return ans;
  });
}

const getEmpInfoDelete = () => {
  return inq.prompt([
    {
      name: 'eFirst',
      message: 'Employee\'s first name?'
    },
    {
      name: 'eLast',
      message: 'Employee\'s last name?'
    }
  ])
  .then(ans => {
    return ans;
  });
}

const getEmpInfoViewByDept = () => {
  return inq.prompt([
    {
      name: 'name',
      message: 'Department name?'
    }
  ])
  .then(ans => {
    return ans;
  });
}

const getEmpInfoViewByRole = () => {
  return inq.prompt([
    {
      name: 'title',
      message: 'Role title?'
    }
  ])
  .then(ans => {
    return ans;
  });
}

const getEmpInfoViewByMan = () => {
  return inq.prompt([
    {
      name: 'mFirst',
      message: 'Manager\'s first name?'
    },
    {
      name: 'mLast',
      message: 'Manager\'s last name?'
    }
  ])
  .then(ans => {
    return ans;
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

process.on('SIGINT', () => {
  process.exit();
});
