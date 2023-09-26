import { Entity, PrimaryGeneratedColumn, Column, Unique } from "typeorm"

@Entity()
export class EthTransactionHistory {
    @PrimaryGeneratedColumn()
    id: number

    @Column({nullable: true})
    from: string

    @Column({nullable: true})
    to: string

    @Column({nullable: true})
    amount: string

    @Column({nullable: true})
    txHash: string

    @Column()
    timestamp: string
}