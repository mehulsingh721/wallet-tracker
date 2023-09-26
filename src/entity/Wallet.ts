import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { Erc20Balances } from "./Erc20Balances"
import { EthBalances } from "./EthBalances"
import { NftBalances } from "./NftBalances"
import { Erc20TransactionHistory } from "./Erc20TransactionHistory"
import { PoolBalances } from "./PoolBalances"

@Entity()
export class Wallet {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    address: string

    @OneToMany(() => Erc20Balances, (erc20Balance) => erc20Balance.wallet)
    erc20Balances: Erc20Balances[]

    @OneToMany(() => EthBalances, (ethBalance) => ethBalance.wallet)
    ethBalances: EthBalances[]

    @OneToMany(() => NftBalances, (nftBalance) => nftBalance.wallet)
    nftBalances: NftBalances[]

    @OneToMany(() => PoolBalances, (poolBalance) => poolBalance.wallet)
    poolBalances: PoolBalances[]
}