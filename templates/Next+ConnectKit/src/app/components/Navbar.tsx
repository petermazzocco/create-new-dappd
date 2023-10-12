'use client';

import { ConnectKitButton } from 'connectkit';
import ThemeSwitcher from './ThemeSwitcher';
import { useAccount } from 'wagmi';

export default function Navbar() {
  const { isConnected } = useAccount();
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1"></div>
      <div className="flex-none space-x-4">
        {isConnected && <ConnectKitButton />}
        <ThemeSwitcher />
      </div>
    </div>
  );
}
