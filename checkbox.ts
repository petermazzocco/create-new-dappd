import checkbox, { Separator } from '@inquirer/checkbox';
import * as fs from 'fs';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const CHOICES = fs.readdirSync(`${__dirname}/templates`);

export const templateNames = await checkbox[{}];
