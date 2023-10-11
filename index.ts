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
    validate: function (input: string) {
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
  const newProjectPath = `${CURR_DIR}/${projectName}`;
  const packageJsonPath = `${templatePath}/package.json`;
  console.log('Creating project...');
  // Create the directory for the new project.
  fs.mkdirSync(newProjectPath);
  console.log('Creating content...');
  // Create the directory contents.
  createDirectorContents(templatePath, projectName);

  // Change the current working directory to the project directory.
  process.chdir(newProjectPath);
  console.log('Updating values...');
  // Read the existing package.json file.
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

  // Update the 'name' field with the user's project name.
  packageJson.name = projectName;

  // Write the updated package.json back to the file.
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson));

  console.log('Project created successfully!');
});
