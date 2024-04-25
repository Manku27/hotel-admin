import {
  Autocomplete,
  Button,
  Chip,
  Container,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import { Formik, Form, ErrorMessage, Field } from 'formik';
import * as yup from 'yup';
import { AddRoom } from './roomTypes';
import { ROOM_TYPE_LIST, RoomType, roomTypeValues } from './roomConstants';
import { SyntheticEvent } from 'react';
import { sendRequest } from '../services/fetcher';
import { useSWRConfig } from 'swr';

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
}

const AddRoomForm = ({ hotelId }: Props) => {
  const { mutate } = useSWRConfig();

  const handleSubmit = (values: AddRoom) => {
    const payload = values.roomNumbers.map((room) => {
      return {
        roomNumber: room,
        type: values.type,
        customType: values.customType,
        pricePerNight: values.pricePerNight,
      };
    });
    sendRequest(`${import.meta.env.VITE_API}/rooms/${hotelId}`, payload, () =>
      mutate(`${import.meta.env.VITE_API}/hotels`)
    );
  };

  return (
    <Container maxWidth={false} sx={{ padding: '2' }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            validateOnBlur={false}
          >
            {({ setFieldValue, errors, values, touched }) => (
              <Form>
                <Typography variant="h6" gutterBottom>
                  Add Rooms
                </Typography>
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
                      label="Room Types"
                      name="type"
                      error={!!errors.type}
                      helperText={errors.type && <ErrorMessage name="type" />}
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
                    error={!!errors.customType && touched.customType}
                    helperText={
                      errors.customType && <ErrorMessage name="customType" />
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
                  error={!!errors.pricePerNight && touched.pricePerNight}
                  helperText={
                    errors.pricePerNight && (
                      <ErrorMessage name="pricePerNight" />
                    )
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
                <Autocomplete
                  clearIcon={false}
                  options={[]}
                  freeSolo
                  multiple
                  renderTags={(value, props) =>
                    value.map((option, index) => (
                      <Chip label={option} {...props({ index })} key={index} />
                    ))
                  }
                  onChange={(e, value) => {
                    setFieldValue('roomNumbers', value !== null ? value : '');
                  }}
                  sx={{ marginBottom: '1rem' }}
                  renderInput={(params) => (
                    <TextField
                      label="Room Numbers (Hit enter after every entry)"
                      {...params}
                      error={!!errors.roomNumbers && touched.roomNumbers}
                      helperText={
                        errors.roomNumbers && (
                          <ErrorMessage name="roomNumbers" />
                        )
                      }
                      required
                    />
                  )}
                />
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
        </Grid>
      </Grid>
    </Container>
  );
};

export default AddRoomForm;
