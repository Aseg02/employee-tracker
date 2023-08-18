const db = require('../db/connection.js');

const employeeByManager = `
SELECT a.id, a.first_name, a.last_name, roles.title AS role, departments.name AS department, roles.salary AS salary, CONCAT_WS(' ', b.first_name, b.last_name) AS manager
FROM employees a
LEFT JOIN employees b ON a.manager_id = b.id
LEFT JOIN roles ON a.role_id = roles.id
LEFT JOIN departments ON roles.department_id = departments.id
ORDER BY manager`;

const employeeByDepartment = `
SELECT a.id, a.first_name, a.last_name, roles.title AS role, departments.name AS department, roles.salary AS salary, CONCAT_WS(' ', b.first_name, b.last_name) AS manager
FROM employees a
LEFT JOIN employees b ON a.manager_id = b.id
LEFT JOIN roles ON a.role_id = roles.id
LEFT JOIN departments ON roles.department_id = departments.id
ORDER BY department`;

const employeePrompt = [
    {
        type: 'input',
        name: 'employeeName',
        message: "Please input employees first and last name"
    },
    {
        type: 'list',
        name: 'role',
        message: "What is the employee's role?",
        choices: ['Salesperson', 'Sales Lead', 'Engineer', 'Accountant', 'Legal Team Lead', 'Human Resources']
    },
    {
        type: 'confirm',
        name: 'confirmManager',
        message: 'Does this employee have a manager?',
        default: true
    },
    {
        type: 'list',
        name: 'manager',
        message: "Who is the employee's manager?",
        choices: ['Jon Dmack', 'Don Flounder', 'Jennifer Lopez', 'Chad Brad', 'Sarah Johnson', 'Dean Smith', 'Hannah Allen', 'Melissa Hernandez', 'Dale Donkowski', 'Mike chan'],
        when: ({ confirmManager }) => {
            if (confirmManager) {
                return true;
            } else {
                return false;
            }
        }
    }
];

const getId = (employeeX) => {
    let employeeId;

    if (employeeX === 'Jon Dmack') {employeeId = 1}
    if (employeeX === 'Don Flounder') {employeeId = 2}
    if (employeeX === 'Jennifer Lopez') {employeeId = 3}
    if (employeeX === 'Chad Brad') {employeeId = 4}
    if (employeeX === 'Sarah Johnson') {employeeId = 5}
    if (employeeX === 'Dean Smith') {employeeId = 6}
    if (employeeX === 'Hannah Allen') {employeeId = 7}
    if (employeeX === 'Melissa Hernandez') {employeeId = 8}
    if (employeeX === 'Dale Donkowski') {employeeId = 9}
    if (employeeX === 'Mike chan') {employeeId = 10}

    return employeeId;
}


const employeeInsert = (({ employee, role, manager, confirmManager }) => {
    let managerId;

    if (confirmManager === false) {
        managerId = null;
    } else {
        managerId = getId(manager);
    }
    const sql = `INSERT INTO employees (employee_name, role_id, manager_id) VALUES (?, ?, (SELECT id FROM roles WHERE title = ?), ?)`;
    const params = [employeeName, role, managerId];
    db.query(sql, params, (err, res) => {});
});

const employeeUpdatePrompt = [
    {
        type: 'list',
        name: 'employee',
        message: 'Which employee would you like to update?',
        choices: ['Jon Dmack', 'Don Flounder', 'Jennifer Lopez', 'Chad Brad', 'Sarah Johnson', 'Dean Smith', 'Hannah Allen', 'Melissa Hernandez', 'Dale Donkowski', 'Mike chan']
    },
    {
        type: 'list',
        name: 'newRole',
        message: 'What is their new role?',
        choices: ['Sales', 'Engineering', 'Finance', 'Legal', 'Human Resources']
    },
    {
        type: 'confirm',
        name: 'confirmUpdateManager',
        message: "Does this employee's manager need to be updated?",
        default: true
    },
    {
        type: 'list',
        name: 'newManager',
        message: "Who is the employee's new manager?",
        choices: ['Jon Dmack', 'Don Flounder', 'Jennifer Lopez', 'Chad Brad', 'Sarah Johnson', 'Dean Smith', 'Hannah Allen', 'Melissa Hernandez', 'Dale Donkowski', 'Mike chan'],
        when: ({ confirmUpdateManager }) => {
            if (confirmUpdateManager) {
                return true;
            } else {
                return false;
            }
        }
    }
]

const employeeUpdateReturn = (({ newRole, employee, confirmUpdateManager, newManager }) => {
    const employeeId = getId(employee);

    let managerId;
    if (confirmUpdateManager === true) {
        managerId = getId(newManager)
    }

    const sql = `UPDATE employees SET role_id = (SELECT id FROM roles WHERE title = ?), manager_id = ? WHERE id = ?`;
    const params = [newRole, managerId, employeeId];
    db.query(sql, params, (req, res) => {})
});

employeeDestroyPrompt = [
    {
        type: 'list',
        name: 'destroyEmployee',
        message: 'Which employee would you like to remove?',
        choices: ['Jon Dmack', 'Don Flounder', 'Jennifer Lopez', 'Chad Brad', 'Sarah Johnson', 'Dean Smith', 'Hannah Allen', 'Melissa Hernandez', 'Dale Donkowski', 'Mike chan']
    }
];

employeeDestroyInsert = (({ destroyEmployee }) => {
    const sql = `DELETE FROM employees WHERE CONCAT_WS(' ', employee_Name) = ?`;
    const params = [destroyEmployee];
    db.query(sql, params, (err, res) => {});
});

module.exports = {
    employeeByManager,
    employeeByDepartment,
    employeePrompt,
    employeeInsert,
    employeeUpdatePrompt,
    employeeUpdateReturn,
    employeeDestroyPrompt,
    employeeDestroyInsert
};
