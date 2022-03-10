import React from 'react';
import { Button } from '@mui/material';

import Booking from './components/Booking';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="heading">
        <h1>Bookings</h1>
        <Button variant="contained" className="create-btn">Create booking</Button>
      </div>
      <Booking />
    </div>
  );
}

export default App;
