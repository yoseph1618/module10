import query from '../../dist/connection.js';

export async function viewRoles() {
  const role = await query(
    `SELECT role.id, role.title, role.salary, department.name AS department
     FROM role
     JOIN department ON role.department_id = department.id`,
    []
  );
  console.table(role);
}

export async function addRole(title, salary, departmentId) {
  await query(
    'INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)',
    [title, salary, departmentId]
  );
  console.log('Role added successfully.');
}
