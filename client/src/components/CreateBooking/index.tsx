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
    FormControl,
    Paper,
    Grid,
    FormHelperText
} from '@mui/material';
import { Formik, FormikProps, Form } from 'formik';
import * as yup from 'yup';
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
    width: 750,
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

    const validationSchema = yup.object({
        name: yup
            .string()
            .min(2, 'Name should be at least 2 characters')
            .required('Name is required'),
        email: yup
            .string()
            .email('Enter a valid email')
            .min(5, 'Email should be at least 5 characters')
            .required('Email is required'),
        street: yup
            .string()
            .min(5, 'Address should be at least 5 characters')
            .required('Address is required'),
        city: yup
            .string()
            .min(2, 'City should be at least 2 characters')
            .required('City is required'),
        state: yup
            .string()
            .min(2, 'State code should be 2 characters')
            .max(2, 'State code should be 2 characters')
            .required('State is required'),
        zip: yup
            .string()
            .min(5, 'Zip code should be 5 characters')
            .max(5, 'Zip code should be 5 characters')
            .required('Zip code is required'),
        type: yup
            .string()
            .required('Please select a booking type'),
        date: yup
            .date()
            .required('Please select a date'),
        time: yup
            .date()
            .required('Please select a time')
    });

    interface FormValues {
        name: string;
        email: string;
        street: string;
        city: string;
        state: string;
        zip: string;
        type: string;
        date: Date | null;
        time: Date | null;
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
                <Paper>
                    <Box sx={style}>
                        <h2 id="unstyled-modal-title">Create booking</h2>
                        <Formik
                                initialValues = {{
                                    name: '',
                                    email: '',
                                    street: '',
                                    city: '',
                                    state: '',
                                    zip: '',
                                    type: '',
                                    date: null,
                                    time: null
                                }}
                                validationSchema = {validationSchema}
                                onSubmit = {async ( values: FormValues) => {
                                    const formData = {
                                        name: values.name,
                                        email: values.email,
                                        street: values.street,
                                        city: values.city,
                                        state: values.state,
                                        zip: values.zip,
                                        type: values.type,
                                        date: values.date!.toISOString().slice(0, 9),
                                        time: values.time!.toISOString().slice(11, 19)
                                    }
                                    await axios.post(`/api/bookings`, formData)
                                        .then((data) => {
                                            if (data.data.message === 'Cannot contain duplicate entries') {
                                                alert('This appointment slot is already booked.');
                                            } else {
                                                handleClose();
                                                window.location.reload();
                                            }
                                        })
                                        .catch(err => console.error(err));
                                    
                                }}
                        >
                            {(formikProps: FormikProps<FormValues>) => (
                                <Form onSubmit={formikProps.handleSubmit}>
                                    <Grid container spacing={4} justify-content="space-between">
                                        <Grid item xs={6}>
                                            <TextField 
                                                id="outlined-basic" 
                                                label="Name" 
                                                variant="outlined" 
                                                value={formikProps.values.name} 
                                                onChange={formikProps.handleChange('name')}
                                                sx={{ minWidth: 300 }}
                                                helperText={
                                                    formikProps.errors.name &&
                                                    formikProps.touched.name &&
                                                    String(formikProps.errors.name)
                                                }
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <FormControl required sx={{ minWidth: 300 }} >
                                                <InputLabel id="demo-simple-select-helper-label">Booking type</InputLabel>
                                                <Select
                                                    labelId="demo-simple-select-helper-label"
                                                    id="demo-simple-select-helper"
                                                    value={formikProps.values.type}
                                                    label="Booking type"
                                                    onChange={(e) => {
                                                        formikProps.setFieldValue('type', e.target.value);
                                                    }}
                                                >
                                                    <MenuItem value={'housekeeping'}>Housekeeping</MenuItem>
                                                    <MenuItem value={'dog walk'}>Dog Walk</MenuItem>
                                                </Select>
                                                {formikProps.errors.type &&
                                                    formikProps.touched.name &&
                                                    String(formikProps.errors.type) ? <FormHelperText>{formikProps.errors.type}</FormHelperText> : <></>
                                                }
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <TextField 
                                                id="outlined-basic" 
                                                label="Email" 
                                                variant="outlined" 
                                                value={formikProps.values.email} 
                                                onChange={formikProps.handleChange('email')} 
                                                sx={{ minWidth: 300 }}
                                                helperText={
                                                    formikProps.errors.email &&
                                                    formikProps.touched.email &&
                                                    String(formikProps.errors.email)
                                                }
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <LocalizationProvider dateAdapter={AdapterDateFns} >
                                                <DatePicker
                                                    label="Booking Date"
                                                    value={formikProps.values.date}
                                                    onChange={(newValue) => {
                                                        formikProps.setFieldValue('date', newValue);
                                                    }}
                                                    renderInput={(params) => <TextField {...params} sx={{ minWidth: 300 }} onChange={(e) => {
                                                        formikProps.handleChange('date');
                                                    }}/>}
                                                />
                                            </LocalizationProvider>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <TextField 
                                                id="outlined-basic" 
                                                label="Street Address" 
                                                variant="outlined" 
                                                value={formikProps.values.street} 
                                                onChange={formikProps.handleChange('street')} 
                                                sx={{ minWidth: 300 }} 
                                                helperText={
                                                    formikProps.errors.street &&
                                                    formikProps.touched.street &&
                                                    String(formikProps.errors.street)
                                                }
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <LocalizationProvider dateAdapter={AdapterDateFns} >
                                                <TimePicker
                                                    label="Booking Time"
                                                    value={formikProps.values.time}
                                                    onChange={(newValue) => {
                                                        formikProps.setFieldValue('time', newValue);
                                                    }}
                                                    renderInput={(params) => <TextField {...params} sx={{ minWidth: 300 }} />}
                                                />
                                            </LocalizationProvider>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField 
                                                id="outlined-basic" 
                                                label="City" 
                                                variant="outlined"
                                                value={formikProps.values.city} 
                                                onChange={formikProps.handleChange('city')}
                                                sx={{ minWidth: 300 }}
                                                helperText={
                                                    formikProps.errors.city &&
                                                    formikProps.touched.city &&
                                                    String(formikProps.errors.city)
                                                }
                                            />
                                        </Grid>
                                        <Grid item xs={2.55}>
                                            <TextField 
                                                id="outlined-basic" 
                                                label="State" 
                                                variant="outlined" 
                                                value={formikProps.values.state} 
                                                onChange={formikProps.handleChange('state')}
                                                sx={{ minWidth: 100 }}
                                                helperText={
                                                    formikProps.errors.state &&
                                                    formikProps.touched.state &&
                                                    String(formikProps.errors.state)
                                                }
                                            />
                                        </Grid>
                                        <Grid item xs={2.55}>
                                            <TextField 
                                                id="outlined-basic" 
                                                label="Zip code" 
                                                variant="outlined" 
                                                value={formikProps.values.zip} 
                                                onChange={formikProps.handleChange('zip')}
                                                sx={{ minWidth: 100 }}
                                                helperText={
                                                    formikProps.errors.zip &&
                                                    formikProps.touched.zip &&
                                                    String(formikProps.errors.zip)
                                                }
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Button 
                                                type="submit" 
                                                variant="contained" className="create-btn" 
                                                disabled={formikProps.isSubmitting}
                                            >
                                                Create booking
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </Form> 
                            )} 
                        </Formik>
                    </Box>
                </Paper>
            </StyledModal>
        </div>
    );
}

export default CreateBooking;