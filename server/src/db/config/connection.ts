import 'reflect-metadata';
import { createConnection } from 'typeorm';
import dotenv from 'dotenv';

import { Booking, Address } from '../../models';

dotenv.config();

const connection = createConnection(process.env.NODE_ENV === 'production' ? {
    type: 'mysql',
    url: process.env.JAWSDB_URL,
    entities: [Booking, Address]
} : {
    type: 'mysql',
    host: process.env.HOST,
    port: 3306,
    username: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DB,
    entities: [Booking, Address],
    synchronize: true
});

export default connection;