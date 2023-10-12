# create-new-dappd

Welcome to `create-new-dappd`! This CLI tool makes it easy to create a new Dapp project with a selected template and set up the necessary environment variables. You'll be guided through a series of prompts to configure your project. Before you begin, make sure you have the required information handy:

- Deployed smart contract details (name and address)
- Alchemy API key (Infura will be available soon)
- Etherscan API key
- WalletConnect ID

## Getting Started

To create a new Dapp project, follow these steps:

1. Make sure you have Node.js installed on your system. If not, you can download it from [Node.js website](https://nodejs.org/).

2. Open your terminal and run the following command:

   ```sh
   npx create-new-dappd
   ```

   The script will guide you through a series of prompts to set up your project. Here's what you can expect:

- **Select the networks:** Choose the blockchain networks you want to support (e.g., mainnet, polygon, optimism, etc.).

- **Project template:** Select a template for your Dapp project. Available choices are:

  - [Template 1]: A brief description of the first template.
  - [Template 2]: A brief description of the second template.
  - [Template 3]: A brief description of the third template.
  - ...

- **Project name:** Enter a name for your project. The name can only include letters, numbers, underscores, and hyphens.

- **Alchemy API key:** Enter your Alchemy API key. This key is required for blockchain data access.

- **Etherscan API key:** Enter your Etherscan API key. This key is used for contract verification and monitoring.

- **WalletConnect ID:** Enter your WalletConnect ID. This is needed for wallet connectivity.

- **Contract name:** Enter the name of the deployed smart contract.

- **Contract address:** Enter the address of the deployed smart contract.

- **Contract network:** Choose the network on which the contract is deployed (selected from the networks you chose earlier).

The script will create your project, install dependencies, and set up the necessary configuration files.

Once the setup is complete, you can start working on your Dapp project using the selected template.

## Additional Information

- To customize your Dapp further, you can edit the environment variables in the generated `.env` file.

- Configuration for the Wagmi CLI and Wagmi types generation is also automatically set up for you.

## Support and Issues

If you encounter any issues or have questions, feel free to reach out for assistance. Happy coding!

## License

This project is licensed under the (TBD) - see the [LICENSE.md](LICENSE.md) file for details.
