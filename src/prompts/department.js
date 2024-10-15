import query from '../../dist/connection.js';

export async function viewDepartments() {
  const department = await query('SELECT * FROM department', []);
  console.table(department);
}

export async function addDepartment(name) {
  await query('INSERT INTO department (name) VALUES ($1)', [name]);
  console.log('Department added successfully.');
}
