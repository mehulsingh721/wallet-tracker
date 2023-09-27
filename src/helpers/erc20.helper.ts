import { ethers } from "ethers";
import { RPC } from "../utils";
import { getTokenInfo } from "./token.helpers";
import { saveErc20Balance } from "../services/balance.service";
import { readTokenContract } from "./contract.helper";

const ethersProvider = new ethers.JsonRpcProvider(RPC);

export const saveErc20Token = async (
  walletAddress: any,
  tokenAddress: any,
  amount: any
) => {
  const token0Data: any = await getTokenInfo(tokenAddress).catch((err) => {
    console.log(err);
  });

  const balance: any = {
    tokenAddress: tokenAddress ? token0Data.address?.toLowerCase() : null,
    balance: amount?.toString(),
    symbol: token0Data.symbol,
    decimals: token0Data?.decimals,
    walletAddress: walletAddress.toLowerCase(),
  };

  await saveErc20Balance(balance);
};

export const getContractBalance = async (tokenAddress: any, contractAddress: string) => {
    const balance = await readTokenContract(tokenAddress, "balanceOf", [contractAddress]).catch(err => {})
    return balance
}