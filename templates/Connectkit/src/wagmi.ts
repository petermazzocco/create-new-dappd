import { getDefaultConfig } from 'connectkit';
import { createConfig } from 'wagmi';
import { mainnet } from 'wagmi/chains';

const WC_ID = process.env.WALLET_CONNECT_ID as string;
const walletConnectProjectId = WC_ID;
const chains = [mainnet];

export const config = createConfig(
  getDefaultConfig({
    autoConnect: true,
    appName: '',
    walletConnectProjectId,
    chains,
  })
);
