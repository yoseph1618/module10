import inquirer from 'inquirer';
import { viewDepartments, addDepartment } from './department.js';
import { viewRoles, addRole } from './role.js';
import { viewEmployees, addEmployee } from './employee.js';
export async function mainMenu() {
    const answers = await inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: 'What would you like to do?',
            choices: [
                'View all departments',
                'View all roles',
                'View all employees',
                'Add a department',
                'Add a role',
                'Add an employee',
                'Exit'
            ]
        }
    ]);
    // Handle each action based on user selection
    switch (answers.action) {
        case 'View all departments':
            await viewDepartments();
            break;
        case 'View all roles':
            await viewRoles();
            break;
        case 'View all employees':
            await viewEmployees();
            break;
        case 'Add a department':
            const deptAnswer = await inquirer.prompt({
                name: 'name',
                message: 'Enter the name of the department:'
            });
            await addDepartment(deptAnswer.name);
            break;
        case 'Add a role':
            const roleAnswers = await inquirer.prompt([
                { name: 'title', message: 'Enter the role title:' },
                { name: 'salary', message: 'Enter the role salary:' },
                { name: 'departmentId', message: 'Enter the department ID:' }
            ]);
            await addRole(roleAnswers.title, roleAnswers.salary, roleAnswers.departmentId);
            break;
        case 'Add an employee':
            const empAnswers = await inquirer.prompt([
                { name: 'firstName', message: 'Enter the employee first name:' },
                { name: 'lastName', message: 'Enter the employee last name:' },
                { name: 'roleId', message: 'Enter the employee role ID:' },
                { name: 'managerId', message: 'Enter the manager ID (or null):' }
            ]);
            await addEmployee(empAnswers.firstName, empAnswers.lastName, empAnswers.roleId, empAnswers.managerId);
            break;
        case 'Exit':
            console.log('Exiting...');
            process.exit();
    }
    // Restart the main menu after an action
    await mainMenu();
}
