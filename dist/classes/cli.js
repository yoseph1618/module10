import inquirer from 'inquirer';
import { pool } from '../connection.js';
import Table from 'cli-table3';
// CLI:
// GIVEN a command-line application that accepts user input
// WHEN I start the application
// THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
class Cli {
    mainMenu() {
        inquirer
            .prompt([
            {
                type: 'list',
                name: 'MainMenu',
                message: 'What would you like to do?',
                choices: [
                    'View all Departments',
                    'View all Roles',
                    'View all Employees',
                    'Add a Department',
                    'Add a Role',
                    'Add an Employee',
                    'Update an Employee Role',
                    `Update an Employee's Manager`,
                    'View Employees by Manager',
                    'View Employees by Department',
                    'Delete a Department',
                    'Delete a Role',
                    'Delete an Employee',
                    'View Department Budget',
                    'Exit'
                ],
            },
        ])
            .then((answers) => {
            switch (answers.MainMenu) {
                case 'View all Departments':
                    this.viewAllDepartments();
                    break;
                case 'View all Roles':
                    this.viewAllRoles();
                    break;
                case 'View all Employees':
                    this.viewAllEmployees();
                    break;
                case 'Add a Department':
                    this.addDepartment();
                    break;
                case 'Add a Role':
                    this.addRole();
                    break;
                case 'Add an Employee':
                    this.addEmployee();
                    break;
                case 'Update an Employee Role':
                    this.updateEmployeeRole();
                    break;
                case `Update an Employee's Manager`:
                    this.updateEmployeeManager();
                    break;
                case 'View Employees by Manager':
                    this.viewEmployeesByManager();
                    break;
                case 'View Employees by Department':
                    this.viewEmployeesByDepartment();
                    break;
                case 'Delete a Department':
                    this.deleteDepartment();
                    break;
                case 'Delete a Role':
                    this.deleteRole();
                    break;
                case 'Delete an Employee':
                    this.deleteEmployee();
                    break;
                case 'View Department Budget':
                    this.viewDepartmentBudget();
                    break;
                case 'Exit':
                    console.log('Goodbye!');
                    process.exit();
                    break;
            }
        });
    }
    // WHEN I choose to view all departments
    // THEN I am presented with a formatted (alphabetical order by department) table showing department names and department ids
    viewAllDepartments() {
        pool.query('SELECT * FROM department ORDER BY name ASC', (err, res) => {
            if (err) {
                console.error('Error executing query.', err);
            }
            else {
                console.log();
                console.log('All Departments:');
                const table = new Table({
                    head: ['Department Name', 'Department ID'],
                });
                res.rows.forEach((row) => {
                    table.push([row.name, row.id]);
                });
                console.log(table.toString());
                console.log();
            }
            this.mainMenu();
        });
    }
    // WHEN I choose to view all roles
    // THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
    viewAllRoles() {
        pool.query(`SELECT 
                r.id, 
                r.title, 
                r.salary, 
                d.name AS department 
            FROM role r 
            JOIN department d 
            ON r.department_id = d.id`, (err, res) => {
            if (err) {
                console.error('Error executing query.', err);
            }
            else {
                console.log();
                console.log('All Roles:');
                const table = new Table({
                    head: ['Job Title', 'Role ID', 'Department', 'Salary'],
                });
                res.rows.forEach((row) => {
                    table.push([row.title, row.id, row.department, row.salary]);
                });
                console.log(table.toString());
                console.log();
            }
            this.mainMenu();
        });
    }
    // WHEN I choose to view all employees
    // THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
    viewAllEmployees() {
        pool.query(`SELECT 
                e.id, 
                e.first_name, 
                e.last_name, 
                r.title AS job_title, 
                d.name AS department, 
                r.salary, 
                CONCAT(m.first_name, ' ', m.last_name) AS manager 
            FROM employee e 
            JOIN role r ON e.role_id = r.id 
            JOIN department d ON r.department_id = d.id 
            LEFT JOIN employee m ON e.manager_id = m.id`, (err, res) => {
            if (err) {
                console.error('Error executing query.', err);
            }
            else {
                console.log();
                console.log('All Employees:');
                const table = new Table({
                    head: ['Employee ID', 'First Name', 'Last Name', 'Job Title', 'Department', 'Salary', 'Manager'],
                });
                res.rows.forEach((row) => {
                    table.push([
                        row.id,
                        row.first_name,
                        row.last_name,
                        row.job_title,
                        row.department,
                        row.salary,
                        row.manager || 'None'
                    ]);
                });
                console.log(table.toString());
                console.log();
            }
            this.mainMenu();
        });
    }
    // WHEN I choose to add a department
    // THEN I am prompted to enter the name of the department and that department is added to the database
    addDepartment() {
        inquirer
            .prompt([
            {
                type: 'input',
                name: 'newDepartment',
                message: 'Enter the New Department Name:',
            },
        ])
            .then((answers) => {
            pool.query('INSERT INTO department (name) VALUES ($1)', [answers.newDepartment], (err) => {
                if (err) {
                    console.error('Error Adding New Department.', err);
                }
                else {
                    console.log();
                    console.log(`New Department '${answers.newDepartment}' Added Successfully.`);
                    console.log();
                }
                this.mainMenu();
            });
        });
    }
    // WHEN I choose to add a role
    // THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
    addRole() {
        pool.query('SELECT * FROM department ORDER BY name ASC', (err, res) => {
            if (err) {
                console.error('Error getting Departments data.', err);
                this.mainMenu();
            }
            else {
                const departments = res.rows.map((row) => ({
                    name: row.name,
                    value: row.id,
                }));
                inquirer
                    .prompt([
                    {
                        type: 'input',
                        name: 'title',
                        message: `Enter the Role's Title:`,
                    },
                    {
                        type: 'input',
                        name: 'salary',
                        message: `Enter the Role's Salary:`,
                    },
                    {
                        type: 'list',
                        name: 'departmentId',
                        message: `Assign the Role to a Department:`,
                        choices: departments,
                    },
                ])
                    .then((answers) => {
                    const { title, salary, departmentId } = answers;
                    pool.query('INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)', [title, salary, departmentId], (err) => {
                        if (err) {
                            console.error('Error Adding New Role.', err);
                        }
                        else {
                            console.log();
                            console.log(`New Role '${title}' Added Successfully.`);
                            console.log();
                        }
                        this.mainMenu();
                    });
                });
            }
        });
    }
    // WHEN I choose to add an employee
    // THEN I am prompted to enter the employee's first name, last name, role, and manager, and that employee is added to the database
    addEmployee() {
        pool.query(`SELECT id, title FROM role
            ORDER BY title ASC`, (err, roleRes) => {
            if (err) {
                console.error('Error getting Roles data.', err);
                this.mainMenu();
            }
            else {
                pool.query(`SELECT e.id, CONCAT(r.title, ' - ', e.first_name, ' ', e.last_name) AS name 
                    FROM employee e
                    JOIN role r ON e.role_id = r.id
                    WHERE r.title ILIKE '%Manager%'
                    ORDER BY name ASC`, (err, manRes) => {
                    if (err) {
                        console.error('Error getting Manager data.', err);
                        this.mainMenu();
                    }
                    else {
                        const roles = roleRes.rows.map((row) => ({
                            name: row.title,
                            value: row.id,
                        }));
                        const managers = manRes.rows.map((row) => ({
                            name: row.name,
                            value: row.id,
                        }));
                        managers.unshift({ name: 'None', value: null });
                        inquirer
                            .prompt([
                            {
                                type: 'input',
                                name: 'firstName',
                                message: `Enter the Employee's First Name:`,
                            },
                            {
                                type: 'input',
                                name: 'lastName',
                                message: `Enter the Employee's Last Name:`,
                            },
                            {
                                type: 'list',
                                name: 'roleId',
                                message: `Assign the Employee a Role:`,
                                choices: roles,
                            },
                            {
                                type: 'list',
                                name: 'managerId',
                                message: `Assign the Employee a Manager:`,
                                choices: managers,
                            },
                        ])
                            .then((answers) => {
                            const { firstName, lastName, roleId, managerId } = answers;
                            pool.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)', [firstName, lastName, roleId, managerId], (err) => {
                                if (err) {
                                    console.error('Error Adding New Employee.', err);
                                }
                                else {
                                    console.log();
                                    console.log(`New Employee '${firstName} ${lastName}' Added Successfully.`);
                                    console.log();
                                }
                                this.mainMenu();
                            });
                        });
                    }
                });
            }
        });
    }
    // WHEN I choose to update an employee role
    // THEN I am prompted to select an employee to update and their new role and this information is updated in the database
    updateEmployeeRole() {
        pool.query('SELECT id, CONCAT(first_name, \' \', last_name) AS name FROM employee ORDER BY name ASC', (err, empRes) => {
            if (err) {
                console.error('Error getting Employees data.', err);
                this.mainMenu();
            }
            else {
                const employees = empRes.rows.map((row) => ({
                    name: row.name,
                    value: row.id,
                }));
                pool.query('SELECT id, title FROM role ORDER BY title ASC', (err, roleRes) => {
                    if (err) {
                        console.error('Error getting Roles data.', err);
                        this.mainMenu();
                    }
                    else {
                        const roles = roleRes.rows.map((row) => ({
                            name: row.title,
                            value: row.id,
                        }));
                        inquirer
                            .prompt([
                            {
                                type: 'list',
                                name: 'employeeId',
                                message: 'Select an Employee to Update:',
                                choices: employees,
                            },
                            {
                                type: 'list',
                                name: 'roleId',
                                message: `Select the Employee's New Role:`,
                                choices: roles,
                            },
                        ])
                            .then((answers) => {
                            const { employeeId, roleId } = answers;
                            pool.query('UPDATE employee SET role_id = $1 WHERE id = $2', [roleId, employeeId], (err) => {
                                if (err) {
                                    console.error('Error Updating Employee Role.', err);
                                }
                                else {
                                    console.log();
                                    console.log('Employee Role Updated Successfully.');
                                    console.log();
                                }
                                this.mainMenu();
                            });
                        });
                    }
                });
            }
        });
    }
    // Bonus:
    // Try to add some additional functionality to your application, such as the ability to do the following:
    // Update employee managers:
    updateEmployeeManager() {
        pool.query(`SELECT id, CONCAT(first_name, ' ', last_name) AS name FROM employee ORDER BY name ASC`, (err, empRes) => {
            if (err) {
                console.error('Error getting Employees data.', err);
                this.mainMenu();
            }
            else {
                const employees = empRes.rows.map((row) => ({
                    name: row.name,
                    value: row.id,
                }));
                inquirer
                    .prompt([
                    {
                        type: 'list',
                        name: 'employeeId',
                        message: 'Select the Employee to Update:',
                        choices: employees,
                    }
                ])
                    .then((answers) => {
                    const { employeeId } = answers;
                    pool.query(`SELECT e.id, CONCAT(r.title, ' - ', e.first_name, ' ', e.last_name) AS name 
                            FROM employee e
                            JOIN role r ON e.role_id = r.id
                            WHERE r.title ILIKE '%Manager%'
                            ORDER BY name ASC`, (err, manRes) => {
                        if (err) {
                            console.error('Error getting Employees data.', err);
                            this.mainMenu();
                        }
                        else {
                            const managers = manRes.rows.map((row) => ({
                                name: row.name,
                                value: row.id,
                            }));
                            managers.unshift({ name: 'None', value: null });
                            inquirer
                                .prompt([
                                {
                                    type: 'list',
                                    name: 'managerId',
                                    message: `Select the Employee's New Manager:`,
                                    choices: managers,
                                },
                            ])
                                .then((answers) => {
                                const { managerId } = answers;
                                pool.query('UPDATE employee SET manager_id = $1 WHERE id = $2', [managerId, employeeId], (err) => {
                                    if (err) {
                                        console.error('Error Updating Employee Manager.', err);
                                    }
                                    else {
                                        console.log();
                                        console.log('Employee Manager Updated Successfully.');
                                        console.log();
                                    }
                                    this.mainMenu();
                                });
                            });
                        }
                    });
                });
            }
        });
    }
    // View employees by manager:
    viewEmployeesByManager() {
        pool.query(`SELECT e.id, CONCAT(r.title, ' - ', e.first_name, ' ', e.last_name) AS name
            FROM employee e
            JOIN role r ON e.role_id = r.id
            WHERE r.title ILIKE '%Manager%'
            ORDER BY name ASC`, (err, res) => {
            if (err) {
                console.error('Error fetching manager data.', err);
                this.mainMenu();
            }
            else {
                const managers = res.rows.map((row) => ({
                    name: row.name,
                    value: row.id,
                }));
                managers.unshift({ name: 'No Current Manager', value: null });
                inquirer
                    .prompt([
                    {
                        type: 'list',
                        name: 'managerId',
                        message: 'Select a Manager or view employees without a manager:',
                        choices: managers,
                    },
                ])
                    .then((answers) => {
                    const { managerId } = answers;
                    const query = managerId !== null
                        ? `SELECT e.id, e.first_name, e.last_name, r.title, d.name AS department
                                FROM employee e
                                JOIN role r ON e.role_id = r.id
                                JOIN department d ON r.department_id = d.id
                                WHERE e.manager_id = $1
                                ORDER BY e.first_name ASC`
                        : `SELECT e.id, e.first_name, e.last_name, r.title, d.name AS department
                                FROM employee e
                                JOIN role r ON e.role_id = r.id
                                JOIN department d ON r.department_id = d.id
                                WHERE e.manager_id IS NULL
                                ORDER BY e.first_name ASC`;
                    pool.query(query, managerId !== null ? [managerId] : [], (err, res) => {
                        if (err) {
                            console.error('Error fetching employees.', err);
                            this.mainMenu();
                        }
                        else {
                            console.log();
                            console.log(`Employees ${managerId !== null ? 'managed by ' + managers.find(manager => manager.value === managerId)?.name : 'with No Current Manager'}:`);
                            const table = new Table({
                                head: ['Employee ID', 'First Name', 'Last Name', 'Job Title', 'Department'],
                            });
                            res.rows.forEach((row) => {
                                table.push([
                                    row.id,
                                    row.first_name,
                                    row.last_name,
                                    row.title,
                                    row.department,
                                ]);
                            });
                            console.log(table.toString());
                            console.log();
                            this.mainMenu();
                        }
                    });
                });
            }
        });
    }
    // View employees by department:
    viewEmployeesByDepartment() {
        pool.query(`SELECT id, name FROM department ORDER BY name ASC`, (err, res) => {
            if (err) {
                console.error('Error fetching department data.', err);
                this.mainMenu();
            }
            else {
                const departments = res.rows.map((row) => ({
                    name: row.name,
                    value: row.id,
                }));
                inquirer
                    .prompt([
                    {
                        type: 'list',
                        name: 'departmentId',
                        message: 'Select a Department to view its employees:',
                        choices: departments,
                    },
                ])
                    .then((answers) => {
                    const { departmentId } = answers;
                    pool.query(`SELECT e.id, e.first_name, e.last_name, r.title, d.name AS department
                                 FROM employee e
                                 JOIN role r ON e.role_id = r.id
                                 JOIN department d ON r.department_id = d.id
                                 WHERE d.id = $1
                                 ORDER BY e.first_name ASC`, [departmentId], (err, res) => {
                        if (err) {
                            console.error('Error fetching employees.', err);
                            this.mainMenu();
                        }
                        else {
                            console.log();
                            console.log(`Employees in the ${departments.find(dept => dept.value === departmentId)?.name} Department:`);
                            const table = new Table({
                                head: ['Employee ID', 'First Name', 'Last Name', 'Job Title', 'Department'],
                            });
                            res.rows.forEach((row) => {
                                table.push([
                                    row.id,
                                    row.first_name,
                                    row.last_name,
                                    row.title,
                                    row.department,
                                ]);
                            });
                            console.log(table.toString());
                            console.log();
                            this.mainMenu();
                        }
                    });
                });
            }
        });
    }
    // Delete departments, roles, and employees:
    deleteDepartment() {
        pool.query(`SELECT * FROM department ORDER BY name ASC`, (err, res) => {
            if (err) {
                console.error('Error getting Departments data.', err);
                this.mainMenu();
            }
            else {
                const departments = res.rows.map((row) => ({
                    name: row.name,
                    value: row.id,
                }));
                inquirer
                    .prompt([
                    {
                        type: 'list',
                        name: 'departmentId',
                        message: 'Select the Department to Delete:',
                        choices: departments,
                    },
                    {
                        type: 'confirm',
                        name: 'confirm',
                        message: 'Deleting a Department will delete all Roles and Employees related to that Department. Would you like to continue?',
                        default: false,
                    },
                ])
                    .then((answers) => {
                    const { departmentId, confirm } = answers;
                    if (confirm) {
                        pool.query(`DELETE FROM department WHERE id = $1`, [departmentId], (err) => {
                            if (err) {
                                console.error('Error Deleting Department.', err);
                            }
                            else {
                                console.log();
                                console.log('Department Deleted Successfully.');
                                console.log();
                            }
                            this.mainMenu();
                        });
                    }
                    else {
                        console.log();
                        console.log('Delete Department Cancelled.');
                        console.log();
                        this.mainMenu();
                    }
                });
            }
        });
    }
    deleteRole() {
        pool.query(`SELECT * FROM role ORDER BY title ASC`, (err, res) => {
            if (err) {
                console.error('Error getting Roles data.', err);
                this.mainMenu();
            }
            else {
                const roles = res.rows.map((row) => ({
                    name: row.title,
                    value: row.id,
                }));
                inquirer
                    .prompt([
                    {
                        type: 'list',
                        name: 'roleId',
                        message: 'Select the Role to Delete:',
                        choices: roles,
                    },
                    {
                        type: 'confirm',
                        name: 'confirmDelete',
                        message: 'Deleting a Role will delete all Employees related to that Role. Would you like to continue?',
                        default: false,
                    },
                ])
                    .then((answers) => {
                    const { roleId, confirmDelete } = answers;
                    if (confirmDelete) {
                        pool.query(`DELETE FROM role WHERE id = $1`, [roleId], (err) => {
                            if (err) {
                                console.error('Error Deleting Role.', err);
                            }
                            else {
                                console.log();
                                console.log('Role Deleted Successfully.');
                                console.log();
                            }
                            this.mainMenu();
                        });
                    }
                    else {
                        console.log('Role delete canceled.');
                        this.mainMenu();
                    }
                });
            }
        });
    }
    deleteEmployee() {
        pool.query(`SELECT id, CONCAT(first_name, ' ', last_name) AS name FROM employee ORDER BY name ASC`, (err, res) => {
            if (err) {
                console.error('Error getting Employees data.', err);
                this.mainMenu();
            }
            else {
                const employees = res.rows.map((row) => ({
                    name: row.name,
                    value: row.id,
                }));
                inquirer
                    .prompt([
                    {
                        type: 'list',
                        name: 'employeeId',
                        message: 'Select the Employee to Delete:',
                        choices: employees,
                    },
                    {
                        type: 'confirm',
                        name: 'confirmDelete',
                        message: 'Deleting an Employee cannot be undone.  Would you like to continue?',
                        default: false,
                    },
                ])
                    .then((answers) => {
                    const { employeeId, confirmDelete } = answers;
                    if (confirmDelete) {
                        pool.query(`DELETE FROM employee WHERE id = $1`, [employeeId], (err) => {
                            if (err) {
                                console.error('Error Deleting Employee.', err);
                            }
                            else {
                                console.log();
                                console.log('Employee Deleted Successfully.');
                                console.log();
                            }
                            this.mainMenu();
                        });
                    }
                    else {
                        console.log('Employee delete canceled.');
                        this.mainMenu();
                    }
                });
            }
        });
    }
    // View the total utilized budget of a department—in other words, the combined salaries of all employees in that department:
    viewDepartmentBudget() {
        pool.query(`SELECT id, name FROM department ORDER BY name ASC`, (err, res) => {
            if (err) {
                console.error('Error fetching department data.', err);
                this.mainMenu();
            }
            else {
                const departments = res.rows.map((row) => ({
                    name: row.name,
                    value: row.id,
                }));
                inquirer
                    .prompt([
                    {
                        type: 'list',
                        name: 'departmentId',
                        message: 'Select a Department to view its total utilized budget:',
                        choices: departments,
                    },
                ])
                    .then((answers) => {
                    const { departmentId } = answers;
                    pool.query(`SELECT SUM(r.salary) AS total_budget
                                FROM employee e
                                JOIN role r ON e.role_id = r.id
                                WHERE r.department_id = $1`, [departmentId], (err, res) => {
                        if (err) {
                            console.error('Error calculating department budget.', err);
                            this.mainMenu();
                        }
                        else {
                            const totalBudget = res.rows[0]?.total_budget || 0;
                            console.log();
                            console.log(`The total utilized budget for the ${departments.find(dept => dept.value === departmentId)?.name} Department is $${totalBudget}.`);
                            console.log();
                            this.mainMenu();
                        }
                    });
                });
            }
        });
    }
}
export default Cli;
