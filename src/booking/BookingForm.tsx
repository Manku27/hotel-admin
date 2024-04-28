import {
  Autocomplete,
  Box,
  Button,
  Card,
  FormHelperText,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import AddGuestsForm from '../guests/AddGuestsForm';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as yup from 'yup';
import { RoomBooking } from './bookingTypes';
import { SyntheticEvent, useState } from 'react';
import dayjs from 'dayjs';
import FormikDatePicker from '../common/FormikDatePicker';
import { GuestForm } from '../guests/guestsType';
import { useParams } from 'react-router-dom';
import useSWR from 'swr';
import { getFetcher } from '../services/fetcher';
import { isEmptyObject } from '../services/checks';
import { Room } from '../rooms/roomTypes';

const validationSchema = yup.object().shape({
  roomNo: yup.string().required('Room number is required'),
  checkInDate: yup.string().required('Check in date is required'),
  checkOutDate: yup.string().required('Check out date is required'),
  finalPrice: yup.string().required('Final price is required'),
});

const initialValues: RoomBooking = {
  guestList: [],
  roomNo: '',
  checkInDate: dayjs(),
  checkOutDate: dayjs(),
  finalPrice: '',
};

const BookingForm = () => {
  const { hotelId } = useParams();

  const { data: roomList } = useSWR(
    hotelId ? `${import.meta.env.VITE_API}/rooms/hotel/${hotelId}` : null,
    getFetcher
  );

  const availableRoomsList: Room[] =
    roomList?.filter((room) => isEmptyObject(room.bookingMap)) || [];

  const [guestList, setGuestList] = useState<GuestForm[]>([]);

  const handleAddGuest = (newGuest: GuestForm) => {
    const currentGuestList = [...guestList, newGuest];
    setGuestList(currentGuestList);
  };

  const handleRemoveGuest = (guestIndex: number) => {
    const currentGuestList = [...guestList];
    if (guestIndex >= 0 && guestIndex < currentGuestList.length) {
      currentGuestList.splice(guestIndex, 1);
    } else {
      console.error('Index out of bounds');
    }
    setGuestList(currentGuestList);
  };

  const handleSubmit = (values: RoomBooking) => {
    const preparedValues = {
      ...values,
      guestList: guestList,
      checkInDate: values.checkInDate.toISOString(),
      checkOutDate: values.checkOutDate.toISOString(),
    };
    console.log('booking form', preparedValues);
  };

  return (
    <Box
      sx={{
        backgroundColor: '#e0e0e0',
        display: 'flex',
        flexDirection: 'column',
        minHeight: '85%',
      }}
    >
      <Typography variant="h3" sx={{ m: 1 }}>
        Booking
      </Typography>
      <AddGuestsForm
        guestList={guestList}
        handleAddGuest={handleAddGuest}
        handleRemoveGuest={handleRemoveGuest}
      />
      {guestList.length === 0 ? (
        <FormHelperText>Add at-least one guest</FormHelperText>
      ) : null}
      <Card sx={{ m: 2, p: 2 }}>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          validateOnBlur={false}
        >
          {({ errors, touched, setFieldValue, values }) => {
            return (
              <Form>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={4}>
                    <Autocomplete
                      id="roomNo"
                      options={availableRoomsList}
                      getOptionLabel={(option) => `${option?.roomNumber}`}
                      style={{ width: 300 }}
                      onChange={(e, value) => {
                        setFieldValue('roomNo', value?.roomNumber || '');
                        setFieldValue('finalPrice', value?.pricePerNight || '');
                      }}
                      renderInput={(params) => (
                        <TextField
                          margin="normal"
                          label="Room Numbers"
                          name="roomNo"
                          error={!!errors.roomNo}
                          helperText={
                            errors.roomNo && <ErrorMessage name="roomNo" />
                          }
                          {...params}
                          required
                        />
                      )}
                      sx={{ marginBottom: 1 }}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <FormikDatePicker
                      name="checkInDate"
                      label="Check In Date"
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <FormikDatePicker
                      name="checkOutDate"
                      label="Check Out Date"
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <Field
                      as={TextField}
                      name="finalPrice"
                      label="Final Price/Night"
                      fullWidth
                      error={!!errors.finalPrice && touched.finalPrice}
                      helperText={
                        errors.finalPrice && <ErrorMessage name="finalPrice" />
                      }
                      sx={{ marginBottom: '1rem' }}
                      required
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">₹</InputAdornment>
                        ),
                      }}
                      type="number"
                      onWheel={(e: SyntheticEvent) =>
                        (e.target as HTMLElement).blur()
                      }
                    />
                  </Grid>
                  <Grid item xs={4}></Grid>
                  <Grid item xs={4}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      fullWidth
                      formNoValidate
                      disabled={guestList.length === 0}
                    >
                      Submit
                    </Button>
                  </Grid>
                </Grid>
              </Form>
            );
          }}
        </Formik>
      </Card>
    </Box>
  );
};

export default BookingForm;
