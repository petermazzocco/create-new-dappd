'use client';

import {
  useTestTokenTransfer,
  usePrepareTestTokenTransfer,
} from '@src/generated';
import type { Address } from 'viem';
import { useState } from 'react';

export default function Transfer() {
  const [toAddr, setToAddr] = useState<Address>();
  const [amount, setAmount] = useState<number>(0);
  const handleAmount = e => {
    const ethAmount = Number(e.target.value);
    const weiAmount = ethAmount * 1e18;

    setAmount(weiAmount);
  };

  const { config } = usePrepareTestTokenTransfer({
    args: [toAddr, amount],
  });
  const { write, isError, isSuccess, isLoading, data } =
    useTestTokenTransfer(config);

  return (
    <div className="grid justify-center space-y-4">
      <input
        className="input-sm p-4"
        placeholder="Address"
        type="text"
        onChange={e => {
          setToAddr(`${e.target.value}` as Address);
        }}
      />
      <input
        className="input-sm p-4"
        placeholder="Amount"
        type="number"
        onChange={handleAmount}
      />
      <button
        type="button"
        disabled={!write}
        className="btn btn-sm btn-neutral"
        onClick={() => write?.()}
      >
        Transfer Tokens
      </button>
      {isError && <div className="text-red-500">Error Occurred</div>}
      {isSuccess && <div className="text-green-500">Success</div>}
    </div>
  );
}
