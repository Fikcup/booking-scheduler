import React from 'react';

import Booking from './components/Booking';
import CreateBooking from './components/CreateBooking';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="heading" style={{paddingLeft: '1.5rem', paddingRight: '1.5rem'}}>
        <h1 style={{float: 'left'}}>Bookings</h1>
        <CreateBooking />
      </div>
      <div style={{paddingLeft: '2rem', paddingRight: '2rem'}}>
        <Booking/>
      </div>
    </div>
  );
}

export default App;
