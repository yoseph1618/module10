import('../src/index.js')
  .then((module) => {
    const app = module.default; // Get the default export from index.js
    app(); // Call the app (main menu function)
  })
  .catch((err) => {
    console.error('Error importing index.js:', err);
  });
