'use client';
import { useNetwork, useSwitchNetwork } from 'wagmi';

export default function Network() {
  const { chain } = useNetwork();
  const { chains, error, isLoading, pendingChainId, switchNetwork } =
    useSwitchNetwork();
  return (
    <div className="text-sm">
      Connected to: <span className="text-green-400">{chain?.name}</span>
      {chains.length > 1 ? (
        chains.map(x => (
          <button
            disabled={!switchNetwork || x.id === chain?.id}
            key={x.id}
            onClick={() => switchNetwork?.(x.id)}
            className="btn btn-sm btn-secondary"
          >
            Switch Networks
            {isLoading && pendingChainId === x.id && ' (switching)'}
          </button>
        ))
      ) : (
        <p className="text-[0.6rem] pt-2">
          Add another chain in the wagmi.ts file to switch.
        </p>
      )}
      <div>{error && error.message}</div>
    </div>
  );
}
