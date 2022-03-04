import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { IsOptional, IsNotEmpty, Matches } from 'class-validator';

@Entity()
export class Address {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsNotEmpty()
    @Matches(/[,#-\/\s\!\@\$.....]/gi)
    street: string;

    @Column({
        nullable: true
    })
    @IsOptional()
    apt: string;

    @Column({
        length: 50
    })
    @IsNotEmpty()
    city: string;

    @Column({
        width: 2
    })
    @IsNotEmpty()
    state: string;

    @Column({
        width: 5,
    })
    zip: number;
}