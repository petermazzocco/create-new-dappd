'use client';

import {
  useTestTokenSymbol,
  useTestTokenName,
  useTestTokenTotalSupply,
} from '@src/generated';

export default function TokenInfo() {
  const { data: symbol } = useTestTokenSymbol();
  const { data: name } = useTestTokenName();
  const { data: totalSupply } = useTestTokenTotalSupply();

  const totalSupplyWeiToEth = totalSupply
    ? (Number(totalSupply) / 10 ** 18).toFixed(2)
    : null;

  return (
    <div className="bg-base-3 00 p-8 rounded-lg grid justify-center space-y-4">
      <p className=" border-2 border-orange-400 rounded-xl p-2 hover:bg-orange-400">
        {name}({symbol})
      </p>
      <p className=" border-2 border-orange-400 rounded-xl p-2 hover:bg-orange-400">
        Total Supply: {totalSupplyWeiToEth?.toString()}
      </p>
    </div>
  );
}
