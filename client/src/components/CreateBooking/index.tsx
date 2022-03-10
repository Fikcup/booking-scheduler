import React from 'react';
import { styled, Box } from '@mui/system';
import { LocalizationProvider, DatePicker } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import TimePicker from '@mui/lab/TimePicker';
import ModalUnstyled from '@mui/base/ModalUnstyled';
import {
    Button,
    TextField,
    InputLabel,
    Select,
    MenuItem,
    SelectChangeEvent,
    FormControl
} from '@mui/material';
import axios from 'axios';

const StyledModal = styled(ModalUnstyled)`
  position: fixed;
  z-index: 1300;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Backdrop = styled('div')`
  z-index: -1;
  position: fixed;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  -webkit-tap-highlight-color: transparent;
`;

const style = {
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    p: 2,
    px: 4,
    pb: 3,
};

const CreateBooking = () => {
    // TODO: add form field validation

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [street, setStreet] = React.useState('');
    const [city, setCity] = React.useState('');
    const [state, setState] = React.useState('');
    const [zip, setZip] = React.useState('');
    const [type, setType] = React.useState('');
    const [date, setDate] = React.useState<Date | null>(new Date());
    const [time, setTime] = React.useState<Date | null>(new Date());

    const handleTypeChange = (e: SelectChangeEvent) => {
        setType(e.target.value);
    };

    const handleNameChange = (e: any) => {
        setName(e.target.value);
    };

    const handleEmailChange = (e: any) => {
        setEmail(e.target.value);
    };

    const handleStreetChange = (e: any) => {
        setStreet(e.target.value);
    };

    const handleCityChange = (e: any) => {
        setCity(e.target.value);
    };

    const handleStateChange = (e: any) => {
        setState(e.target.value);
    };

    const handleZipChange = (e: any) => {
        setZip(e.target.value);
    };

    const handleSubmit = () => {
        const formData = {
            name,
            email,
            street,
            city,
            state,
            zip,
            type,
            date: date!.toISOString().slice(0, 9),
            time: time!.toISOString().slice(11, 19)
        }

        axios.post('http://localhost:3001/api/bookings', formData)
            .then(data => {
                console.log(data.data);
            })
            .catch(err => console.error(err));
    }

    return (
        <div>
            <Button variant="contained" className="create-btn" onClick={handleOpen} style={{float: 'right', marginTop: '2rem'}}>Create booking</Button>
            <StyledModal
                aria-labelledby="unstyled-modal-title"
                aria-describedby="unstyled-modal-description"
                open={open}
                onClose={handleClose}
                BackdropComponent={Backdrop}
            >
                <Box sx={style}>
                    <h2 id="unstyled-modal-title">Create booking</h2>
                    <form>
                        <TextField id="outlined-basic" label="Name" variant="outlined" value={name} onChange={handleNameChange}/>
                        <TextField id="outlined-basic" label="Email" variant="outlined" value={email} onChange={handleEmailChange}/>
                        <TextField id="outlined-basic" label="Street Address" variant="outlined" value={street} onChange={handleStreetChange}/>
                        <TextField id="outlined-basic" label="City" variant="outlined" value={city} onChange={handleCityChange}/>
                        <TextField id="outlined-basic" label="State" variant="outlined" value={state} onChange={handleStateChange}/>
                        <TextField id="outlined-basic" label="Zip code" variant="outlined" value={zip} onChange={handleZipChange}/>
                        <FormControl sx={{ minWidth: 225 }}>
                            <InputLabel id="demo-simple-select-helper-label">Booking type</InputLabel>
                            <Select
                                labelId="demo-simple-select-helper-label"
                                id="demo-simple-select-helper"
                                value={type}
                                label="Booking type"
                                onChange={handleTypeChange}
                            >
                                <MenuItem value={'housekeeping'}>Housekeeping</MenuItem>
                                <MenuItem value={'dog walk'}>Dog Walk</MenuItem>
                            </Select>
                        </FormControl>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                label="Booking Date"
                                value={date}
                                onChange={(date) => {
                                    setDate(date);
                                }}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </LocalizationProvider>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <TimePicker
                                label="Booking Time"
                                value={time}
                                onChange={(newTime) => {
                                    setTime(newTime);
                                }}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </LocalizationProvider>
                        <Button variant="contained" className="create-btn" onClick={handleSubmit}>Create booking</Button>
                    </form>
                </Box>
            </StyledModal>
        </div>
    );
}

export default CreateBooking;