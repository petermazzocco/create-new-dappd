'use client';

import { ConnectKitButton } from 'connectkit';
import { useAccount } from 'wagmi';
import Network from './components/Network';
import SignMessage from './components/SignMessage';
import Balance from './components/Balance';
import { GithubIcon, TwitterIcon } from 'lucide-react';

export default function Home() {
  const { isConnected } = useAccount();
  return (
    <main className="grid justify-center h-96 place-items-center align-middle space-y-4  p-24">
      {isConnected ? (
        <>
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
            <div className="bg-base-100 rounded-xl p-8 grid justify-center space-y-6">
              <h2 className="font-black text-2xl">Play Around:</h2>
              <div className="space-y-3">
                <p className="text-lg font-semibold">Switch Networks</p>
                <Network />
              </div>
              <hr className="border-secondary" />
              <div className="space-y-3">
                <p className="text-lg font-semibold">Sign A Message</p>
                <SignMessage />
              </div>
              <hr className="border-secondary" />
              <div className="space-y-3">
                <p className="text-lg font-semibold">Your ETH Balance</p>
                <Balance />
                <p className="text-[0.6rem]">
                  Switch wallets to see a new balance.
                </p>
              </div>
            </div>
            <div className="space-y-2 grid">
              <a
                href="https://github.com/petermazzocco/create-new-dappd"
                target="_blank"
                className="w-full"
              >
                <button className="flex flex-row w-full bg-orange-400 hover:scale-105 transition-all  text-white rounded-xl p-4 justify-between align-middle place-items-center space-x-4">
                  <p>View On Github</p>
                  <GithubIcon size={20} />
                </button>
              </a>
              <a
                href="https://twitter.com/petermazzocco"
                target="_blank"
                className="w-full"
              >
                <button className="flex flex-row w-full bg-blue-400 hover:scale-105 transition-all  text-white rounded-xl p-4 justify-between align-middle place-items-center space-x-4">
                  <p>Follow On Twitter</p>
                  <TwitterIcon size={20} />
                </button>
              </a>
            </div>
          </div>
        </>
      ) : (
        <div className="rounded-xl bg-base-300 h-96 shadow-xl grid justify-center p-10 space-y-8 place-items-center max-w-lg text-center">
          <h2>Let's Begin By Connecting Your Wallet:</h2>
          <ConnectKitButton />
        </div>
      )}
    </main>
  );
}
