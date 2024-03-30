import { Button, Container, Grid, TextField, Typography } from '@mui/material';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { AddRoom } from './roomTypes';
import { RoomType, roomTypeValues } from './roomConstants';

const validationSchema = yup.object().shape({
  roomNumbers: yup
    .array()
    .of(
      yup.string().required('String is required').min(2, 'String is too short')
    )
    .min(1, 'Array must contain at least one item')
    .max(5, 'Array exceeds maximum length'),
  defaultPricePerNight: yup.number().required('A default price is required'),
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
  defaultPricePerNight: null,
  type: '',
  customType: '',
};

const AddRoomForm = () => {
  const handleSubmit = (values: AddRoom) => {
    console.log('Room form:', values);
  };

  return (
    <Container maxWidth="sm" sx={{ padding: '6rem' }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ errors }) => (
              <Form>
                <Typography variant="h6" gutterBottom>
                  Add Rooms
                </Typography>

                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
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
