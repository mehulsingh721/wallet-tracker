import { saveEthBalance, saveNftBalance } from "../services/balance.service";
import { read1155Contract, read721Contract } from "./contract.helper";

export const saveNft = async (
  collectionAddress: any,
  walletAddress: any,
  tokenId: any,
  amount: any,
  type: any
) => {
  const balance: any = {
    collectionAddress: collectionAddress,
    balance: amount?.toString(),
    walletAddress: walletAddress?.toLowerCase(),
    tokenId: tokenId,
    type: type
  };

  await saveNftBalance(balance);
};

export const check721TokenOwner = async (address: string, tokenId: string, collectionAddress: string) => {
  const ownerOf: any = await read721Contract(collectionAddress, "ownerOf", [tokenId])

  if (ownerOf.toLowerCase() === address.toLowerCase()) {
    return 1
  } else {
    return 0
  }
}

export const check1155OwnerBalance = async (address: string, tokenId: string, collectionAddress: string) => {
  const balance: any = await read1155Contract(collectionAddress, "balanceOf", [address, tokenId])
  return balance
}