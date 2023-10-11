#!/usr/bin/env node

import * as fs from 'fs';
import { dirname } from 'path';
import inquirer from 'inquirer';
import { fileURLToPath } from 'url';
import createDirectorContents from './createDirContent.js';
import { exec } from 'child_process';

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
  {
    name: 'alchemy-api',
    type: 'input',
    message: 'Enter your Alchemy API:',
    validate: function (input: string) {
      if (/^([A-Za-z\-\\_\d])+$/.test(input)) return true;
      else return 'API key may only include letters and numbers.';
    },
  },
  {
    name: 'etherscan-api',
    type: 'input',
    message: 'Enter your Etherscan API:',
    validate: function (input: string) {
      if (/^([A-Za-z\-\\_\d])+$/.test(input)) return true;
      else return 'API key may only include letters and numbers.';
    },
  },
  {
    name: 'walletconnect-id',
    type: 'input',
    message: 'Enter your WallectConnect ID:',
    validate: function (input: string) {
      if (/^([A-Za-z\-\\_\d])+$/.test(input)) return true;
      else return 'ID key may only include letters and numbers.';
    },
  },
];

// Inquirer will ask the user to choose a project template and a project name.
inquirer.prompt(QUESTIONS).then(answers => {
  // ANSWERS FROM USER
  const projectChoice = answers['project-template'];
  const projectName = answers['project-name'];
  const alchemyAPI = answers['alchemy-api'];
  const etherscanAPI = answers['etherscan-api'];
  const walletConnectID = answers['walletconnect-id'];

  // THE PATHS
  const templatePath = `${__dirname}/templates/${projectChoice}`;
  const newProjectPath = `${CURR_DIR}/${projectName}`;
  const envFilePath = `${newProjectPath}/.env`;

  console.log('Creating your project...');

  // Create the directory for the new project.
  fs.mkdirSync(newProjectPath);

  // Create the directory contents.
  createDirectorContents(templatePath, projectName);

  // Change the current working directory to the project directory.
  process.chdir(newProjectPath);

  // Create the .env file with the environment variables.
  console.log('Adding your environment variables..');
  fs.writeFileSync(
    envFilePath,
    `ALCHEMY_ID=${alchemyAPI}\nETHERSCAN_API=${etherscanAPI}\nWALLET_CONNECT_ID=${walletConnectID}`
  );

  // Initialize the project.
  console.log('Installing dependencies...');

  exec('npm install', (err, stdout, stderr) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(stdout);
    console.log(stderr);
  });
});
