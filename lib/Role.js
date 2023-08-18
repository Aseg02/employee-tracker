const db = require('../db/connection.js');

const roleSelect = `SELECT roles.id, roles.title, roles.salary, departments.name
AS department
FROM roles
LEFT JOIN departments
ON roles.department_id = departments.id`;

const rolePrompt = [
    {
        type: 'input',
        name: 'roleName',
        message: 'What is the position of the employee?'
    },
    {
        type: 'input',
        name: 'salary',
        message: 'What is their salary? (NUMBER ENTRY)'
    },
    {
        type: 'list',
        name: 'department',
        message: 'In which department is this role?',
        choices: ['Sales', 'Engineering', 'Finance', 'Legal', 'Human Resources']
    }
];

const roleInsert = (({ roleName, salary, department }) => {
    const sql = `INSERT INTO roles (title, salary, department_id) VALUES (?, ?, (SELECT id FROM departments WHERE name = ?))`;
    const params = [roleName, salary, department];
    db.query(sql, params);
});

roleDestroyPrompt = [
    {
        type: 'list',
        name: 'destroyRole',
        message: 'Which role would you like to remove?',
        choices: ['Sales', 'Engineering', 'Finance', 'Legal', 'Human Resources']
    }
];

roleDestroyInsert = (({ destroyRole }) => {
    const sql = `DELETE FROM roles WHERE title = ?`;
    const params = [destroyRole];
    db.query(sql, params, (err, res) => {});
});

module.exports = {
    roleSelect,
    rolePrompt,
    roleInsert,
    roleDestroyPrompt,
    roleDestroyInsert
};