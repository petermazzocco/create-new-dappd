'use client';

import { ConnectKitButton } from 'connectkit';

export default function Navbar() {
  return (
    <div className="navbar">
      <div className="flex-1"></div>
      <div className="flex-none space-x-4">
        <ConnectKitButton />
      </div>
    </div>
  );
}
