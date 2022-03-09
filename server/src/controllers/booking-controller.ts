import { Request, Response } from 'express';
import { getConnection } from 'typeorm';

import { Booking, Address, BookingType } from '../models';
import AddressDto from '../dtos/address.dto';

const bookingController = {
    async getBookings(req: Request, res: Response) {
        const bookings = await getConnection()
            .createQueryBuilder()
            .select('booking')
            .from(Booking, 'booking')
            .getMany();

        res.status(200).send(bookings);
    },
    async createBooking(req: Request, res: Response) {
        // TODO: create safeguard for appointment time double booking

        const addressObj: AddressDto = {
            street: req.body.street,
            city: req.body.city,
            state: req.body.state,
            zip: req.body.zip
        }

        if (req.body.apt) {
            addressObj.apt = req.body.apt;
        }

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
    }
}

export default bookingController;