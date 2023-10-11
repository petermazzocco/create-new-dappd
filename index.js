#!/usr/bin/env node
import * as fs from 'fs';
import { dirname } from 'path';
import inquirer from 'inquirer';
import { fileURLToPath } from 'url';
import createDirectorContents from './createDirContent.js';
import { exec } from 'child_process';
import select, { Separator } from '@inquirer/select';
const CURR_DIR = process.cwd();
const __dirname = dirname(fileURLToPath(import.meta.url));
const CHOICES = fs.readdirSync(`${__dirname}/templates`);
const selectedNetwork = await select({
  message: 'Select a network:',
  choices: [
    {
      name: 'mainnet',
      value: 'mainnet',
      description: 'Main Ethereum Network',
    },
    {
      name: 'polygon',
      value: 'polygon',
      description: 'Polygon Test Network',
    },
    new Separator(),
    {
      name: 'sepolia',
      value: 'sepolia',
      description: 'Sepolia Test Network',
    },
    {
      name: 'goerli',
      value: 'goerli',
      description: 'Goerli Test Network',
    },
    {
      name: 'mumbai',
      value: 'mumbai',
      description: 'Mumbai Test Network',
    },
  ],
});
// The list of questions for the user, in order.
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
  {
    name: 'alchemy-api',
    type: 'input',
    message: `Enter your Alchemy API for the  network:`,
    validate: function (input) {
      if (/^([A-Za-z\-\\_\d])+$/.test(input)) return true;
      else return 'API key may only include letters and numbers.';
    },
  },
  {
    name: 'etherscan-api',
    type: 'input',
    message: `Enter your Etherscan API for the  network:`,
    validate: function (input) {
      if (/^([A-Za-z\-\\_\d])+$/.test(input)) return true;
      else return 'API key may only include letters and numbers.';
    },
  },
  {
    name: 'walletconnect-id',
    type: 'input',
    message: `Enter your WallectConnect ID for the  network:`,
    validate: function (input) {
      if (/^([A-Za-z\-\\_\d])+$/.test(input)) return true;
      else return 'ID key may only include letters and numbers.';
    },
  },
  {
    name: 'eth-contract-name',
    type: 'input',
    message: `Enter your smart contract name for the network:`,
    validate: function (input) {
      if (/^([A-Za-z\-\\_\d])+$/.test(input)) return true;
      else return 'Name may only include letters and numbers.';
    },
  },
  {
    name: 'eth-contract-addr',
    type: 'input',
    message: `Enter the smart contract address for the network:`,
    validate: function (input) {
      if (/^([A-Za-z\-\\_\d])+$/.test(input)) return true;
      else return 'Address may only include letters and numbers.';
    },
  },
];
// Inquirer will ask the user to choose a project template and a project name.
inquirer.prompt(QUESTIONS).then(answers => {
  // ANSWERS FROM GENERAL QUESTIONS
  const projectChoice = answers['project-template'];
  const projectName = answers['project-name'];
  // ANSWERS FROM API QUESTIONS
  const alchemyAPI = answers['alchemy-api'];
  const etherscanAPI = answers['etherscan-api'];
  const walletConnectID = answers['walletconnect-id'];
  const ethContractAddr = answers['eth-contract-addr'];
  const ethContractName = answers['eth-contract-name'];
  // DEFINE PROJECT PATHS
  const templatePath = `${__dirname}/templates/${projectChoice}`;
  const newProjectPath = `${CURR_DIR}/${projectName}`;
  const envFilePath = `${newProjectPath}/.env`;
  const wagmiConfigPath = `${newProjectPath}/wagmi.config.ts`;
  // CREATING PROJECT
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
  const installPromise = new Promise((resolve, reject) => {
    exec('npm install', (err, stdout, stderr) => {
      if (err) {
        console.error(err);
        reject(err);
      } else {
        console.log(stdout);
        console.log(stderr);
        resolve(Promise);
      }
    });
  });
  installPromise.then(() => {
    // Initialize the wagmi cli
    console.log('Initializing wagmi cli...');
    exec('npx wagmi init', (err, stdout, stderr) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log(stdout);
      console.log(stderr);
    });
    // Enter the contract address and name into the wagmi config.
    console.log('Creating wagmi config...');
    fs.writeFileSync(
      wagmiConfigPath,
      `
    import { defineConfig } from '@wagmi/cli'
    import { etherscan, react } from '@wagmi/cli/plugins';
    import { ${selectedNetwork} } from 'wagmi/chains'
    export default defineConfig({
      out: 'src/generated.ts',
      plugins: [
        etherscan({
          apiKey: process.env.ETHERSCAN_API!,
          chainId: ${selectedNetwork}.id,
          contracts: [
            {
              name: '${ethContractName}',
              address: {
                [${selectedNetwork}.id]: '${ethContractAddr}',
              },
            },
          ],
        }),
        react(),
      ],
    })`
    );
    // Generate the types for the contract.
    console.log('Generating wagmi types...');
    exec('npx wagmi generate', (err, stdout, stderr) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log(stdout);
      console.log(stderr);
    });
    // Final message
    console.log(
      `Project is ready!\n cd into ${projectName} and run npm run dev`
    );
  });
});
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map
