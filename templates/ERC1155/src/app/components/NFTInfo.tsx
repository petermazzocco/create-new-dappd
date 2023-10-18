'use client';

import useUriData from '../hooks/use-uri-data';
import Mint from './Mint';
import Socials from './Socials';

export default function NFTInfo() {
  const { data, isLoading, isError, isSuccess } = useUriData({
    uri: 'https://ipfs.io/ipfs/Qmeji1kHmGJBVDKLRXRXG42viH3mog5rQY3kNWgusGgP8h',
  });
  return (
    <div className="grid mx-10">
      <div className="grid md:grid-cols-2 grid-cols-1 gap-10 h-fit">
        {isLoading && <p>Loading...</p>}
        {isError && <p>Error fetching data</p>}
        {isSuccess && (
          <>
            <div className="col-span-1 justify-center place-items-center align-middle grid space-y-4">
              <div className="bg-primary w-96 h-96 rounded-md place-items-center grid-flow-col justify-center grid">
                {/* If image link is broken, check your IPFS gateway. */}
                <img src={data?.image} className="w-96 h-96 rounded-md" />
              </div>
              <Mint />
            </div>
            <div className="col-span-1 justify-start text-white  align-middle space-y-4">
              <h2 className=" text-3xl font-black">{data?.name}</h2>
              <hr className="border-1 border-white border-opacity-60" />
              <p className="text-xl font-semibold">0.00 ETH</p>
              <p className=" text-md font-thin">{data?.description}</p>
              <p className="text-lg">Total Supply: 10,0000</p>
              <hr className="border-1 border-white border-opacity-60" />
              <div className="pt-18">
                <Socials />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
