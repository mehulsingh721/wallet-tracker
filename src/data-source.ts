import "reflect-metadata"
import { DataSource } from "typeorm"
import { createPublicClient, http } from "viem"
import { mainnet } from 'viem/chains'
import { Wallet } from "./entity/Wallet"
import { Erc20Balances } from "./entity/Erc20Balances"
import { EthBalances } from "./entity/EthBalances"
import { NftBalances } from "./entity/NftBalances"
import { PoolBalances } from "./entity/PoolBalances"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "192.168.29.66",
    port: 5432,
    username: "admin",
    password: "admin@123",
    database: "wallet-tracker",
    synchronize: true,
    logging: false,
    entities: [Erc20Balances, EthBalances, NftBalances, PoolBalances, Wallet],
    migrations: [],
    subscribers: [],
})

export const publicClient = createPublicClient({
    chain: mainnet,
    transport: http("https://rpc.pulsechain.com/")
})