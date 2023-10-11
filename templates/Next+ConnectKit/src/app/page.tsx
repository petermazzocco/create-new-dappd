'use client';

import { useAccount } from 'wagmi';
import { ConnectKitButton } from 'connectkit';

export default function Home() {
  const { address, isConnected } = useAccount();

  return (
    <main className="flex min-h-screen flex-col items-center  p-24">
      <h2>Let's Begin By Connecting Your Wallet:</h2>
      <ConnectKitButton />
      {isConnected && <div>Connected to {address}</div>}
    </main>
  );
}
