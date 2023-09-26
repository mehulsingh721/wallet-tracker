import { saveEthBalance } from "../services/balance.service";

export const saveEthToken = async (
  walletAddress: any,
  tokenAddress: any,
  amount: BigInt,
  operation: string
) => {
  const balance: any = {
    tokenAddress: tokenAddress,
    balance: amount,
    walletAddress: walletAddress?.toLowerCase(),
  };

  await saveEthBalance(balance, operation);
};
