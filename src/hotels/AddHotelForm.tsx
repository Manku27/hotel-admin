import {
  Autocomplete,
  Button,
  Card,
  Chip,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { AddHotel } from './hotelTypes';
import { GST_REGEX, STATES, ZIP_REGEX } from './hotelConstants';
import useSWR, { useSWRConfig } from 'swr';
import { getFetcher, sendRequest } from '../services/fetcher';
import { employeesAsOptions } from '../common/employeesAsOptions';
import ChipInput from '../common/ChipInput';
import { PHONE_REGEX } from '../guests/guestsType';

const validationSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  address: yup.object().shape({
    street: yup.string().required('Street is required'),
    city: yup.string().required('City is required'),
    state: yup
      .string()
      .oneOf(STATES, 'Invalid state')
      .required('State is required'),
    zipCode: yup
      .string()
      .matches(ZIP_REGEX, 'Invalid Zip code')
      .required('Zip Code is required'),
    country: yup.string().required('Country is required'),
  }),
  gstNumber: yup.string().required('GST is required').matches(GST_REGEX, {
    message: 'GST number is not valid',
    excludeEmptyString: true,
  }),
  phoneNumbers: yup
    .array()
    .of(
      yup.string().matches(PHONE_REGEX, {
        message: 'Phone no. is not valid',
        excludeEmptyString: true,
      })
    )
    .min(1, 'At least one phone number is required'),
});

const initialValues: AddHotel = {
  name: '',
  address: { city: '', country: 'India', state: '', street: '', zipCode: '' },
  gstNumber: '',
  employeeIds: [],
  phoneNumbers: [],
};

interface Props {
  successCallback: () => void;
}

const AddHotelForm = ({ successCallback }: Props) => {
  const { mutate } = useSWRConfig();

  const handleSubmit = (values) => {
    sendRequest(`${import.meta.env.VITE_API}/hotels`, values, () => {
      mutate(`${import.meta.env.VITE_API}/hotels`);
      successCallback();
    });
  };

  const { data: userList, isLoading: isLoadingUser } = useSWR(
    `${import.meta.env.VITE_API}/users`,
    getFetcher,
    {
      revalidateOnFocus: false,
    }
  );

  const USERS = employeesAsOptions(userList) || [];

  return (
    <Card sx={{ m: 2, p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Add Hotel
      </Typography>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, setFieldValue, touched, values }) => {
          return (
            <Form>
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <Field
                    as={TextField}
                    id="name"
                    name="name"
                    label="Hotel Name"
                    fullWidth
                    error={!!errors.name}
                    helperText={errors.name && <ErrorMessage name="name" />}
                    sx={{ marginBottom: '1rem' }}
                    required
                  />
                </Grid>
                <Grid item xs={4}>
                  <ChipInput name="phoneNumbers" label="Phone Numbers" />
                </Grid>
                <Grid item xs={4}>
                  <Field
                    as={TextField}
                    id="gstNumber"
                    name="gstNumber"
                    label="GST Number"
                    fullWidth
                    error={!!errors.gstNumber}
                    helperText={
                      errors.gstNumber && <ErrorMessage name="gstNumber" />
                    }
                    sx={{ marginBottom: '1rem' }}
                    required
                  />
                </Grid>
                <Grid item xs={3}>
                  <Field
                    as={TextField}
                    name="address.street"
                    label="Street"
                    fullWidth
                    error={!!errors.address?.street}
                    helperText={
                      errors.address?.street && (
                        <ErrorMessage name="address.street" />
                      )
                    }
                    sx={{ marginBottom: '1rem' }}
                    required
                  />
                </Grid>
                <Grid item xs={3}>
                  <Field
                    as={TextField}
                    name="address.city"
                    label="City"
                    fullWidth
                    error={!!errors.address?.city}
                    helperText={
                      errors.address?.city && (
                        <ErrorMessage name="address.city" />
                      )
                    }
                    sx={{ marginBottom: '1rem' }}
                    required
                  />
                </Grid>
                <Grid item xs={3}>
                  <Autocomplete
                    id="state"
                    options={STATES}
                    fullWidth
                    onChange={(e, value) => {
                      setFieldValue(
                        'address.state',
                        value !== null ? value : ''
                      );
                    }}
                    renderInput={(params) => (
                      <TextField
                        label="States"
                        error={!!errors.address?.state}
                        helperText={
                          errors.address?.state && (
                            <ErrorMessage name="address.state" />
                          )
                        }
                        {...params}
                        required
                      />
                    )}
                    sx={{ marginBottom: '1rem' }}
                  />
                </Grid>
                <Grid item xs={3}>
                  <Field
                    as={TextField}
                    name="address.zipCode"
                    label="ZIP Code"
                    fullWidth
                    error={!!errors.address?.zipCode}
                    helperText={
                      errors.address?.zipCode && (
                        <ErrorMessage name="address.zipCode" />
                      )
                    }
                    sx={{ marginBottom: '1rem' }}
                    required
                  />
                </Grid>
                <Grid item xs={9}>
                  <Autocomplete
                    clearIcon={false}
                    options={USERS}
                    multiple
                    loading={isLoadingUser}
                    renderTags={(value: Option[], props) =>
                      value.map((option, index) => (
                        <Chip
                          label={option?.label || ''}
                          {...props({ index })}
                          key={index}
                        />
                      ))
                    }
                    onChange={(e, value) => {
                      setFieldValue(
                        'employeeIds',
                        value !== null ? value.map((item) => item.id) : ''
                      );
                    }}
                    sx={{ marginBottom: '1rem' }}
                    renderInput={(params) => (
                      <TextField
                        label="Employees"
                        {...params}
                        error={!!errors.employeeIds && !!touched.employeeIds}
                        helperText={
                          errors.employeeIds && (
                            <ErrorMessage name="employeeIds" />
                          )
                        }
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={3}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    formNoValidate
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
  );
};

export default AddHotelForm;
