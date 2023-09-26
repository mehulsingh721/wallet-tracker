import { Entity, PrimaryGeneratedColumn, Column, Unique } from "typeorm"

@Entity()
export class Erc20TransactionHistory {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    tokenAddress: string

    @Column({nullable: true})
    from: string

    @Column({nullable: true})
    to: string

    @Column({nullable: true})
    amount: string

    @Column({nullable: true})
    symbol: string

    @Column({nullable: true})
    decimals: number

    @Column()
    timestamp: string

    @Column({nullable: true})
    txHash: string
}