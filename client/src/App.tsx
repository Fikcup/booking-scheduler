import React from 'react';
import { Button } from '@mui/material';

import Booking from './components/Booking';
import CreateBooking from './components/CreateBooking';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="heading">
        <h1>Bookings</h1>
        <CreateBooking />
      </div>
      <Booking />
    </div>
  );
}

export default App;
