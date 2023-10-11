'use client';

import { useAccount } from 'wagmi';
import { ConnectKitButton } from 'connectkit';

export default function Home() {
  const { address, isConnecting, isDisconnected, isConnected } = useAccount();
  if (isConnecting) return <div>Connecting...</div>;
  if (isDisconnected) return <div>Disconnected</div>;
  return (
    <main className="flex min-h-screen flex-col items-center  p-24">
      <h2>Let's Begin By Connecting Your Wallet:</h2>
      <ConnectKitButton />
      {isConnected && <div>Connected to {address}</div>}
    </main>
  );
}
