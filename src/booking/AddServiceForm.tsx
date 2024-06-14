import { Button, Card, TextField, Typography } from '@mui/material';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as yup from 'yup';
import { sendRequest } from '../services/fetcher';
import { mutate } from 'swr';

const validationSchema = yup.object().shape({
  name: yup.string().required('Name of service is required'),
  cost: yup.number().required('Cost is required'),
});

const initialValues = {
  name: '',
  cost: '',
};

interface Props {
  bookingId: number;
  successCallback: () => void;
  listAPI: string;
}

const AddServiceForm = ({ listAPI, bookingId, successCallback }: Props) => {
  const handleSubmit = (values) => {
    sendRequest(
      `${import.meta.env.VITE_API}/services/${bookingId}`,
      values,
      () => {
        mutate(listAPI);
        successCallback();
      }
    );
  };
  return (
    <Card
      sx={{ mt: 2, p: 2, flex: 1, boxShadow: '0px 0px 10px rgba(0,0,0,0.2)' }}
    >
      <Typography variant="h6">Add Services</Typography>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        validateOnBlur={false}
      >
        {({ errors, touched }) => (
          <Form>
            <Field
              as={TextField}
              name="name"
              label="Service name"
              fullWidth
              error={!!errors.name && !!touched.name}
              helperText={
                errors.name && touched.name && <ErrorMessage name="name" />
              }
              sx={{ marginBottom: '1rem' }}
              required
            />
            <Field
              as={TextField}
              type="number"
              name="cost"
              label="Cost"
              fullWidth
              error={!!errors.cost && !!touched.cost}
              helperText={
                errors.cost && touched.cost && <ErrorMessage name="cost" />
              }
              sx={{ marginBottom: '1rem' }}
              required
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
    </Card>
  );
};

export default AddServiceForm;
