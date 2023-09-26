import { Entity, PrimaryGeneratedColumn, Column, Unique, ManyToOne } from "typeorm"
import { Wallet } from "./Wallet"

@Entity()
export class Erc20Balances {
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

    @ManyToOne(() => Wallet, (wallet) => wallet.erc20Balances)
    wallet: Wallet
}