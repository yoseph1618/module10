import { connectToDb } from './connection.js';
import Cli from './classes/cli.js';

await connectToDb();

const cli = new Cli();
cli.mainMenu();