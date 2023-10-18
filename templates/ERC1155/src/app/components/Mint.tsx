'use client';

/**
 * If you are experiencing an error with the import, it might be because your "mint" function is
 * named something other than "mint". Please double check and change the name of the function
 * if this is the case.
 */
import { useCuteCorgisMint, usePrepareCuteCorgisMint } from '@src/generated';
import { Toaster, toast } from 'sonner';

export default function Mint() {
  const { config } = usePrepareCuteCorgisMint({
    // REPLACE WITH YOUR ARGUMENTS
    // If no arguments, you can remove.
    args: ['0.01', '0x56C33325b71d97951C85397E1Bf32aF3bB45f74a', 1, 0.01, '0x'],
  });
  const {
    write: mint,
    isSuccess: minted,
    isLoading: minting,
    isError: failedMint,
  } = useCuteCorgisMint(config);
  return (
    <div className="w-full">
      <Toaster richColors />
      <button
        onClick={() => mint?.()}
        type="button"
        //The button will be disabled if the arguments are incorrect.
        disabled={!mint}
        className="btn btn-sm btn-accent w-full"
      >
        Mint
      </button>
      {minting && toast('Minting...')}
      {minted && toast.success('Minted!')}
      {failedMint && toast.error('Failed to mint')}
    </div>
  );
}
