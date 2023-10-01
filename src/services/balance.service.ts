import { AppDataSource } from "../data-source";
import { Erc20Balances } from "../entity/Erc20Balances";
import { EthBalances } from "../entity/EthBalances";
import { NftBalances } from "../entity/NftBalances";
import { PoolBalances } from "../entity/PoolBalances";
import { getContractBalance } from "../helpers/erc20.helper";
import { getWalletBalance } from "../helpers/eth.helper";
import { check1155OwnerBalance, check721TokenOwner } from "../helpers/nft.helper";
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
    existingBalance.balance = (await getContractBalance(existingBalance.tokenAddress, existingBalance.wallet.address))?.toString()
    if (BigInt(existingBalance.balance) >= 0) {
      await erc20BalanceRepository.save(existingBalance);
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
      data.balance = (await getContractBalance(data.tokenAddress, data.wallet.address))?.toString()

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
    existingBalance.balance = (await getWalletBalance(existingBalance.wallet.address))?.toString()

    if (BigInt(existingBalance.balance) >= 0) {
      await ethBalanceRepository.save(existingBalance);
    }
  } else {
    const data = {
      tokenAddress: balanceData.tokenAddress,
      wallet: wallet,
      balance: ""
    };
    data.balance = (await getWalletBalance(data.wallet.address))?.toString()

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
      let balance: any
      if (existingBalance.type === "ERC1155") {
        balance = await check1155OwnerBalance(existingBalance.wallet.address, existingBalance.tokenId, existingBalance.collectionAddress)
      } else {
        balance = await check721TokenOwner(existingBalance.wallet.address, existingBalance.tokenId, existingBalance.collectionAddress)
      }
      if (BigInt(balance) >= BigInt(0)) {
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

      if (data.type === "ERC1155") {
        data.balance = await check1155OwnerBalance(data.wallet.address, data.tokenId, data.collectionAddress)
      } else {
        data.balance = await check721TokenOwner(data.wallet.address, data.tokenId, data.collectionAddress)
      }

      await nftBalanceRepository.save(data);
    }
  }
  catch (err) {
    console.log(err)
  }
};