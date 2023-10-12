'use client';

import { ConnectKitButton } from 'connectkit';
import { useAccount } from 'wagmi';

export default function Home() {
  const { isConnected } = useAccount();
  return (
    <main className="grid justify-center h-96 place-items-center align-middle space-y-4  p-24">
      {isConnected ? (
        <div className="rounded-xl bg-base-300 shadow-xl p-10 space-y-8 grid max-w-lg text-center">
          <h2 className="text-lg font-bold">
            Now that you're connected, you can do anything!
          </h2>
          <p>
            Thanks to the wagmi CLI, all of your contracts read and write
            functions have generated ready to use hooks.
          </p>
          <p>
            You can use these hooks to easily interact with your contracts
            without having to write any additional type-safe code.
          </p>
          <p>Available now in:</p>
          <code className="bg-base-100 p-1 w-fit justify-self-center rounded-lg">
            {`src/generated.ts`}
          </code>
          <p>Happy Coding!</p>
        </div>
      ) : (
        <div className="rounded-xl bg-base-300 h-96 shadow-xl grid justify-center p-10 space-y-8 place-items-center max-w-lg text-center">
          <h2>Let's Begin By Connecting Your Wallet:</h2>
          <ConnectKitButton />
        </div>
      )}
    </main>
  );
}
