# create-new-dappd

Welcome to `create-new-dappd`! This CLI tool makes it easy to create a new Dapp project with a selected template and set up the necessary environment variables. You'll be guided through a series of prompts to configure your project. Before you begin, make sure you have the required information handy:

- Deployed smart contract details (name and address)
- Alchemy API key (Infura will be available soon)
- Etherscan API key
- WalletConnect ID

## Getting Started

To create a new Dapp project, follow these steps:

1. Make sure you have Node.js installed on your system. If not, you can download it from [Node.js website](https://nodejs.org/).

2. Open your terminal, navigate to whatever folder you want, and run the following command:

   ```sh
   npx create-new-dappd
   ```

   The script will guide you through a series of prompts to set up your project. Here's what you can expect:

- **Select the networks:** Choose the blockchain networks you want to support (e.g., mainnet, polygon, optimism, and more to come.).

- **Template:** Select a template for your Dapp project. Available choices are:

  - [CUSTOM]: RECOMMENDED. The simple basic template that allows you to add any form of contract.
  - [ERC1155]: A simple minting page that is pre-configured to allow you to mint a deployed ERC1155 token. Of Note: the functions of the template follow the ERC1155 OpenZeppelin standard and use function naming syntax like "mint", "uri", and more. If your functions are named something else, you will encounter import errors initially. Simply updating those values will fix the error.
  - [ERC20]: Add yours or any other ERC20 compatible contract address and name, and it will autogenerate hooks based off the ABI and display token info initially.
  - [ERC721]: A simple minting page that is pre-configured to allow you to mint a deployed ERC721 token. Of Note: the functions of the template follow the ERC721 OpenZeppelin standard and use function naming syntax like "mint", "name", "symbol", and more. If your functions is named something else, you will encounter import errors initially. Simply updating those values will fix the error.

- **Project name:** Enter a name for your project. The name can only include letters, numbers, underscores, and hyphens.

- **Alchemy API key:** Enter your Alchemy API key. This key is required for blockchain data access (You can navigate to the [Alchemy] (https://www.alchemy.com/) website for an API key.).

- **Etherscan API key:** Enter your Etherscan API key. This key is used for the wagmi CLI (You can navigate to the [Etherscan] (https://etherscan.io/) website for an API key.).

- **WalletConnect ID:** Enter your WalletConnect ID. This is needed for wallet connectivity (You can navigate to the [Walletconnect] (https://walletconnect.com//) website for an ID.).

- **Contract name:** Enter the name of the deployed smart contract (Please use the name of the actual contract).

- **Contract address:** Enter the address of the deployed smart contract (Please verify the contract address is correct).

- **Contract network:** Choose the network on which the contract is deployed. This will allow you to choose from the selected from the networks you chose earlier.

The script will create your project, install dependencies, and set up the necessary configuration files.

The wagmi CLI will autogenerate React hooks based off your contracts read and write functions! Read more about the [wagmi CLI] (https://wagmi.sh/cli/getting-started)

Once the setup is complete, you can start working on your Dapp project using the selected template.

To start your local server, run the following command:

```sh
npm run dev
```

If for some reason you see a blank page, just refresh your browser and the components will populate.

## Additional Information

- You can edit the environment variables in the generated `.env` file at any time.

- You are able to add additional contracts within the `src/generated.ts` file. Just follow the wagmi CLI instructions for adding additional contracts.

## Support and Issues

If you encounter any issues or have questions, feel free to reach out for assistance or open an issue.

## License

This project is licensed under the (TBD) - see the [LICENSE.md](LICENSE.md) file for details.
