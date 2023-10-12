'use client';

import { ConnectKitProvider } from 'connectkit';
import * as React from 'react';
import { WagmiConfig } from 'wagmi';
import { config } from '../wagmi';
import { ThemeProvider } from 'next-themes';

export function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  return (
    <WagmiConfig config={config}>
      <ThemeProvider>
        <ConnectKitProvider>{mounted && children}</ConnectKitProvider>
      </ThemeProvider>
    </WagmiConfig>
  );
}
