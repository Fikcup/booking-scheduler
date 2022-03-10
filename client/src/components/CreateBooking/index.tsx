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
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [type, setType] = React.useState('');
    const [date, setDate] = React.useState(null);
    const [time, setTime] = React.useState<Date | null>(new Date());

    const handleChange = (event: SelectChangeEvent) => {
        setType(event.target.value);
    };

    return (
        <div>
            <Button variant="contained" className="create-btn" onClick={handleOpen}>Create booking</Button>
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
                        <TextField id="outlined-basic" label="Name" variant="outlined" />
                        <TextField id="outlined-basic" label="Email" variant="outlined" />
                        <TextField id="outlined-basic" label="Street Address" variant="outlined" />
                        <TextField id="outlined-basic" label="City" variant="outlined" />
                        <TextField id="outlined-basic" label="State" variant="outlined" />
                        <TextField id="outlined-basic" label="Zip code" variant="outlined" />
                        <FormControl sx={{ minWidth: 225 }}>
                            <InputLabel id="demo-simple-select-helper-label">Booking type</InputLabel>
                            <Select
                                labelId="demo-simple-select-helper-label"
                                id="demo-simple-select-helper"
                                value={type}
                                label="Booking type"
                                onChange={handleChange}
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
                                label="Basic example"
                                value={time}
                                onChange={(newTime) => {
                                    setTime(newTime);
                                }}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </LocalizationProvider>
                    </form>
                </Box>
            </StyledModal>
        </div>
    );
}

export default CreateBooking;