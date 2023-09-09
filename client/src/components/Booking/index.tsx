/**
 * Booking
 * Author: Rhys Wright
 * Description: Pulls booking data from the API and formats the information into a table for the user to view
 * Usage: Display table of booking data to the user 
 */

import React, { useState, useEffect } from 'react';
import { 
    TableContainer, 
    TableHead, 
    TableBody,
    TableRow, 
    TableCell, 
    Paper, 
    Table
} from '@mui/material';
import axios from 'axios';

import dateTimeFormat from '../../utils/DateTimeFormat';
import typeFormat from '../../utils/TypeFormat';

const Booking = () => {
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        const getBookings = async () => {
            await axios.get(`/api/bookings`)
                .then((bookings) => setBookings(bookings.data))
                .catch((err) => console.error(err));
        }

        getBookings();
    }, []);

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="bookings">
                <TableHead style={{backgroundColor: '#D3D3D3'}}>
                    <TableRow>
                        <TableCell align="left">Customer</TableCell>
                        <TableCell align="left">Email</TableCell>
                        <TableCell align="left">Address</TableCell>
                        <TableCell align="left">Booking Type</TableCell>
                        <TableCell align="right">Booking Date/Time</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {bookings.map((booking: any) => (
                        <TableRow
                            key={booking.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell align="left">{booking.name}</TableCell>
                            <TableCell align="left">{booking.email}</TableCell>
                            <TableCell align="left">
                                {booking.address.street} <br />
                                {booking.address.city}, {booking.address.state}, {booking.address.zip}
                            </TableCell>
                            <TableCell align="left">{typeFormat(booking.type)}</TableCell>
                            <TableCell align="right">{dateTimeFormat(booking.date, booking.time)}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default Booking;