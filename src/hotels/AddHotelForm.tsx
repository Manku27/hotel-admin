import {
  Autocomplete,
  Button,
  Chip,
  Container,
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
import { toast } from 'react-toastify';

const validationSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  address: yup.string().required('Address is required'),
  gstNumber: yup
    .string()
    .required('GST number is required')
    .matches(GST_REGEX, {
      message: 'GST number is not valid',
      excludeEmptyString: true,
    }),
  employeeIds: yup
    .array()
    .of(yup.string().required('String is required'))
    .min(1, 'Array must contain at least one item')
    .max(5, 'Array exceeds maximum length'),
});

const initialValues: AddHotel = {
  name: '',
  address: '',
  gstNumber: '',
  employeeIds: [],
};

const getUserList = (userList) => {
  return userList?.map((user) => {
    return {
      id: user.id,
      label: `${user.firstName} ${user.lastName}`,
    };
  });
};

const AddHotelForm = () => {
  const { mutate } = useSWRConfig();

  const handleSubmit = (values) => {
    sendRequest(`${import.meta.env.VITE_API}/hotels`, values, () =>
      mutate(`${import.meta.env.VITE_API}/hotels`)
    );
  };

  const { data: userList, isLoading: isLoadingUser } = useSWR(
    `${import.meta.env.VITE_API}/users`,
    getFetcher,
    {
      revalidateOnFocus: false,
    }
  );

  const USERS = getUserList(userList) || [];

  return (
    <Container maxWidth={false} sx={{ padding: '6rem' }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            validateOnBlur={false}
          >
            {({ errors, setFieldValue, touched }) => {
              return (
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
                    required
                  />
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
                  />
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
                  />
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
                      console.log(value);
                      setFieldValue(
                        'employeeIds',
                        value !== null ? value.map((item) => item.id) : ''
                      );
                    }}
                    sx={{ marginBottom: '1rem' }}
                    renderInput={(params) => (
                      <TextField
                        label="Employees (Hit enter after every entry)"
                        {...params}
                        error={!!errors.employeeIds && !!touched.employeeIds}
                        helperText={
                          errors.employeeIds && (
                            <ErrorMessage name="employeeIds" />
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
              );
            }}
          </Formik>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AddHotelForm;
