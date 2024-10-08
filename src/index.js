import inquirer from 'inquirer';
import { mainMenu } from './prompts/mainMenu.js'; // Import the main menu prompt

export default async function app() {
  try {
    await mainMenu(); // Start the CLI
  } catch (err) {
    console.error('Error running app:', err);
  }
}

