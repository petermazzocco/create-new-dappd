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
console.log(`
    ____  ___    ____  ____  ____ 
   / __ \\/   |  / __ \\/ __ \\/ __ \\
  / / / / /| | / /_/ / /_/ / / / /
 / /_/ / ___ |/ ____/ ____/ /_/ / 
/_____/_/  |_/_/   /_/   /_____/  

Welcome to create-new-dappd!

The easiest way to create a new decentralized application.

Vist the repo for more information:
https://www.github.com/petermazzocco/create-new-dappd

These templates require the following:
-- A deployed smart contract
-- An Alchemy and Etherscan API Key
-- A WalletConnect ID

From that, it will initialize a new template project of your choice with the necessary dependencies, environment variables, and ready-to-use React Hooks based from wagmi.
`);
await confirm({
    message: 'Before you start, do you have all necessary prerequisites listed above?',
});
// Ask the user to select a network.
const selectedNetworks = await checkbox({
    message: 'To start, select the networks you plan to use (Select as many as you like):',
    choices: [
        {
            name: 'Mainnet',
            value: 'mainnet',
        },
        new Separator(),
        {
            name: 'Sepolia',
            value: 'sepolia',
        },
        {
            name: 'Goerli',
            value: 'goerli',
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
        message: 'What is the project name:',
        validate: function (input) {
            if (/^([A-Za-z\-\\_\d])+$/.test(input))
                return true;
            else
                return 'Project name may only include letters, numbers, underscores and hashes.';
        },
    },
    {
        name: 'alchemy-api',
        type: 'password',
        message: `Enter an Alchemy API (this is hidden):`,
        validate: function (input) {
            if (/^([A-Za-z\-\\_\d])+$/.test(input))
                return true;
            else
                return 'API key may only include letters and numbers.';
        },
    },
    {
        name: 'etherscan-api',
        type: 'password',
        message: `Enter an Etherscan API (this is hidden):`,
        validate: function (input) {
            if (/^([A-Za-z\-\\_\d])+$/.test(input))
                return true;
            else
                return 'API key may only include letters and numbers.';
        },
    },
    {
        name: 'walletconnect-id',
        type: 'password',
        message: `Enter your WallectConnect ID (this is hidden):`,
        validate: function (input) {
            if (/^([A-Za-z\-\\_\d])+$/.test(input))
                return true;
            else
                return 'ID key may only include letters and numbers.';
        },
    },
    {
        name: 'contract-name',
        type: 'input',
        message: 'Enter the contract name:',
        validate: function (input) {
            if (/^([A-Za-z\-\\_\d])+$/.test(input))
                return true;
            else
                return 'Name may only include letters and numbers.';
        },
    },
    {
        name: 'contract-addr',
        type: 'input',
        message: 'Enter the contract address:',
        validate: function (input) {
            if (/^0x[a-fA-F0-9]{40}$/.test(input))
                return true;
            else
                return 'Please enter a valid Ethereum address.';
        },
    },
    {
        name: `contract-network`,
        type: 'list',
        message: 'Which network is this contract deployed on?',
        choices: selectedNetworks,
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
    console.log('Adding your environment variables...');
    fs.writeFileSync(envFilePath, `ALCHEMY_ID="${alchemyAPI}"\nETHERSCAN_API="${etherscanAPI}"\nWALLET_CONNECT_ID="${walletConnectID}"`);
    console.log('Environment variables have been added.');
    // // // Initialize the project.
    console.log('Installing dependencies...');
    const installPromise = new Promise((resolve, reject) => {
        exec('npm install', (err, stdout, stderr) => {
            if (err) {
                console.error(err);
                reject(err);
            }
            else {
                console.log(stdout);
                console.log(stderr);
                resolve(Promise);
            }
        });
    });
    // SET UP WAGMI
    installPromise.then(() => {
        // If the user selected the starter template:
        if (projectChoice === 'CUSTOM') {
            // Code for the 'CUSTOM' case
            console.log('Initializing wagmi cli...');
            exec('npx wagmi init', (err, stdout, stderr) => {
                if (err) {
                    console.error(err);
                    return;
                }
                console.log(stdout);
                console.log(stderr);
                console.log('Creating wagmi config...');
                fs.writeFileSync(wagmiConfigPath, `
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
`);
                const wagmiCliConfig = `
import { defineConfig } from '@wagmi/cli'
import { etherscan, react } from '@wagmi/cli/plugins';
import { ${selectedNetworks} } from 'wagmi/chains'

export default defineConfig({
  out: 'src/generated.ts',
  plugins: [
    etherscan({
      // Remove the hardcoded API key before deploying to production
      // Some users have experienced a bug with the Etherscan API key
      apiKey: process.env.ETHERSCAN_API! || '${etherscanAPI}',
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
        }
        else if (projectChoice === 'ERC20') {
            const tokenInfoComponentPath = `${newProjectPath}/src/app/components/TokenInfo.tsx`;
            const tokenTransferComponentPath = `${newProjectPath}/src/app/components/Transfer.tsx`;
            console.log('Initializing wagmi cli...');
            exec('npx wagmi init', (err, stdout, stderr) => {
                if (err) {
                    console.error(err);
                    return;
                }
                console.log(stdout);
                console.log(stderr);
                console.log('Creating wagmi config...');
                fs.writeFileSync(wagmiConfigPath, `
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
`);
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
      // Remove the hardcoded API key before deploying to production
      // Some users have experienced a bug with the Etherscan API key
      apiKey: process.env.ETHERSCAN_API! || '${etherscanAPI}',
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
            });
            // TOKEN COMPONENTS
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

  const { config } = usePrepare${contractName}Transfer({
    args: [toAddr, amount],
  });
  const { write, isError, isSuccess, isLoading } =
    use${contractName}Transfer(config);

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
        }
        else if (projectChoice === 'ERC721') {
            const nftComponentPath = `${newProjectPath}/src/app/components/NFTInfo.tsx`;
            const nftMintComponentPath = `${newProjectPath}/src/app/components/Mint.tsx`;
            console.log('Initializing wagmi cli...');
            exec('npx wagmi init', (err, stdout, stderr) => {
                if (err) {
                    console.error(err);
                    return;
                }
                console.log(stdout);
                console.log(stderr);
                console.log('Creating wagmi config...');
                fs.writeFileSync(wagmiConfigPath, `
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
`);
                const wagmiCliConfig = `
import { defineConfig } from '@wagmi/cli'
import { etherscan, react } from '@wagmi/cli/plugins';
import { ${selectedNetworks} } from 'wagmi/chains'

export default defineConfig({
  out: 'src/generated.ts',
  plugins: [
    etherscan({
      // Remove the hardcoded API key before deploying to production
      // Some users have experienced a bug with the Etherscan API key
      apiKey: process.env.ETHERSCAN_API! || '${etherscanAPI}',
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
                console.log('Generating wagmi ERC721 hooks...');
                exec('npx wagmi generate', (err, stdout, stderr) => {
                    if (err) {
                        console.error(err);
                        return;
                    }
                    console.log(stdout);
                    console.log(stderr);
                });
            });
            const nftMintComponent = `
'use client';

/**
 * If you are experiencing an error with the import, it might be because your "mint" function is
 * named something other than "mint". Please double check and change the name of the function
 * if this is the case.
 */
import { use${contractName}Mint, usePrepare${contractName}Mint } from '@src/generated';
import { Toaster, toast } from 'sonner';

export default function Mint() {
  const { config } = usePrepare${contractName}Mint({
    // REPLACE WITH YOUR ARGUMENTS
    // If no arguments, you can remove.
    args: ['0.01', '0x56C33325b71d97951C85397E1Bf32aF3bB45f74a', 1],
  });
  const {
    write: mint,
    isSuccess: minted,
    isLoading: minting,
    isError: failedMint,
  } = use${contractName}Mint(config);
  return (
    <div className="w-full">
      <Toaster richColors />
      <button
        onClick={() => mint?.()}
        type="button"
        //The button will be disabled if the arguments are incorrect.
        disabled={!mint}
        className="btn btn-sm btn-accent w-full"
      >
        Mint
      </button>
      {minting && toast('Minting...')}
      {minted && toast.success('Minted!')}
      {failedMint && toast.error('Failed to mint')}
    </div>
  );
}`;
            const nftInfoComponent = `
'use client';

import Mint from './Mint';
import Socials from './Socials';
/**
 * Symbol and name are standard ERC721 metadata fields
 * If you are experiencing import errors, it might be because the contract you are using
 * does not have these fields or changed the variable name.
 * You can remove the import or update the import and the fields if this is the case.
 */
import { use${contractName}Symbol, use${contractName}Name } from '@src/generated';

export default function NFTInfo() {
  const { data: symbol } = use${contractName}Symbol();
  const { data: name } = use${contractName}Name();
  return (
    <div className="grid mx-10">
      <div className="grid md:grid-cols-2 grid-cols-1 gap-10 h-fit">
        <div className="col-span-1 justify-center place-items-center align-middle grid space-y-4">
          <div className="bg-primary w-96 h-96 rounded-md place-items-center grid-flow-col justify-center grid">
            {/**
             * Add your image source here
             * <img src={""} className="w-full h-full rounded-md" />
             * */}
            <p className="text-center">Add NFT Here</p>
          </div>
          <Mint />
        </div>
        <div className="col-span-1 justify-start text-white  align-middle space-y-4">
          <h2 className=" text-3xl font-black">
            {name} <span className="font-thin text-lg ml-3">{symbol}</span>
          </h2>
          <hr className="border-1 border-white border-opacity-60" />
          <p className="text-xl font-semibold">0.00 ETH</p>
          <p className=" text-md font-thin">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <p className="text-lg">Total Supply: 10,0000</p>
          <hr className="border-1 border-white border-opacity-60" />
          <div className="pt-18">
            <Socials />
          </div>
        </div>
      </div>
    </div>
  );
}
`;
            console.log('Creating token info component...');
            fs.writeFileSync(nftComponentPath, nftInfoComponent);
            console.log('Creating token transfer component...');
            fs.writeFileSync(nftMintComponentPath, nftMintComponent);
            console.log('Your decentralized app is ready!\ncd into your project and run your local server to start your project.');
        }
        else if (projectChoice === 'ERC1155') {
            const nftComponentPath = `${newProjectPath}/src/app/components/NFTInfo.tsx`;
            const nftMintComponentPath = `${newProjectPath}/src/app/components/Mint.tsx`;
            console.log('Initializing wagmi cli...');
            exec('npx wagmi init', (err, stdout, stderr) => {
                if (err) {
                    console.error(err);
                    return;
                }
                console.log(stdout);
                console.log(stderr);
                console.log('Creating wagmi config...');
                fs.writeFileSync(wagmiConfigPath, `
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
`);
                const wagmiCliConfig = `
import { defineConfig } from '@wagmi/cli'
import { etherscan, react } from '@wagmi/cli/plugins';
import { ${selectedNetworks} } from 'wagmi/chains'

export default defineConfig({
  out: 'src/generated.ts',
  plugins: [
    etherscan({
      // Remove the hardcoded API key before deploying to production
      // Some users have experienced a bug with the Etherscan API key
      apiKey: process.env.ETHERSCAN_API! || '${etherscanAPI}',
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
                console.log('Generating wagmi ERC721 hooks...');
                exec('npx wagmi generate', (err, stdout, stderr) => {
                    if (err) {
                        console.error(err);
                        return;
                    }
                    console.log(stdout);
                    console.log(stderr);
                });
            });
            const nftMintComponent = `
'use client';

/**
 * If you are experiencing an error with the import, it might be because your "mint" function is
 * named something other than "mint". Please double check and change the name of the function
 * if this is the case.
 */
import { use${contractName}Mint, usePrepare${contractName}Mint } from '@src/generated';
import { Toaster, toast } from 'sonner';

export default function Mint() {
  const { config } = usePrepare${contractName}Mint({
    // REPLACE WITH YOUR ARGUMENTS
    // If no arguments, you can remove.
    args: ['0.01', '0x56C33325b71d97951C85397E1Bf32aF3bB45f74a', 1],
  });
  const {
    write: mint,
    isSuccess: minted,
    isLoading: minting,
    isError: failedMint,
  } = use${contractName}Mint(config);
  return (
    <div className="w-full">
      <Toaster richColors />
      <button
        onClick={() => mint?.()}
        type="button"
        //The button will be disabled if the arguments are incorrect.
        disabled={!mint}
        className="btn btn-sm btn-accent w-full"
      >
        Mint
      </button>
      {minting && toast('Minting...')}
      {minted && toast.success('Minted!')}
      {failedMint && toast.error('Failed to mint')}
    </div>
  );
}`;
            const nftInfoComponent = `
'use client';

import useUriData from '../hooks/use-uri-data';
import Mint from './Mint';
import Attributes from './Attributes';
import Socials from './Socials';

export default function NFTInfo() {
  /**
   * This custom hook fetches the metadata from the URI and displays the information on the page.
   * If you are experiencing issues with the metadata, it might be because your metadata isn't
   * properly formatted to OpenSea's standards. Check out the OpenSea documentation and make sure
   * your metadata is formatted correctly. Additionally, make sure your IPFS gateway is working properly.
   */
  const { data, isLoading, isError, isSuccess } = useUriData({
    //
    // REPLACE WITH YOUR OWN ERC1155'S IPFS URI
    //
    uri: 'https://ipfs.io/ipfs/Qmeji1kHmGJBVDKLRXRXG42viH3mog5rQY3kNWgusGgP8h',
  });
  return (
    <div className="grid mx-10">
      <div className="grid md:grid-cols-2 grid-cols-1 gap-10 h-fit">
        {isLoading && <p>Loading...</p>}
        {isError && <p>Error fetching data</p>}
        {isSuccess && (
          <>
            <div className="col-span-1 justify-center place-items-center align-middle grid space-y-4">
              <div className="bg-primary w-96 h-96 rounded-md place-items-center grid-flow-col justify-center grid">
                {/* If image link is broken, check your IPFS gateway. */}
                <img src={data?.image} className="w-96 h-96 rounded-md" />
              </div>
              <Mint />
            </div>
            <div className="col-span-1 justify-start text-white  align-middle space-y-4">
              <h2 className=" text-3xl font-black">{data?.name}</h2>
              <hr className="border-1 border-white border-opacity-60" />
              <p className="text-xl font-semibold">0.00 ETH</p>
              <p className=" text-md font-thin">{data?.description}</p>
              <p className="text-lg">Total Supply: 10,0000</p>
              <hr className="border-1 border-white border-opacity-60" />
              <Attributes attributes={data?.attributes} />
              <div className="pt-18">
                <Socials />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
        `;
            console.log('Creating token info component...');
            fs.writeFileSync(nftComponentPath, nftInfoComponent);
            console.log('Creating token transfer component...');
            fs.writeFileSync(nftMintComponentPath, nftMintComponent);
            console.log('Your decentralized app is ready!\ncd into your project and run your local server to start your project.');
        }
        else {
            // Code to run if neither of the conditions is met
        }
    });
})
    .catch(err => {
    if (err.isTyeError) {
        console.error(err);
    }
    else {
        console.error(err);
    }
});
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map