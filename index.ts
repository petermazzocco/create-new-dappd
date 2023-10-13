#!/usr/bin/env node
import * as fs from 'fs';
import { dirname } from 'path';
import inquirer from 'inquirer';
import { fileURLToPath } from 'url';
import createDirectorContents from './createDirContent.js';
import { exec } from 'child_process';
import checkbox, { Separator } from '@inquirer/checkbox';
import confirm from '@inquirer/confirm';

const CURR_DIR = process.cwd();
const __dirname = dirname(fileURLToPath(import.meta.url));
const CHOICES = fs.readdirSync(`${__dirname}/templates`);

// Add a greeting message
console.log(
  'Welcome to create-new-dappd!\n The easiest way to create a new dappd project.\n This CLI requires a deployed smart contract, an Alchemy API key, an Etherscan API key, and a WalletConnect ID. From that, it will initialize a new project with the necessary dependencies, environment variables, and create ready to use React Hooks based from wagmi.'
);
await confirm({ message: 'Ready To Create A New Dappd?' });
// Ask the user to select a network.
const selectedNetworks = await checkbox({
  message: 'To start, select the networks you want to use:',
  choices: [
    {
      name: 'mainnet',
      value: 'mainnet',
    },
    {
      name: 'polygon',
      value: 'matic',
    },
    {
      name: 'optimism',
      value: 'optimism',
    },
    new Separator(),
    {
      name: 'sepolia',
      value: 'sepolia',
    },
    {
      name: 'goerli',
      value: 'goerli',
    },
    {
      name: 'mumbai',
      value: 'mumbai',
    },
  ],
});

// Inquirer will ask the user to choose a project template and a project name.
inquirer
  .prompt([
    {
      name: 'project-template',
      type: 'list',
      message: 'Which template would you like to use?',
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
      type: 'password',
      message: `Enter your Alchemy API:`,
      validate: function (input) {
        if (/^([A-Za-z\-\\_\d])+$/.test(input)) return true;
        else return 'API key may only include letters and numbers.';
      },
    },
    {
      name: 'etherscan-api',
      type: 'password',
      message: `Enter your Etherscan API:`,
      validate: function (input) {
        if (/^([A-Za-z\-\\_\d])+$/.test(input)) return true;
        else return 'API key may only include letters and numbers.';
      },
    },
    {
      name: 'walletconnect-id',
      type: 'password',
      message: `Enter your WallectConnect ID:`,
      validate: function (input) {
        if (/^([A-Za-z\-\\_\d])+$/.test(input)) return true;
        else return 'ID key may only include letters and numbers.';
      },
    },
    {
      name: 'contract-name',
      type: 'input',
      message: 'Enter a contract name:',
      validate: function (input) {
        if (/^([A-Za-z\-\\_\d])+$/.test(input)) return true;
        else return 'Name may only include letters and numbers.';
      },
    },
    {
      name: 'contract-addr',
      type: 'input',
      message: 'Enter a contract address:',
      validate: function (input) {
        if (/^([A-Za-z\-\\_\d])+$/.test(input)) return true;
        else return 'Name may only include letters and numbers.';
      },
    },
    {
      name: `contract-network`,
      type: 'list',
      message: 'What network is this contract deployed on?',
      choices: selectedNetworks,
      validate: function (input) {
        if (input.length > 0) {
          return true;
        } else {
          return 'Please select the network.';
        }
      },
    },
  ])
  .then(answers => {
    // ANSWERS FROM GENERAL QUESTIONS
    const projectChoice = answers['project-template'];
    const projectName = answers['project-name'];
    // ANSWERS FROM API QUESTIONS
    const alchemyAPI = answers['alchemy-api'];
    const etherscanAPI = answers['etherscan-api'];
    const walletConnectID = answers['walletconnect-id'];
    const contractAddr = answers['contract-addr'];
    const contractName = answers['contract-name'];
    const contractNetwork = answers['contract-network'];

    // DEFINE PROJECT PATHS
    const templatePath = `${__dirname}/templates/${projectChoice}`;
    const newProjectPath = `${CURR_DIR}/${projectName}`;
    const envFilePath = `${newProjectPath}/.env`;
    const wagmiConfigPath = `${newProjectPath}/src/wagmi.ts`;
    const wagmiCliConfigPath = `${newProjectPath}/wagmi.config.ts`;

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
      `ALCHEMY_ID="${alchemyAPI}"\nETHERSCAN_API="${etherscanAPI}"\nWALLET_CONNECT_ID="${walletConnectID}"`
    );
    // // // Initialize the project.
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
      // If the user selected the starter template:
      if (projectChoice === 'starter') {
        // Code for the 'starter' case
        console.log('Initializing wagmi cli...');
        exec('npx wagmi init', (err, stdout, stderr) => {
          if (err) {
            console.error(err);
            return;
          }
          console.log(stdout);
          console.log(stderr);

          console.log('Creating wagmi config...');
          fs.writeFileSync(
            wagmiConfigPath,
            `
import { getDefaultConfig } from 'connectkit';
import { createConfig } from 'wagmi';
import { ${selectedNetworks} } from 'wagmi/chains';

const WC_ID = process.env.WALLET_CONNECT_ID as string;
const walletConnectProjectId = WC_ID;
const chains = [${selectedNetworks}];

export const config = createConfig(
  getDefaultConfig({
    autoConnect: true,
    appName: '${projectName}',
    walletConnectProjectId,
    chains,
  })
);
`
          );

          const wagmiCliConfig = `
import { defineConfig } from '@wagmi/cli'
import { etherscan, react } from '@wagmi/cli/plugins';
import { ${selectedNetworks} } from 'wagmi/chains'

export default defineConfig({
  out: 'src/generated.ts',
  plugins: [
    etherscan({
      apiKey: process.env.ETHERSCAN_API!,
      chainId: ${contractNetwork}.id,
      contracts: [
        {
          name: '${contractName}',
          address: {
            [${contractNetwork}.id]: '${contractAddr}',
          },
        },
      ],
    }),
    react(),
  ],
})`;

          fs.writeFileSync(wagmiCliConfigPath, wagmiCliConfig);

          console.log('Generating wagmi hooks...');
          exec('npx wagmi generate', (err, stdout, stderr) => {
            if (err) {
              console.error(err);
              return;
            }
            console.log(stdout);
            console.log(stderr);
          });
        });
        // If the user selected the erc20 template:
      } else if (projectChoice === 'erc20') {
        const tokenInfoComponentPath = `${newProjectPath}/src/app/components/TokenInfo.tsx`;
        const tokenTransferComponentPath = `${newProjectPath}/src/app/components/Transfer.tsx`;
        console.log('Creating wagmi config...');
        fs.writeFileSync(
          wagmiConfigPath,
          `
import { getDefaultConfig } from 'connectkit';
import { createConfig } from 'wagmi';
import { ${selectedNetworks} } from 'wagmi/chains';

const WC_ID = process.env.WALLET_CONNECT_ID as string;
const walletConnectProjectId = WC_ID;
const chains = [${selectedNetworks}];

export const config = createConfig(
  getDefaultConfig({
    autoConnect: true,
    appName: '${projectName}',
    walletConnectProjectId,
    chains,
  })
);
`
        );

        const wagmiCliConfig = `
import { defineConfig } from '@wagmi/cli'
import { etherscan, react } from '@wagmi/cli/plugins';
import { erc20ABI } from 'wagmi';
import { ${selectedNetworks} } from 'wagmi/chains'

export default defineConfig({
  out: 'src/generated.ts',
  contracts: [
    {
      name: 'erc20',
      abi: erc20ABI,
    },
  ],
  plugins: [
    etherscan({
      apiKey: process.env.ETHERSCAN_API!,
      chainId: ${contractNetwork}.id,
      contracts: [
        {
          name: '${contractName}',
          address: {
            [${contractNetwork}.id]: '${contractAddr}',
          },
        },
      ],
    }),
    react(),
  ],
})`;

        fs.writeFileSync(wagmiCliConfigPath, wagmiCliConfig);
        console.log('Generating wagmi ERC20 hooks...');
        exec('npx wagmi generate', (err, stdout, stderr) => {
          if (err) {
            console.error(err);
            return;
          }
          console.log(stdout);
          console.log(stderr);
        });
        const tokenInfoComponent = `
'use client';

import {
  use${contractName}Symbol,
  use${contractName}Name,
  use${contractName}TotalSupply,
} from '@src/generated';

export default function TokenInfo() {
  const { data: symbol } = use${contractName}Symbol();
  const { data: name } = use${contractName}Name();
  const { data: totalSupply } = use${contractName}TotalSupply();

  const totalSupplyWeiToEth = totalSupply
    ? (Number(totalSupply) / 10 ** 18).toFixed(2)
    : null;

  return (
    <div className="bg-base-3 00 p-8 rounded-lg grid justify-center space-y-4">
      <p className=" border-2 border-orange-400 rounded-xl p-2 hover:bg-orange-400">
        {name}({symbol})
      </p>
      <p className=" border-2 border-orange-400 rounded-xl p-2 hover:bg-orange-400">
        Total Supply: {totalSupplyWeiToEth?.toString()}
      </p>
    </div>
  );
}`;

        const tokenTransferComponent = `
'use client';

import {
  use${contractName}Transfer,
  usePrepare${contractName}Transfer,
} from '@src/generated';
import type { Address } from 'viem';
import { useState } from 'react';

export default function Transfer() {
  const [toAddr, setToAddr] = useState<Address>();
  const [amount, setAmount] = useState<number>(0);
  const handleAmount = e => {
    const ethAmount = Number(e.target.value);
    const weiAmount = ethAmount * 1e18;

    setAmount(weiAmount);
  };

  const { config } = usePrepareTestTokenTransfer({
    args: [toAddr, amount],
  });
  const { write, isError, isSuccess, isLoading } =
    useTestTokenTransfer(config);

  return (
    <div className="grid justify-center space-y-4">
      <input
        className="input-sm p-4"
        placeholder="Address"
        type="text"
        onChange={e => {
          setToAddr(e.target.value as Address);
        }}
      />
      <input
        className="input-sm p-4"
        placeholder="Amount"
        type="number"
        onChange={handleAmount}
      />
      <button
        type="button"
        disabled={!write}
        className="btn btn-sm btn-neutral"
        onClick={() => write?.()}
      >
        Transfer Tokens
      </button>
      {isError && <div className="text-red-500">Error Occurred</div>}
      {isSuccess && <div className="text-green-500">Success</div>}
    </div>
  );
}`;
        console.log('Creating token info component...');
        fs.writeFileSync(tokenInfoComponentPath, tokenInfoComponent);
        console.log('Creating token transfer component...');
        fs.writeFileSync(tokenTransferComponentPath, tokenTransferComponent);
        console.log('Your decentralized app is ready!');
      } else {
        // Code to run if neither of the conditions is met
      }
    });
  })
  .catch(err => {
    if (err.isTyeError) {
      console.error(err);
    } else {
      console.error(err);
    }
  });
//# sourceMappingURL=index.js.map
