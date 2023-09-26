import { Entity, PrimaryGeneratedColumn, Column, Unique, ManyToOne } from "typeorm"
import { Wallet } from "./Wallet"

@Entity()
export class EthBalances {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    tokenAddress: string

    @Column({nullable: true})
    balance: string

    @ManyToOne(() => Wallet, (wallet) => wallet.ethBalances)
    wallet: Wallet
}