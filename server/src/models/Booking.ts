import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export enum BookingType {
    HOUSEKEEPING = 'housekeeping',
    DOGWALK = 'dog walk'
}

@Entity()
export class Booking {  
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    // TODO: convert to reference another entity
    @Column()
    address: string;

    @Column({
        type: 'enum',
        enum: BookingType
    })
    type: BookingType;

    @Column({
        type: 'date'
    })
    date: string;

    @Column({
        type: 'time'
    })
    time: string;
}