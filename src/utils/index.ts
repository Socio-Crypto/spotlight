import { Contract, getDefaultProvider } from "ethers";
import {
  AxelarQueryAPI,
  Environment,
  EvmChain,
  GasToken,
} from "@axelar-network/axelarjs-sdk";

// import ERC721 from "../contracts/ERC721demo.sol/ERC721Demo.json";
// import NftLinker from "../contracts/NFTLinker.sol/NFTLinker.json";

import { defaultAbiCoder, keccak256 } from "ethers/lib/utils";
import { sleep } from "./sleep";

// delete after work //////////////////////////

import { isTestnet, wallet } from "../testforRunning/constants";
// delete after work //////////////////////////

interface ChainsType {
  name: EvmChain;
  chainId: number;
  rpc: string;
  gateway: string;
  gasReceiver: string;
  tokenName: string;
  tokenSymbol: string;
  executableSample: string;
  constAddressDeployer: string;
  crossChainToken: string;
  erc721: any;
  nftLinker: string;
  contract: any;
  wallet: any;
}

export const ownerOf = async (chain: any, tokenId: any) => {
  const operator = chain.erc721;
  const owner = await operator.ownerOf(tokenId);
  const metadata = await operator.tokenURI(tokenId);

  if (owner != chain.contract.address) {
    return {
      chain: chain.name,
      address: owner,
      tokenId: BigInt(tokenId),
      tokenURI: metadata,
    };
  } else {
    const newTokenId = BigInt(
      keccak256(
        defaultAbiCoder.encode(
          ["string", "address", "uint256", "string"],
          [chain.name, operator.address, tokenId, metadata]
        )
      )
    );

    // create destination chains in the future
    // for (let checkingChain of [chain , "destination chains"]) {
    //   if (checkingChain == chain) continue;
    //   try {
    //     const address = await checkingChain.contract.ownerOf(newTokenId);
    //     return {
    //       chain: checkingChain.name,
    //       address: address,
    //       tokenId: newTokenId,
    //       tokenURI: metadata,
    //     };
    //   } catch (e) {}
    // }
  }
  return { chain: "" };
};

export async function print(chains: any, tokenId: any) {
  for (const chain of chains) {
    const owner = await ownerOf(chains, tokenId);
    console.log(
      `Token that was originally minted at ${chain.name} is at ${owner.chain}.`
    );
  }
}

export const getGasFee = async (
  sourceChainName: EvmChain,
  destinationChainName: EvmChain,
  sourceChainTokenSymbol: GasToken | string,
  estimatedGasUsed?: number
) => {
  const api = new AxelarQueryAPI({ environment: Environment.TESTNET });
  const gasFee = isTestnet
    ? await api.estimateGasFee(
        sourceChainName,
        destinationChainName,
        sourceChainTokenSymbol
      )
    : 3e6;
  return gasFee;
};
