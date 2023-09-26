import { AppDataSource } from "../data-source";
import { Erc20Balances } from "../entity/Erc20Balances";
import { EthBalances } from "../entity/EthBalances";
import { NftBalances } from "../entity/NftBalances";
import { PoolBalances } from "../entity/PoolBalances";
import { getWallet, saveWallet } from "./wallet.service";

const erc20BalanceRepository = AppDataSource.getRepository(Erc20Balances);
const ethBalanceRepository = AppDataSource.getRepository(EthBalances);
const nftBalanceRepository = AppDataSource.getRepository(NftBalances);
const poolBalanceRepository = AppDataSource.getRepository(PoolBalances);

export const saveErc20Balance = async (balanceData: any) => {
  let balance: any;
  const { walletAddress, tokenAddress } = balanceData;
  let wallet = await getWallet(walletAddress);

  const existingBalance = await erc20BalanceRepository.findOne({
    where: {
      tokenAddress: tokenAddress,
      wallet: {
        address: walletAddress.toLowerCase(),
      },
    },
    relations: {
      wallet: true,
    },
  });

  if (!wallet) {
    wallet = await saveWallet(walletAddress);
  }
  if (existingBalance) {
    balance = existingBalance;
    balance.balance = (
      BigInt(existingBalance.balance) + BigInt(balanceData.balance.toString())
    ).toString();
    if (BigInt(balance.balance) >= 0) {
      await erc20BalanceRepository.save(balance);
    }
  } else {
    if (balanceData.balance > 0) {

      const data = {
        tokenAddress: balanceData.tokenAddress,
        balance: balanceData.balance,
        symbol: balanceData.symbol,
        decimals: balanceData.decimals,
        wallet: wallet,
      };

      return await erc20BalanceRepository.save(data);
    }
  }
};

export const saveEthBalance = async (balanceData: any, operation: string) => {
  let balance: any;
  const { walletAddress, tokenAddress } = balanceData;
  let wallet = await getWallet(walletAddress);

  const existingBalance = await ethBalanceRepository.findOne({
    where: {
      tokenAddress: balanceData.tokenAddress,
      wallet: {
        address: balanceData.walletAddress,
      },
    },
    relations: {
      wallet: true,
    },
  });

  if (!wallet) {
    wallet = await saveWallet(walletAddress);
  }

  if (existingBalance) {
    balance = existingBalance;
    if (operation === "sub") {
      balance.balance = (
        BigInt(existingBalance.balance) - BigInt(balanceData.balance)
      ).toString();
    } else {
      balance.balance = (
        BigInt(existingBalance.balance) + BigInt(balanceData.balance)
      ).toString();
    }
    if (BigInt(balance.balance) >= 0) {
      await ethBalanceRepository.save(existingBalance);
    }
  } else {
    const data = {
      tokenAddress: balanceData.tokenAddress,
      balance: balanceData.balance,
      wallet: wallet,
    };

    await ethBalanceRepository.save(data);
  }
};

export const saveNftBalance = async (balanceData: any) => {
  let balance: NftBalances;
  const { walletAddress } = balanceData;
  let wallet = await getWallet(walletAddress);

  const existingBalance = await nftBalanceRepository.findOne({
    where: {
      collectionAddress: balanceData.collectionAddress,
      tokenId: balanceData.tokenId,
      wallet: {
        address: balanceData.walletAddress,
      },
    },
    relations: {
      wallet: true,
    },
  });

  if (!wallet) {
    wallet = await saveWallet(walletAddress);
  }

  try {
    if (existingBalance) {
      console.log(existingBalance)
      balance = existingBalance;
      balance.balance = (
        BigInt(existingBalance.balance.toString()) +
        BigInt(balanceData.balance.toString())
      ).toString();
      if (BigInt(balance.balance) >= 0) {
        await nftBalanceRepository.save(existingBalance);
      }
    } else {
      const data = {
        collectionAddress: balanceData.collectionAddress,
        balance: balanceData.balance,
        tokenId: balanceData?.tokenId?.toString(),
        type: balanceData.type,
        wallet: wallet,
      };

      await nftBalanceRepository.save(data);
    }
  }
  catch (err) {
    console.log(err)
  }
};

export const savePoolBalance = async (balanceData: any) => {
  let balance: any;
  const { walletAddress } = balanceData;
  const wallet = await getWallet(walletAddress);

  const existingBalance = await poolBalanceRepository.findOne({
    where: {
      tokenAddress: balanceData.tokenAddress,
      wallet: {
        address: balanceData.walletAddress,
      },
    },
    relations: {
      wallet: true,
    },
  });

  if (!wallet) {
    await saveWallet(walletAddress);
  }

  if (existingBalance) {
    balance = existingBalance;
    balance.balance = (
      BigInt(existingBalance.balance) + BigInt(balanceData.balance.toString())
    ).toString();
    await poolBalanceRepository.save(existingBalance);
  } else {
    await poolBalanceRepository.save(balanceData);
  }
};
