INSERT INTO departments (name)
VALUES
('Sales'),
('Engineering'),
('Finance'),
('Legal'),
('Human Resources');

INSERT INTO roles (title, salary, department_id)
VALUES
('Salesperson', 80000, 1),
('Sales Lead', 100000, 1),
('Engineer', 120000, 2),
('Lead Engineer', 150000, 2),
('Accountant', 125000, 3),
('Chief Financial Officer', 300000, 3),
('Lawyer', 190000, 4),
('Legal Team Lead', 250000, 4),
('Human Resources Employee', 80000, 5),
('Human Resources Director', 100000, 5);

INSERT INTO employees (employee_name, role_id, manager_id)
VALUES
('Jon', 'Dmack', 1, 2),
('Don', 'Flounder', 2, null),
('Jennifer', 'Lopez', 3, 4),
('Chad', 'Brad', 4, null),
('Sarah', 'Johnson', 5, 6),
('Dean', 'Smith', 6, null),
('Hannah', 'Allen', 7, 8),
('Melissa', 'Hernandez', 8, null),
('Dale', 'Donkowski', 9, 10),
('Mike ', 'chan', 10, null);