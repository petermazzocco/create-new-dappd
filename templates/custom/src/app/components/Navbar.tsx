'use client';

import { ConnectKitButton } from 'connectkit';
import { useAccount } from 'wagmi';

export default function Navbar() {
  const { isConnected } = useAccount();
  return (
    <div className="navbar">
      <div className="flex-1"></div>
      <div className="flex-none space-x-4">
        {isConnected && <ConnectKitButton />}
      </div>
    </div>
  );
}
