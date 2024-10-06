import('../src/app.js')
  .then((module) => {
    const app = module.default; // Get the default export from app.js
    app(); // Call the app (main menu function)
  })
  .catch((err) => {
    console.error('Error importing app.js:', err);
  });
