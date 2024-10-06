import query from '../../dist/connection.js';

export async function viewRoles() {
  const roles = await query(
    `SELECT roles.id, roles.title, roles.salary, departments.name AS department
     FROM roles
     JOIN departments ON roles.department_id = departments.id`,
    []
  );
  console.table(roles);
}

export async function addRole(title, salary, departmentId) {
  await query(
    'INSERT INTO roles (title, salary, department_id) VALUES ($1, $2, $3)',
    [title, salary, departmentId]
  );
  console.log('Role added successfully.');
}
