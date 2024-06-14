import {
  Autocomplete,
  Button,
  Card,
  Chip,
  Grid,
  InputAdornment,
  TextField,
} from '@mui/material';
import { Formik, Form, ErrorMessage, Field } from 'formik';
import * as yup from 'yup';
import { AddRoom } from './roomTypes';
import { ROOM_TYPE_LIST, RoomType, roomTypeValues } from './roomConstants';
import { SyntheticEvent } from 'react';
import { sendRequest } from '../services/fetcher';
import { mutate } from 'swr';
import ChipInput from '../common/ChipInput';

const validationSchema = yup.object().shape({
  roomNumbers: yup
    .array()
    .of(
      yup.string().required('String is required').min(2, 'String is too short')
    )
    .min(1, 'Array must contain at least one item')
    .max(5, 'Array exceeds maximum length'),
  pricePerNight: yup.number().required('A default price is required'),
  type: yup
    .string()
    .oneOf(roomTypeValues, 'Invalid room type')
    .required('Room type is required'),
  customType: yup.string().when('type', {
    is: RoomType.OTHER,
    then: (schema) => schema.required('Custom type is required for OTHER'), // customType is required
    otherwise: (schema) => schema.notRequired(),
  }),
});

const initialValues: any = {
  roomNumbers: [],
  pricePerNight: '',
  type: '',
  customType: '',
};

interface Props {
  hotelId: number;
  successCallback: () => void;
}

const AddRoomForm = ({ hotelId, successCallback }: Props) => {
  const handleSubmit = (values: AddRoom) => {
    const payload = values.roomNumbers.map((room) => {
      return {
        roomNumber: room,
        type: values.type,
        customType: values.customType,
        pricePerNight: values.pricePerNight,
      };
    });
    sendRequest(`${import.meta.env.VITE_API}/rooms/${hotelId}`, payload, () => {
      mutate(`${import.meta.env.VITE_API}/hotels`);
      successCallback();
    });
  };

  return (
    <Card
      sx={{ mt: 2, p: 2, flex: 1, boxShadow: '0px 0px 10px rgba(0,0,0,0.2)' }}
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        validateOnBlur={false}
      >
        {({ setFieldValue, errors, values, touched }) => (
          <Form>
            <Autocomplete
              id="type"
              options={ROOM_TYPE_LIST}
              getOptionLabel={(option) => option.label}
              style={{ width: 300 }}
              onChange={(e, value) => {
                setFieldValue('type', value !== null ? value.id : '');
              }}
              renderInput={(params) => (
                <TextField
                  margin="normal"
                  label="Room Type"
                  name="type"
                  error={!!errors.type && !!touched.type}
                  helperText={
                    errors.type && touched.type && <ErrorMessage name="type" />
                  }
                  {...params}
                  required
                />
              )}
              sx={{ marginBottom: '1rem' }}
            />
            {values.type === RoomType.OTHER ? (
              <Field
                as={TextField}
                name="customType"
                label="Custom Type"
                fullWidth
                error={!!errors.customType && !!touched.customType}
                helperText={
                  errors.customType &&
                  touched.customType && <ErrorMessage name="customType" />
                }
                sx={{ marginBottom: '1rem' }}
                required
              />
            ) : null}
            <Field
              as={TextField}
              name="pricePerNight"
              label="Default Price/Night"
              fullWidth
              error={!!errors.pricePerNight && !!touched.pricePerNight}
              helperText={
                errors.pricePerNight &&
                touched.pricePerNight && <ErrorMessage name="pricePerNight" />
              }
              sx={{ marginBottom: '1rem' }}
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">₹</InputAdornment>
                ),
              }}
              type="number"
              onWheel={(e: SyntheticEvent) => (e.target as HTMLElement).blur()}
            />
            <ChipInput name="roomNumbers" label="Room Numbers" />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              formNoValidate
            >
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </Card>
  );
};

export default AddRoomForm;
