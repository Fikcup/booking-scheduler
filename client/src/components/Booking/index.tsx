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

const Booking = () => {
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        const getBookings = async () => {
            await axios.get('http://localhost:3001/api/bookings')
                .then((bookings) => setBookings(bookings.data))
                .catch((err) => console.error(err));
        }

        getBookings();
        console.log(bookings);
    }, []);

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="bookings">
                <TableHead>
                    <TableRow>
                        <TableCell align="center">Customer</TableCell>
                        <TableCell align="center">Email</TableCell>
                        <TableCell align="center">Address</TableCell>
                        <TableCell align="center">Booking Type</TableCell>
                        <TableCell align="center">Booking Date/Time</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {bookings.map((booking: any) => (
                        <TableRow
                            key={booking.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell align="center">{booking.name}</TableCell>
                            <TableCell align="center">{booking.email}</TableCell>
                            <TableCell align="center">{booking.address}</TableCell>
                            <TableCell align="center">{booking.type}</TableCell>
                            <TableCell align="center">{booking.date} at {booking.time}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default Booking;