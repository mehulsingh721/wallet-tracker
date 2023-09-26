import { Entity, PrimaryGeneratedColumn, Column, Unique, ManyToOne } from "typeorm"
import { Wallet } from "./Wallet"

@Entity()
export class NftBalances {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    collectionAddress: string

    @Column({nullable: true})
    balance: string

    @Column({nullable: true})
    tokenId: string

    @Column()
    type: string

    @ManyToOne(() => Wallet, (wallet) => wallet.nftBalances)
    wallet: Wallet
}