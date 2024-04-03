import {
  Box,
  Button,
  FormHelperText,
  InputAdornment,
  TextField,
} from '@mui/material';
import AddGuestsForm from '../guests/AddGuestsForm';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as yup from 'yup';
import { RoomBooking } from './bookingTypes';
import { SyntheticEvent, useState } from 'react';
import dayjs from 'dayjs';
import FormikDatePicker from '../common/FormikDatePicker';
import { GuestForm } from '../guests/guestsType';

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
  const [guestList, setGuestList] = useState<GuestForm[]>([]);

  const handleAddGuest = (newGuest: GuestForm) => {
    const currentGuestList = [...guestList, newGuest];
    setGuestList(currentGuestList);
  };

  const handleSubmit = (values: RoomBooking) => {
    // change date formats to toISOString()
    const preparedValues = {
      ...values,
      guestList: guestList,
      checkInDate: values.checkInDate.toISOString(),
      checkOutDate: values.checkOutDate.toISOString(),
    };
    console.log('booking form', preparedValues);
  };

  return (
    <Box>
      <AddGuestsForm guestList={guestList} handleAddGuest={handleAddGuest} />
      {guestList.length === 0 ? (
        <FormHelperText>Add at-least one guest</FormHelperText>
      ) : null}
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        validateOnBlur={false}
      >
        {({ errors, touched }) => {
          return (
            <Form>
              <Field
                as={TextField}
                id="roomNo"
                name="roomNo"
                label="Room No"
                fullWidth
                error={!!errors.roomNo}
                helperText={errors.roomNo && <ErrorMessage name="roomNo" />}
                sx={{ marginBottom: '1rem' }}
                required
              />
              <FormikDatePicker name="checkInDate" label="Check In Date" />
              <FormikDatePicker name="checkOutDate" label="Check Out Date" />
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
            </Form>
          );
        }}
      </Formik>
    </Box>
  );
};

export default BookingForm;
