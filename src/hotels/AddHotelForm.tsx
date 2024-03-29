import {
  Button,
  Container,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material';
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';

interface Tier {
  value: string;
  label: string;
}

const tiers: Tier[] = [
  { value: '1', label: 'Tier 1' },
  { value: '2', label: 'Tier 2' },
  { value: '3', label: 'Tier 3' },
  { value: '4', label: 'Tier 4' },
];

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  location: Yup.string().required('Location is required'),
  tier: Yup.string().required('Tier is required'),
  id: Yup.string().required('ID is required'),
});

interface FormValues {
  name: string;
  location: string;
  tier: string;
  id: string;
}

const initialValues: FormValues = {
  name: '',
  location: '',
  tier: '',
  id: '',
};

export const AddHotelForm = () => {
  const handleSubmit = (
    values: FormValues,
    { resetForm }: FormikHelpers<FormValues>
  ) => {
    // Handle form submission
    console.log('Submitted values:', values);
    resetForm();
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
            {({ errors, touched }) => (
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
                  error={errors.name && touched.name}
                  helperText={errors.name && <ErrorMessage name="name" />}
                  sx={{ marginBottom: '1rem' }}
                />
                <Field
                  as={TextField}
                  id="location"
                  name="location"
                  label="Hotel Location"
                  fullWidth
                  error={errors.location && touched.location}
                  helperText={
                    errors.location && <ErrorMessage name="location" />
                  }
                  sx={{ marginBottom: '1rem' }}
                />
                <Field
                  as={TextField}
                  id="tier"
                  name="tier"
                  select
                  label="Hotel Tier"
                  fullWidth
                  error={errors.tier && touched.tier}
                  helperText={errors.tier && <ErrorMessage name="tier" />}
                  sx={{ marginBottom: '1rem' }}
                >
                  {tiers.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Field>
                <Field
                  as={TextField}
                  id="id"
                  name="id"
                  label="Hotel ID"
                  fullWidth
                  error={errors.id && touched.id}
                  helperText={errors.id && <ErrorMessage name="id" />}
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
