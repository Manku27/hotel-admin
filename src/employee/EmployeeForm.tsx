import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as yup from 'yup';
import { Button, Card, Grid, TextField } from '@mui/material';
import { toast } from 'react-toastify';
import { setAuth } from '../services/auth-service';
import { PageCenter } from '../common/PageCenter';
import { EMAIL_REGEX } from '../auth/authConstants';
import { AddEmployee } from './userTypes';
import PasswordField from '../auth/PasswordField';
import { mutate } from 'swr';

const initialValues: AddEmployee = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
};

const validationSchema = yup.object().shape({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  email: yup.string().required('Email is required').matches(EMAIL_REGEX, {
    message: 'Email is not valid',
    excludeEmptyString: true,
  }),
  password: yup.string().required('Password is required'),
});

async function sendRequest(url, arg) {
  const id = toast.loading('Please wait...');
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(arg),
    });
    toast.update(id, {
      render: 'Employee created!',
      type: 'success',
      isLoading: false,
      autoClose: 800,
    });

    mutate(`${import.meta.env.VITE_API}/users`);

    const resp = await response.json();
    setAuth(resp);
    window.location.reload();
  } catch (error) {
    toast.update(id, {
      render: `Failed.`,
      type: 'error',
      isLoading: false,
      autoClose: 800,
    });
  }
}

const EmployeeForm = () => {
  const handleSubmit = (values: AddEmployee) => {
    sendRequest(`${import.meta.env.VITE_API}/users`, values);
  };

  return (
    <PageCenter>
      <Card sx={{ m: 2, p: 2 }}>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          validateOnBlur={false}
        >
          {({ errors }) => {
            return (
              <Form>
                <Grid container spacing={2}>
                  <Grid item xs={4}>
                    <Field
                      as={TextField}
                      id="firstName"
                      name="firstName"
                      label="First Name"
                      fullWidth
                      error={!!errors.firstName}
                      helperText={
                        errors.firstName && <ErrorMessage name="firstName" />
                      }
                      sx={{ marginBottom: '1rem' }}
                      required
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <Field
                      as={TextField}
                      id="lastName"
                      name="lastName"
                      label="Last Name"
                      fullWidth
                      error={!!errors.lastName}
                      helperText={
                        errors.lastName && <ErrorMessage name="lastName" />
                      }
                      sx={{ marginBottom: '1rem' }}
                      required
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <Field
                      as={TextField}
                      id="email"
                      name="email"
                      label="E-mail"
                      fullWidth
                      error={!!errors.email}
                      helperText={errors.email && <ErrorMessage name="email" />}
                      sx={{ marginBottom: '1rem' }}
                      type="email"
                      required
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <PasswordField error={errors.password} />
                  </Grid>
                  <Grid item xs={4}></Grid>

                  <Grid item xs={4} display="flex" alignItems="center">
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
    </PageCenter>
  );
};

export default EmployeeForm;
