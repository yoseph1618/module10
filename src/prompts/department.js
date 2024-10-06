import query from '../../dist/connection.js';

export async function viewDepartments() {
  const departments = await query('SELECT * FROM departments', []);
  console.table(departments);
}

export async function addDepartment(name) {
  await query('INSERT INTO departments (name) VALUES ($1)', [name]);
  console.log('Department added successfully.');
}
