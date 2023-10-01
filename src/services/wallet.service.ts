import { AppDataSource } from "../data-source"
import { Wallet } from "../entity/Wallet"

const walletRepository = AppDataSource.getRepository(Wallet)

export const saveWallet = async (walletAddress: any) => {
    return await walletRepository.save({
        address: walletAddress?.toLowerCase()
    })
}

export const getWallet = async (walletAddress: any) => {
    return await walletRepository.findOne({
        where: {
            address: walletAddress?.toLowerCase()
        },
        relations: {
            erc20Balances: true,
            nftBalances: true,
            poolBalances: true
        }
    })
}