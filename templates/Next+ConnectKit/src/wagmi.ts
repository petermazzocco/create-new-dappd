import { getDefaultConfig } from 'connectkit';
import { createConfig } from 'wagmi';
import { mainnet, sepolia } from 'wagmi';

const WC_ID = process.env.WALLET_CONNECT_ID as string;
const walletConnectProjectId = WC_ID;
const chains = [mainnet, sepolia];

export const config = createConfig(
  getDefaultConfig({
    autoConnect: true,
    appName: 'Wagmi',
    walletConnectProjectId,
    chains,
  })
);
