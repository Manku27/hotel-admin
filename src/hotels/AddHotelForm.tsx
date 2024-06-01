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
import { GST_REGEX } from './hotelConstants';
import useSWR, { useSWRConfig } from 'swr';
import { getFetcher, sendRequest } from '../services/fetcher';
import { employeesAsOptions } from '../common/employeesAsOptions';

const validationSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  address: yup.string().required('Address is required'),
  gstNumber: yup.string().matches(GST_REGEX, {
    message: 'GST number is not valid',
    excludeEmptyString: true,
  }),
});

const initialValues: AddHotel = {
  name: '',
  address: '',
  gstNumber: '',
  employeeIds: [],
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
        validateOnBlur={false}
      >
        {({ errors, setFieldValue, touched }) => {
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
                  <Field
                    as={TextField}
                    id="address"
                    name="address"
                    label="Hotel Address"
                    fullWidth
                    error={!!errors.address}
                    helperText={
                      errors.address && <ErrorMessage name="address" />
                    }
                    sx={{ marginBottom: '1rem' }}
                    required
                  />{' '}
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
                  />{' '}
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
