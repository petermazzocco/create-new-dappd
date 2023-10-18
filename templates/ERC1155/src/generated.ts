import {
  useContractRead,
  UseContractReadConfig,
  useContractWrite,
  Address,
  UseContractWriteConfig,
  usePrepareContractWrite,
  UsePrepareContractWriteConfig,
  useContractEvent,
  UseContractEventConfig,
} from 'wagmi';
import {
  ReadContractResult,
  WriteContractMode,
  PrepareWriteContractResult,
} from 'wagmi/actions';

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// CuteCorgis
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x50146aFedF55413FBc235a9F61c74AdC3f951E87)
 */
export const cuteCorgisABI = [
  { stateMutability: 'nonpayable', type: 'constructor', inputs: [] },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'operator',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      { name: 'approved', internalType: 'bool', type: 'bool', indexed: false },
    ],
    name: 'ApprovalForAll',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnershipTransferred',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'operator',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'ids',
        internalType: 'uint256[]',
        type: 'uint256[]',
        indexed: false,
      },
      {
        name: 'values',
        internalType: 'uint256[]',
        type: 'uint256[]',
        indexed: false,
      },
    ],
    name: 'TransferBatch',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'operator',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      { name: 'id', internalType: 'uint256', type: 'uint256', indexed: false },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'TransferSingle',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'value', internalType: 'string', type: 'string', indexed: false },
      { name: 'id', internalType: 'uint256', type: 'uint256', indexed: true },
    ],
    name: 'URI',
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'MAX_MINT',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'MAX_SUPPLY',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'MINT_PRICE',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'active',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'account', internalType: 'address', type: 'address' },
      { name: 'id', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'accounts', internalType: 'address[]', type: 'address[]' },
      { name: 'ids', internalType: 'uint256[]', type: 'uint256[]' },
    ],
    name: 'balanceOfBatch',
    outputs: [{ name: '', internalType: 'uint256[]', type: 'uint256[]' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'baseURI',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'currentTokenId',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'hasMinted',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_active', internalType: 'bool', type: 'bool' }],
    name: 'isActive',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'account', internalType: 'address', type: 'address' },
      { name: 'operator', internalType: 'address', type: 'address' },
    ],
    name: 'isApprovedForAll',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      { name: 'account', internalType: 'address', type: 'address' },
      { name: 'id', internalType: 'uint256', type: 'uint256' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'mint',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'ids', internalType: 'uint256[]', type: 'uint256[]' },
      { name: 'amounts', internalType: 'uint256[]', type: 'uint256[]' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'safeBatchTransferFrom',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'id', internalType: 'uint256', type: 'uint256' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: 'approved', internalType: 'bool', type: 'bool' },
    ],
    name: 'setApprovalForAll',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'newuri', internalType: 'string', type: 'string' }],
    name: 'setURI',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'uri',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
] as const;

/**
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x50146aFedF55413FBc235a9F61c74AdC3f951E87)
 */
export const cuteCorgisAddress = {
  11155111: '0x50146aFedF55413FBc235a9F61c74AdC3f951E87',
} as const;

/**
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x50146aFedF55413FBc235a9F61c74AdC3f951E87)
 */
export const cuteCorgisConfig = {
  address: cuteCorgisAddress,
  abi: cuteCorgisABI,
} as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link cuteCorgisABI}__.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x50146aFedF55413FBc235a9F61c74AdC3f951E87)
 */
export function useCuteCorgisRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof cuteCorgisABI, TFunctionName>
>(
  config: Omit<
    UseContractReadConfig<typeof cuteCorgisABI, TFunctionName, TSelectData>,
    'abi' | 'address'
  > & { chainId?: keyof typeof cuteCorgisAddress } = {} as any
) {
  return useContractRead({
    abi: cuteCorgisABI,
    address: cuteCorgisAddress[11155111],
    ...config,
  } as UseContractReadConfig<typeof cuteCorgisABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link cuteCorgisABI}__ and `functionName` set to `"MAX_MINT"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x50146aFedF55413FBc235a9F61c74AdC3f951E87)
 */
export function useCuteCorgisMaxMint<
  TFunctionName extends 'MAX_MINT',
  TSelectData = ReadContractResult<typeof cuteCorgisABI, TFunctionName>
>(
  config: Omit<
    UseContractReadConfig<typeof cuteCorgisABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof cuteCorgisAddress } = {} as any
) {
  return useContractRead({
    abi: cuteCorgisABI,
    address: cuteCorgisAddress[11155111],
    functionName: 'MAX_MINT',
    ...config,
  } as UseContractReadConfig<typeof cuteCorgisABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link cuteCorgisABI}__ and `functionName` set to `"MAX_SUPPLY"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x50146aFedF55413FBc235a9F61c74AdC3f951E87)
 */
export function useCuteCorgisMaxSupply<
  TFunctionName extends 'MAX_SUPPLY',
  TSelectData = ReadContractResult<typeof cuteCorgisABI, TFunctionName>
>(
  config: Omit<
    UseContractReadConfig<typeof cuteCorgisABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof cuteCorgisAddress } = {} as any
) {
  return useContractRead({
    abi: cuteCorgisABI,
    address: cuteCorgisAddress[11155111],
    functionName: 'MAX_SUPPLY',
    ...config,
  } as UseContractReadConfig<typeof cuteCorgisABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link cuteCorgisABI}__ and `functionName` set to `"MINT_PRICE"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x50146aFedF55413FBc235a9F61c74AdC3f951E87)
 */
export function useCuteCorgisMintPrice<
  TFunctionName extends 'MINT_PRICE',
  TSelectData = ReadContractResult<typeof cuteCorgisABI, TFunctionName>
>(
  config: Omit<
    UseContractReadConfig<typeof cuteCorgisABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof cuteCorgisAddress } = {} as any
) {
  return useContractRead({
    abi: cuteCorgisABI,
    address: cuteCorgisAddress[11155111],
    functionName: 'MINT_PRICE',
    ...config,
  } as UseContractReadConfig<typeof cuteCorgisABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link cuteCorgisABI}__ and `functionName` set to `"active"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x50146aFedF55413FBc235a9F61c74AdC3f951E87)
 */
export function useCuteCorgisActive<
  TFunctionName extends 'active',
  TSelectData = ReadContractResult<typeof cuteCorgisABI, TFunctionName>
>(
  config: Omit<
    UseContractReadConfig<typeof cuteCorgisABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof cuteCorgisAddress } = {} as any
) {
  return useContractRead({
    abi: cuteCorgisABI,
    address: cuteCorgisAddress[11155111],
    functionName: 'active',
    ...config,
  } as UseContractReadConfig<typeof cuteCorgisABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link cuteCorgisABI}__ and `functionName` set to `"balanceOf"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x50146aFedF55413FBc235a9F61c74AdC3f951E87)
 */
export function useCuteCorgisBalanceOf<
  TFunctionName extends 'balanceOf',
  TSelectData = ReadContractResult<typeof cuteCorgisABI, TFunctionName>
>(
  config: Omit<
    UseContractReadConfig<typeof cuteCorgisABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof cuteCorgisAddress } = {} as any
) {
  return useContractRead({
    abi: cuteCorgisABI,
    address: cuteCorgisAddress[11155111],
    functionName: 'balanceOf',
    ...config,
  } as UseContractReadConfig<typeof cuteCorgisABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link cuteCorgisABI}__ and `functionName` set to `"balanceOfBatch"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x50146aFedF55413FBc235a9F61c74AdC3f951E87)
 */
export function useCuteCorgisBalanceOfBatch<
  TFunctionName extends 'balanceOfBatch',
  TSelectData = ReadContractResult<typeof cuteCorgisABI, TFunctionName>
>(
  config: Omit<
    UseContractReadConfig<typeof cuteCorgisABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof cuteCorgisAddress } = {} as any
) {
  return useContractRead({
    abi: cuteCorgisABI,
    address: cuteCorgisAddress[11155111],
    functionName: 'balanceOfBatch',
    ...config,
  } as UseContractReadConfig<typeof cuteCorgisABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link cuteCorgisABI}__ and `functionName` set to `"baseURI"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x50146aFedF55413FBc235a9F61c74AdC3f951E87)
 */
export function useCuteCorgisBaseUri<
  TFunctionName extends 'baseURI',
  TSelectData = ReadContractResult<typeof cuteCorgisABI, TFunctionName>
>(
  config: Omit<
    UseContractReadConfig<typeof cuteCorgisABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof cuteCorgisAddress } = {} as any
) {
  return useContractRead({
    abi: cuteCorgisABI,
    address: cuteCorgisAddress[11155111],
    functionName: 'baseURI',
    ...config,
  } as UseContractReadConfig<typeof cuteCorgisABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link cuteCorgisABI}__ and `functionName` set to `"currentTokenId"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x50146aFedF55413FBc235a9F61c74AdC3f951E87)
 */
export function useCuteCorgisCurrentTokenId<
  TFunctionName extends 'currentTokenId',
  TSelectData = ReadContractResult<typeof cuteCorgisABI, TFunctionName>
>(
  config: Omit<
    UseContractReadConfig<typeof cuteCorgisABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof cuteCorgisAddress } = {} as any
) {
  return useContractRead({
    abi: cuteCorgisABI,
    address: cuteCorgisAddress[11155111],
    functionName: 'currentTokenId',
    ...config,
  } as UseContractReadConfig<typeof cuteCorgisABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link cuteCorgisABI}__ and `functionName` set to `"hasMinted"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x50146aFedF55413FBc235a9F61c74AdC3f951E87)
 */
export function useCuteCorgisHasMinted<
  TFunctionName extends 'hasMinted',
  TSelectData = ReadContractResult<typeof cuteCorgisABI, TFunctionName>
>(
  config: Omit<
    UseContractReadConfig<typeof cuteCorgisABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof cuteCorgisAddress } = {} as any
) {
  return useContractRead({
    abi: cuteCorgisABI,
    address: cuteCorgisAddress[11155111],
    functionName: 'hasMinted',
    ...config,
  } as UseContractReadConfig<typeof cuteCorgisABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link cuteCorgisABI}__ and `functionName` set to `"isApprovedForAll"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x50146aFedF55413FBc235a9F61c74AdC3f951E87)
 */
export function useCuteCorgisIsApprovedForAll<
  TFunctionName extends 'isApprovedForAll',
  TSelectData = ReadContractResult<typeof cuteCorgisABI, TFunctionName>
>(
  config: Omit<
    UseContractReadConfig<typeof cuteCorgisABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof cuteCorgisAddress } = {} as any
) {
  return useContractRead({
    abi: cuteCorgisABI,
    address: cuteCorgisAddress[11155111],
    functionName: 'isApprovedForAll',
    ...config,
  } as UseContractReadConfig<typeof cuteCorgisABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link cuteCorgisABI}__ and `functionName` set to `"owner"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x50146aFedF55413FBc235a9F61c74AdC3f951E87)
 */
export function useCuteCorgisOwner<
  TFunctionName extends 'owner',
  TSelectData = ReadContractResult<typeof cuteCorgisABI, TFunctionName>
>(
  config: Omit<
    UseContractReadConfig<typeof cuteCorgisABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof cuteCorgisAddress } = {} as any
) {
  return useContractRead({
    abi: cuteCorgisABI,
    address: cuteCorgisAddress[11155111],
    functionName: 'owner',
    ...config,
  } as UseContractReadConfig<typeof cuteCorgisABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link cuteCorgisABI}__ and `functionName` set to `"supportsInterface"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x50146aFedF55413FBc235a9F61c74AdC3f951E87)
 */
export function useCuteCorgisSupportsInterface<
  TFunctionName extends 'supportsInterface',
  TSelectData = ReadContractResult<typeof cuteCorgisABI, TFunctionName>
>(
  config: Omit<
    UseContractReadConfig<typeof cuteCorgisABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof cuteCorgisAddress } = {} as any
) {
  return useContractRead({
    abi: cuteCorgisABI,
    address: cuteCorgisAddress[11155111],
    functionName: 'supportsInterface',
    ...config,
  } as UseContractReadConfig<typeof cuteCorgisABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link cuteCorgisABI}__ and `functionName` set to `"uri"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x50146aFedF55413FBc235a9F61c74AdC3f951E87)
 */
export function useCuteCorgisUri<
  TFunctionName extends 'uri',
  TSelectData = ReadContractResult<typeof cuteCorgisABI, TFunctionName>
>(
  config: Omit<
    UseContractReadConfig<typeof cuteCorgisABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof cuteCorgisAddress } = {} as any
) {
  return useContractRead({
    abi: cuteCorgisABI,
    address: cuteCorgisAddress[11155111],
    functionName: 'uri',
    ...config,
  } as UseContractReadConfig<typeof cuteCorgisABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link cuteCorgisABI}__.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x50146aFedF55413FBc235a9F61c74AdC3f951E87)
 */
export function useCuteCorgisWrite<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof cuteCorgisAddress
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof cuteCorgisABI,
          string
        >['request']['abi'],
        TFunctionName,
        TMode
      > & { address?: Address; chainId?: TChainId }
    : UseContractWriteConfig<typeof cuteCorgisABI, TFunctionName, TMode> & {
        abi?: never;
        address?: never;
        chainId?: TChainId;
      } = {} as any
) {
  return useContractWrite<typeof cuteCorgisABI, TFunctionName, TMode>({
    abi: cuteCorgisABI,
    address: cuteCorgisAddress[11155111],
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link cuteCorgisABI}__ and `functionName` set to `"isActive"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x50146aFedF55413FBc235a9F61c74AdC3f951E87)
 */
export function useCuteCorgisIsActive<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof cuteCorgisAddress
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof cuteCorgisABI,
          'isActive'
        >['request']['abi'],
        'isActive',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: 'isActive' }
    : UseContractWriteConfig<typeof cuteCorgisABI, 'isActive', TMode> & {
        abi?: never;
        address?: never;
        chainId?: TChainId;
        functionName?: 'isActive';
      } = {} as any
) {
  return useContractWrite<typeof cuteCorgisABI, 'isActive', TMode>({
    abi: cuteCorgisABI,
    address: cuteCorgisAddress[11155111],
    functionName: 'isActive',
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link cuteCorgisABI}__ and `functionName` set to `"mint"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x50146aFedF55413FBc235a9F61c74AdC3f951E87)
 */
export function useCuteCorgisMint<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof cuteCorgisAddress
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof cuteCorgisABI,
          'mint'
        >['request']['abi'],
        'mint',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: 'mint' }
    : UseContractWriteConfig<typeof cuteCorgisABI, 'mint', TMode> & {
        abi?: never;
        address?: never;
        chainId?: TChainId;
        functionName?: 'mint';
      } = {} as any
) {
  return useContractWrite<typeof cuteCorgisABI, 'mint', TMode>({
    abi: cuteCorgisABI,
    address: cuteCorgisAddress[11155111],
    functionName: 'mint',
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link cuteCorgisABI}__ and `functionName` set to `"renounceOwnership"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x50146aFedF55413FBc235a9F61c74AdC3f951E87)
 */
export function useCuteCorgisRenounceOwnership<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof cuteCorgisAddress
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof cuteCorgisABI,
          'renounceOwnership'
        >['request']['abi'],
        'renounceOwnership',
        TMode
      > & {
        address?: Address;
        chainId?: TChainId;
        functionName?: 'renounceOwnership';
      }
    : UseContractWriteConfig<
        typeof cuteCorgisABI,
        'renounceOwnership',
        TMode
      > & {
        abi?: never;
        address?: never;
        chainId?: TChainId;
        functionName?: 'renounceOwnership';
      } = {} as any
) {
  return useContractWrite<typeof cuteCorgisABI, 'renounceOwnership', TMode>({
    abi: cuteCorgisABI,
    address: cuteCorgisAddress[11155111],
    functionName: 'renounceOwnership',
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link cuteCorgisABI}__ and `functionName` set to `"safeBatchTransferFrom"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x50146aFedF55413FBc235a9F61c74AdC3f951E87)
 */
export function useCuteCorgisSafeBatchTransferFrom<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof cuteCorgisAddress
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof cuteCorgisABI,
          'safeBatchTransferFrom'
        >['request']['abi'],
        'safeBatchTransferFrom',
        TMode
      > & {
        address?: Address;
        chainId?: TChainId;
        functionName?: 'safeBatchTransferFrom';
      }
    : UseContractWriteConfig<
        typeof cuteCorgisABI,
        'safeBatchTransferFrom',
        TMode
      > & {
        abi?: never;
        address?: never;
        chainId?: TChainId;
        functionName?: 'safeBatchTransferFrom';
      } = {} as any
) {
  return useContractWrite<typeof cuteCorgisABI, 'safeBatchTransferFrom', TMode>(
    {
      abi: cuteCorgisABI,
      address: cuteCorgisAddress[11155111],
      functionName: 'safeBatchTransferFrom',
      ...config,
    } as any
  );
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link cuteCorgisABI}__ and `functionName` set to `"safeTransferFrom"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x50146aFedF55413FBc235a9F61c74AdC3f951E87)
 */
export function useCuteCorgisSafeTransferFrom<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof cuteCorgisAddress
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof cuteCorgisABI,
          'safeTransferFrom'
        >['request']['abi'],
        'safeTransferFrom',
        TMode
      > & {
        address?: Address;
        chainId?: TChainId;
        functionName?: 'safeTransferFrom';
      }
    : UseContractWriteConfig<
        typeof cuteCorgisABI,
        'safeTransferFrom',
        TMode
      > & {
        abi?: never;
        address?: never;
        chainId?: TChainId;
        functionName?: 'safeTransferFrom';
      } = {} as any
) {
  return useContractWrite<typeof cuteCorgisABI, 'safeTransferFrom', TMode>({
    abi: cuteCorgisABI,
    address: cuteCorgisAddress[11155111],
    functionName: 'safeTransferFrom',
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link cuteCorgisABI}__ and `functionName` set to `"setApprovalForAll"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x50146aFedF55413FBc235a9F61c74AdC3f951E87)
 */
export function useCuteCorgisSetApprovalForAll<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof cuteCorgisAddress
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof cuteCorgisABI,
          'setApprovalForAll'
        >['request']['abi'],
        'setApprovalForAll',
        TMode
      > & {
        address?: Address;
        chainId?: TChainId;
        functionName?: 'setApprovalForAll';
      }
    : UseContractWriteConfig<
        typeof cuteCorgisABI,
        'setApprovalForAll',
        TMode
      > & {
        abi?: never;
        address?: never;
        chainId?: TChainId;
        functionName?: 'setApprovalForAll';
      } = {} as any
) {
  return useContractWrite<typeof cuteCorgisABI, 'setApprovalForAll', TMode>({
    abi: cuteCorgisABI,
    address: cuteCorgisAddress[11155111],
    functionName: 'setApprovalForAll',
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link cuteCorgisABI}__ and `functionName` set to `"setURI"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x50146aFedF55413FBc235a9F61c74AdC3f951E87)
 */
export function useCuteCorgisSetUri<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof cuteCorgisAddress
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof cuteCorgisABI,
          'setURI'
        >['request']['abi'],
        'setURI',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: 'setURI' }
    : UseContractWriteConfig<typeof cuteCorgisABI, 'setURI', TMode> & {
        abi?: never;
        address?: never;
        chainId?: TChainId;
        functionName?: 'setURI';
      } = {} as any
) {
  return useContractWrite<typeof cuteCorgisABI, 'setURI', TMode>({
    abi: cuteCorgisABI,
    address: cuteCorgisAddress[11155111],
    functionName: 'setURI',
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link cuteCorgisABI}__ and `functionName` set to `"transferOwnership"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x50146aFedF55413FBc235a9F61c74AdC3f951E87)
 */
export function useCuteCorgisTransferOwnership<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof cuteCorgisAddress
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof cuteCorgisABI,
          'transferOwnership'
        >['request']['abi'],
        'transferOwnership',
        TMode
      > & {
        address?: Address;
        chainId?: TChainId;
        functionName?: 'transferOwnership';
      }
    : UseContractWriteConfig<
        typeof cuteCorgisABI,
        'transferOwnership',
        TMode
      > & {
        abi?: never;
        address?: never;
        chainId?: TChainId;
        functionName?: 'transferOwnership';
      } = {} as any
) {
  return useContractWrite<typeof cuteCorgisABI, 'transferOwnership', TMode>({
    abi: cuteCorgisABI,
    address: cuteCorgisAddress[11155111],
    functionName: 'transferOwnership',
    ...config,
  } as any);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link cuteCorgisABI}__.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x50146aFedF55413FBc235a9F61c74AdC3f951E87)
 */
export function usePrepareCuteCorgisWrite<TFunctionName extends string>(
  config: Omit<
    UsePrepareContractWriteConfig<typeof cuteCorgisABI, TFunctionName>,
    'abi' | 'address'
  > & { chainId?: keyof typeof cuteCorgisAddress } = {} as any
) {
  return usePrepareContractWrite({
    abi: cuteCorgisABI,
    address: cuteCorgisAddress[11155111],
    ...config,
  } as UsePrepareContractWriteConfig<typeof cuteCorgisABI, TFunctionName>);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link cuteCorgisABI}__ and `functionName` set to `"isActive"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x50146aFedF55413FBc235a9F61c74AdC3f951E87)
 */
export function usePrepareCuteCorgisIsActive(
  config: Omit<
    UsePrepareContractWriteConfig<typeof cuteCorgisABI, 'isActive'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof cuteCorgisAddress } = {} as any
) {
  return usePrepareContractWrite({
    abi: cuteCorgisABI,
    address: cuteCorgisAddress[11155111],
    functionName: 'isActive',
    ...config,
  } as UsePrepareContractWriteConfig<typeof cuteCorgisABI, 'isActive'>);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link cuteCorgisABI}__ and `functionName` set to `"mint"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x50146aFedF55413FBc235a9F61c74AdC3f951E87)
 */
export function usePrepareCuteCorgisMint(
  config: Omit<
    UsePrepareContractWriteConfig<typeof cuteCorgisABI, 'mint'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof cuteCorgisAddress } = {} as any
) {
  return usePrepareContractWrite({
    abi: cuteCorgisABI,
    address: cuteCorgisAddress[11155111],
    functionName: 'mint',
    ...config,
  } as UsePrepareContractWriteConfig<typeof cuteCorgisABI, 'mint'>);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link cuteCorgisABI}__ and `functionName` set to `"renounceOwnership"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x50146aFedF55413FBc235a9F61c74AdC3f951E87)
 */
export function usePrepareCuteCorgisRenounceOwnership(
  config: Omit<
    UsePrepareContractWriteConfig<typeof cuteCorgisABI, 'renounceOwnership'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof cuteCorgisAddress } = {} as any
) {
  return usePrepareContractWrite({
    abi: cuteCorgisABI,
    address: cuteCorgisAddress[11155111],
    functionName: 'renounceOwnership',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof cuteCorgisABI,
    'renounceOwnership'
  >);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link cuteCorgisABI}__ and `functionName` set to `"safeBatchTransferFrom"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x50146aFedF55413FBc235a9F61c74AdC3f951E87)
 */
export function usePrepareCuteCorgisSafeBatchTransferFrom(
  config: Omit<
    UsePrepareContractWriteConfig<
      typeof cuteCorgisABI,
      'safeBatchTransferFrom'
    >,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof cuteCorgisAddress } = {} as any
) {
  return usePrepareContractWrite({
    abi: cuteCorgisABI,
    address: cuteCorgisAddress[11155111],
    functionName: 'safeBatchTransferFrom',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof cuteCorgisABI,
    'safeBatchTransferFrom'
  >);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link cuteCorgisABI}__ and `functionName` set to `"safeTransferFrom"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x50146aFedF55413FBc235a9F61c74AdC3f951E87)
 */
export function usePrepareCuteCorgisSafeTransferFrom(
  config: Omit<
    UsePrepareContractWriteConfig<typeof cuteCorgisABI, 'safeTransferFrom'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof cuteCorgisAddress } = {} as any
) {
  return usePrepareContractWrite({
    abi: cuteCorgisABI,
    address: cuteCorgisAddress[11155111],
    functionName: 'safeTransferFrom',
    ...config,
  } as UsePrepareContractWriteConfig<typeof cuteCorgisABI, 'safeTransferFrom'>);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link cuteCorgisABI}__ and `functionName` set to `"setApprovalForAll"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x50146aFedF55413FBc235a9F61c74AdC3f951E87)
 */
export function usePrepareCuteCorgisSetApprovalForAll(
  config: Omit<
    UsePrepareContractWriteConfig<typeof cuteCorgisABI, 'setApprovalForAll'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof cuteCorgisAddress } = {} as any
) {
  return usePrepareContractWrite({
    abi: cuteCorgisABI,
    address: cuteCorgisAddress[11155111],
    functionName: 'setApprovalForAll',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof cuteCorgisABI,
    'setApprovalForAll'
  >);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link cuteCorgisABI}__ and `functionName` set to `"setURI"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x50146aFedF55413FBc235a9F61c74AdC3f951E87)
 */
export function usePrepareCuteCorgisSetUri(
  config: Omit<
    UsePrepareContractWriteConfig<typeof cuteCorgisABI, 'setURI'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof cuteCorgisAddress } = {} as any
) {
  return usePrepareContractWrite({
    abi: cuteCorgisABI,
    address: cuteCorgisAddress[11155111],
    functionName: 'setURI',
    ...config,
  } as UsePrepareContractWriteConfig<typeof cuteCorgisABI, 'setURI'>);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link cuteCorgisABI}__ and `functionName` set to `"transferOwnership"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x50146aFedF55413FBc235a9F61c74AdC3f951E87)
 */
export function usePrepareCuteCorgisTransferOwnership(
  config: Omit<
    UsePrepareContractWriteConfig<typeof cuteCorgisABI, 'transferOwnership'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof cuteCorgisAddress } = {} as any
) {
  return usePrepareContractWrite({
    abi: cuteCorgisABI,
    address: cuteCorgisAddress[11155111],
    functionName: 'transferOwnership',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof cuteCorgisABI,
    'transferOwnership'
  >);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link cuteCorgisABI}__.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x50146aFedF55413FBc235a9F61c74AdC3f951E87)
 */
export function useCuteCorgisEvent<TEventName extends string>(
  config: Omit<
    UseContractEventConfig<typeof cuteCorgisABI, TEventName>,
    'abi' | 'address'
  > & { chainId?: keyof typeof cuteCorgisAddress } = {} as any
) {
  return useContractEvent({
    abi: cuteCorgisABI,
    address: cuteCorgisAddress[11155111],
    ...config,
  } as UseContractEventConfig<typeof cuteCorgisABI, TEventName>);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link cuteCorgisABI}__ and `eventName` set to `"ApprovalForAll"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x50146aFedF55413FBc235a9F61c74AdC3f951E87)
 */
export function useCuteCorgisApprovalForAllEvent(
  config: Omit<
    UseContractEventConfig<typeof cuteCorgisABI, 'ApprovalForAll'>,
    'abi' | 'address' | 'eventName'
  > & { chainId?: keyof typeof cuteCorgisAddress } = {} as any
) {
  return useContractEvent({
    abi: cuteCorgisABI,
    address: cuteCorgisAddress[11155111],
    eventName: 'ApprovalForAll',
    ...config,
  } as UseContractEventConfig<typeof cuteCorgisABI, 'ApprovalForAll'>);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link cuteCorgisABI}__ and `eventName` set to `"OwnershipTransferred"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x50146aFedF55413FBc235a9F61c74AdC3f951E87)
 */
export function useCuteCorgisOwnershipTransferredEvent(
  config: Omit<
    UseContractEventConfig<typeof cuteCorgisABI, 'OwnershipTransferred'>,
    'abi' | 'address' | 'eventName'
  > & { chainId?: keyof typeof cuteCorgisAddress } = {} as any
) {
  return useContractEvent({
    abi: cuteCorgisABI,
    address: cuteCorgisAddress[11155111],
    eventName: 'OwnershipTransferred',
    ...config,
  } as UseContractEventConfig<typeof cuteCorgisABI, 'OwnershipTransferred'>);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link cuteCorgisABI}__ and `eventName` set to `"TransferBatch"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x50146aFedF55413FBc235a9F61c74AdC3f951E87)
 */
export function useCuteCorgisTransferBatchEvent(
  config: Omit<
    UseContractEventConfig<typeof cuteCorgisABI, 'TransferBatch'>,
    'abi' | 'address' | 'eventName'
  > & { chainId?: keyof typeof cuteCorgisAddress } = {} as any
) {
  return useContractEvent({
    abi: cuteCorgisABI,
    address: cuteCorgisAddress[11155111],
    eventName: 'TransferBatch',
    ...config,
  } as UseContractEventConfig<typeof cuteCorgisABI, 'TransferBatch'>);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link cuteCorgisABI}__ and `eventName` set to `"TransferSingle"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x50146aFedF55413FBc235a9F61c74AdC3f951E87)
 */
export function useCuteCorgisTransferSingleEvent(
  config: Omit<
    UseContractEventConfig<typeof cuteCorgisABI, 'TransferSingle'>,
    'abi' | 'address' | 'eventName'
  > & { chainId?: keyof typeof cuteCorgisAddress } = {} as any
) {
  return useContractEvent({
    abi: cuteCorgisABI,
    address: cuteCorgisAddress[11155111],
    eventName: 'TransferSingle',
    ...config,
  } as UseContractEventConfig<typeof cuteCorgisABI, 'TransferSingle'>);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link cuteCorgisABI}__ and `eventName` set to `"URI"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x50146aFedF55413FBc235a9F61c74AdC3f951E87)
 */
export function useCuteCorgisUriEvent(
  config: Omit<
    UseContractEventConfig<typeof cuteCorgisABI, 'URI'>,
    'abi' | 'address' | 'eventName'
  > & { chainId?: keyof typeof cuteCorgisAddress } = {} as any
) {
  return useContractEvent({
    abi: cuteCorgisABI,
    address: cuteCorgisAddress[11155111],
    eventName: 'URI',
    ...config,
  } as UseContractEventConfig<typeof cuteCorgisABI, 'URI'>);
}
