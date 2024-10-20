import { connectDb } from './connection.js';
import Cli from './classes/cli.js';
await connectDb();
const cli = new Cli();
cli.mainMenu();
