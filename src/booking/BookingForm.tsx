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
import { BookingPayload, RoomBooking } from './bookingTypes';
import { SyntheticEvent, useState } from 'react';
import dayjs from 'dayjs';
import FormikDatePicker from '../common/FormikDatePicker';
import { GuestForm } from '../guests/guestsType';
import { useParams } from 'react-router-dom';
import useSWR from 'swr';
import { getFetcher, sendBookingRequest } from '../services/fetcher';
import { Room } from '../rooms/roomTypes';
import { RoomType, RoomTypeLabel } from '../rooms/roomConstants';

const validationSchema = yup.object().shape({
  roomNo: yup.string().required('Room number is required'),
  checkInDate: yup.string().required('Check in date is required'),
  checkOutDate: yup.string().required('Check out date is required'),
  finalPrice: yup.string().required('Final price is required'),
});

const today = dayjs();

const initialValues: RoomBooking = {
  guestList: [],
  roomNo: '',
  checkInDate: today,
  checkOutDate: today.add(1, 'day'),
  finalPrice: '',
  id: '',
  type: '',
};

const BookingForm = () => {
  const { hotelId } = useParams();

  const [checkIn, setCheckIn] = useState(today);
  const [checkOut, setCheckOut] = useState(today.add(1, 'day'));

  const { data: roomList } = useSWR(
    hotelId
      ? `${import.meta.env.VITE_API}/rooms/available?startDate=${checkIn.format('DD-MM-YYYY')}&endDate=${checkOut.format('DD-MM-YYYY')}&hotelIds=${hotelId}`
      : null,
    getFetcher
  );

  const availableRoomsList: Room[] = roomList || [];

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
    const payload = {
      guests: guestList.map((guest) => {
        return {
          name: guest.firstName + ' ' + guest.lastName,
          age: guest.age,
          mobileNo: guest.mobileNo,
          gender: guest.gender,
        };
      }),
      booking: {
        checkInDate: values.checkInDate.toISOString(),
        checkOutDate: values.checkOutDate.toISOString(),
        bookedRooms: [
          {
            roomNumber: values.roomNo,
            id: values.id,
          },
        ],
        roomPrice: {
          [values.id]: values.finalPrice,
        },
      },
    };

    const jsonData = JSON.stringify(payload);

    const formData = new FormData();
    formData.append(
      'bookingWithGuestsDTO',
      new Blob([jsonData], { type: 'application/json' })
    );

    guestList.forEach((guest) => {
      formData.append('govtId', guest.govtId);
      formData.append('picture', guest.picture);
    });

    sendBookingRequest(`${import.meta.env.VITE_API}/bookings`, formData);
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
        <FormHelperText sx={{ textAlign: 'center' }}>
          Add at-least one guest
        </FormHelperText>
      ) : null}
      <Card sx={{ m: 2, p: 2 }}>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          validateOnBlur={false}
        >
          {({ errors, touched, setFieldValue, values }) => {
            const handleCheckInDate = (value) => {
              setCheckIn(value);
              if (value.isAfter(checkOut)) {
                const nextday = value.add(1, 'day');
                setCheckOut(nextday);
                setFieldValue('checkOutDate', nextday);
              }
            };

            const handleCheckOutDate = (value) => {
              setCheckOut(value);
            };
            return (
              <Form>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={3}>
                    <FormikDatePicker
                      name="checkInDate"
                      label="Check In Date"
                      sideEffect={handleCheckInDate}
                      minDate={today}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <FormikDatePicker
                      name="checkOutDate"
                      label="Check Out Date"
                      sideEffect={handleCheckOutDate}
                      minDate={checkIn.add(1, 'day')}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <Autocomplete
                      id="roomNo"
                      options={availableRoomsList}
                      getOptionLabel={(option) => `${option?.roomNumber}`}
                      style={{ width: 300 }}
                      onChange={(e, value) => {
                        setFieldValue('roomNo', value?.roomNumber || '');
                        setFieldValue('id', value?.id || '');
                        setFieldValue('finalPrice', value?.pricePerNight || '');
                        setFieldValue(
                          'type',
                          value
                            ? value.type === RoomType.OTHER
                              ? value.customType
                              : value.type
                            : ''
                        );
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
                  <Grid item xs={3}>
                    <TextField
                      margin="normal"
                      label="Type"
                      name="type"
                      value={RoomTypeLabel[values?.type || '']}
                      InputLabelProps={{
                        shrink: true, // For google autofill
                      }}
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
