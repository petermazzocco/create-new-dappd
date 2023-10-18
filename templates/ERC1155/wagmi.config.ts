import { defineConfig } from '@wagmi/cli';
import { etherscan, react } from '@wagmi/cli/plugins';
import { sepolia } from 'wagmi/chains';

export default defineConfig({
  out: 'src/generated.ts',
  plugins: [
    etherscan({
      // Remove the hardcoded API key before deploying to production
      // Some users have experienced a bug with the Etherscan API key
      apiKey: process.env.ETHERSCAN_API!,
      chainId: sepolia.id,
      contracts: [
        {
          name: 'CuteCorgis',
          address: {
            [sepolia.id]: '0x50146aFedF55413FBc235a9F61c74AdC3f951E87',
          },
        },
      ],
    }),
    react(),
  ],
});
