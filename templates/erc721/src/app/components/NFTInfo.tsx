'use client';

import Mint from './Mint';
import Socials from './Socials';
/**
 * Symbol and name are standard ERC721 metadata fields
 * If you are experiencing import errors, it might be because the contract you are using
 * does not have these fields or changed the variable name.
 * You can remove the import or update the import and the fields if this is the case.
 */
import { useBaseNftSymbol, useBaseNftName } from '@src/generated';

export default function NFTInfo() {
  const { data: symbol } = useBaseNftSymbol();
  const { data: name } = useBaseNftName();
  return (
    <div className="grid mx-10">
      <div className="grid md:grid-cols-2 grid-cols-1 gap-10 h-fit">
        <div className="col-span-1 justify-center place-items-center align-middle grid space-y-4">
          <div className="bg-primary w-96 h-96 rounded-md place-items-center grid-flow-col justify-center grid">
            {/**
             * Add your image source here
             * <img src={""} className="w-full h-full rounded-md" />
             * */}
            <p className="text-center">Add Image</p>
          </div>
          <Mint />
        </div>
        <div className="col-span-1 justify-start text-white  align-middle space-y-4">
          <h2 className=" text-3xl font-black">
            {name} <span className="font-thin text-lg ml-3">{symbol}</span>
          </h2>
          <hr className="border-1 border-white border-opacity-60" />
          <p className="text-xl font-semibold">0.00 ETH</p>
          <p className=" text-md font-thin">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <p className="text-lg">Total Supply: 10,0000</p>
          <hr className="border-1 border-white border-opacity-60" />
          <div className="pt-18">
            <Socials />
          </div>
        </div>
      </div>
    </div>
  );
}
