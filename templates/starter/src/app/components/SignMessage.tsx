'use client';

import { useSignMessage } from 'wagmi';

export default function SignMessage() {
  const { data, isError, isLoading, isSuccess, signMessage } = useSignMessage({
    message: 'Welcome to create-new-dappd! 🚀',
  });
  return (
    <div>
      <button
        className="btn btn-sm btn-secondary"
        disabled={isLoading}
        onClick={() => signMessage()}
      >
        Initiate Signature
      </button>
      {isSuccess && (
        <div className=" grid space-y-2 pt-2">
          <p className=" text-green-400">Signed!</p>{' '}
          <p className="text-xs">
            {data?.slice(0, 2)}...{data?.slice(-4)}
          </p>
        </div>
      )}
      {isError && (
        <div className=" grid space-y-2">
          <p className=" text-red-400">Error occurred.</p>{' '}
        </div>
      )}
    </div>
  );
}
