import 'reflect-metadata';
import { createConnection } from 'typeorm';
import dotenv from 'dotenv';

dotenv.config();

const connection = createConnection({
    type: 'mysql',
    host: process.env.HOST,
    port: 3306,
    username: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DB,
    entities: []
});

export default connection;