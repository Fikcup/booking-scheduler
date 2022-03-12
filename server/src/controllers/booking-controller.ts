import { Request, Response } from 'express';
import { getConnection } from 'typeorm';

import { Booking, Address, BookingType } from '../models';
import AddressDto from '../dtos/address.dto';

const bookingController = {
    async getBookings(req: Request, res: Response) {
        try {
            const bookings = await getConnection()
                .createQueryBuilder()
                .select('booking')
                .from(Booking, 'booking')
                .innerJoinAndSelect('booking.address', 'address')
                .orderBy('booking.date', 'ASC')
                .getMany();
    
            res.status(200).send(bookings);
        } catch (err: any) {
            console.error(err);
            res.status(500).send(err.message);
        }
    },
    async createBooking(req: Request, res: Response) {
        const addressObj: AddressDto = {
            street: req.body.street,
            city: req.body.city,
            state: req.body.state,
            zip: req.body.zip
        }

        try {
            const address = await getConnection()
                .createQueryBuilder()
                .insert()
                .into(Address)
                .values([addressObj])
                .execute();

            let type;
            if (req.body.type === 'housekeeping') {
                type = BookingType.HOUSEKEEPING;
            }
    
            if (req.body.type === 'dog walk') {
                type = BookingType.DOGWALK;
            }
    
            const bookingObj = {
                name: req.body.name,
                email: req.body.email,
                type: type,
                date: req.body.date,
                time: req.body.time,
                address: address.raw.insertId
            };
    
            const booking = await getConnection()
                .createQueryBuilder()
                .insert()
                .into(Booking)
                .values([bookingObj])
                .execute();
    
            if (!address || !booking) {
                res.status(500).send({ message: 'Form data invalid' });
            }
    
            res.status(200).send(bookingObj);
        } catch (err: any) { 
            console.error(err);
            if (err.errno === 1062) {
                res.status(200).send({ message: 'Cannot contain duplicate entries' })
            } else {
                res.status(500).send(err.message); 
            }
        }
    }
}

export default bookingController;