import { Button, Container, Grid, TextField, Typography } from '@mui/material';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { Hotel } from './hotelTypes';
import { GST_REGEX } from './hotelConstants';

const validationSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  address: yup.string().required('Address is required'),
  gstNumber: yup.string().matches(GST_REGEX, {
    message: 'GST number is not valid',
    excludeEmptyString: true,
  }),
});

const initialValues: Hotel = {
  name: '',
  address: '',
  gstNumber: '',
};

const AddHotelForm = () => {
  const handleSubmit = (values: Hotel) => {
    console.log('Hotel form:', values);
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
                  Add Hotel
                </Typography>
                <Field
                  as={TextField}
                  id="name"
                  name="name"
                  label="Hotel Name"
                  fullWidth
                  error={!!errors.name}
                  helperText={errors.name && <ErrorMessage name="name" />}
                  sx={{ marginBottom: '1rem' }}
                />
                <Field
                  as={TextField}
                  id="address"
                  name="address"
                  label="Hotel Address"
                  fullWidth
                  error={!!errors.address}
                  helperText={errors.address && <ErrorMessage name="address" />}
                  sx={{ marginBottom: '1rem' }}
                />
                <Field
                  as={TextField}
                  id="gstNumber"
                  name="gstNumber"
                  label="GST Number (Optional)"
                  fullWidth
                  error={!!errors.gstNumber}
                  helperText={
                    errors.gstNumber && <ErrorMessage name="gstNumber" />
                  }
                  sx={{ marginBottom: '1rem' }}
                />
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

export default AddHotelForm;
