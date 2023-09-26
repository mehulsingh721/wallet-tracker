import { Entity, PrimaryGeneratedColumn, Column, Unique, ManyToOne } from "typeorm"
import { Wallet } from "./Wallet"

@Entity()
export class PoolBalances {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    tokenAddress: string

    @Column({nullable: true})
    balance: string

    @Column({nullable: true})
    symbol: string

    @Column({nullable: true})
    decimals: number

    @ManyToOne(() => Wallet, (wallet) => wallet.poolBalances)
    wallet: Wallet
}