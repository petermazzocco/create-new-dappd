import { getDefaultConfig } from 'connectkit';
import { createConfig } from 'wagmi';
import { sepolia } from 'wagmi/chains';

const WC_ID = process.env.WALLET_CONNECT_ID as string;
const walletConnectProjectId = WC_ID;
const chains = [sepolia];

export const config = createConfig(
  getDefaultConfig({
    autoConnect: false, //Change to true if you want to autoconnect
    appName: '',
    walletConnectProjectId,
    chains,
  })
);
