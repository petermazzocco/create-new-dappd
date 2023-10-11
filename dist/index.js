#!/usr/bin/env node
import * as fs from 'fs';
import { dirname } from 'path';
import inquirer from 'inquirer';
import { fileURLToPath } from 'url';
import createDirectorContents from './createDirContent.js';
const CURR_DIR = process.cwd();
const __dirname = dirname(fileURLToPath(import.meta.url));
const CHOICES = fs.readdirSync(`${__dirname}/templates`);
// The list of questions for the user.
const QUESTIONS = [
  {
    name: 'project-template',
    type: 'list',
    message: 'What project template would you like to generate?',
    choices: CHOICES,
  },
  {
    name: 'project-name',
    type: 'input',
    message: 'Project name:',
    validate: function (input) {
      if (/^([A-Za-z\-\\_\d])+$/.test(input)) return true;
      else
        return 'Project name may only include letters, numbers, underscores and hashes.';
    },
  },
];
// Inquirer will ask the user to choose a project template and a project name.
inquirer.prompt(QUESTIONS).then(answers => {
  const projectChoice = answers['project-template'];
  const projectName = answers['project-name'];
  const templatePath = `${__dirname}/templates/${projectChoice}`;
  // Create the directory for the new project.
  fs.mkdirSync(`${CURR_DIR}/${projectName}`);
  // Create the directory contents.
  createDirectorContents(templatePath, projectName);
});
//# sourceMappingURL=index.js.map
