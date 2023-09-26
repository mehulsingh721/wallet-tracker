import { saveEthBalance, saveNftBalance } from "../services/balance.service";

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
