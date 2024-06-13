import { ErrorMessage, Field, Form, Formik } from 'formik';
import { Login } from './authTypes';
import * as yup from 'yup';
import { EMAIL_REGEX } from './authConstants';
import { Button, Card, Grid, TextField, Typography } from '@mui/material';
import PasswordField from './PasswordField';
import { toast } from 'react-toastify';
import { setAuth } from '../services/auth-service';
import { PageCenter } from '../common/PageCenter';

const initialValues: Login = {
  email: '',
  password: '',
};

const validationSchema = yup.object().shape({
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
      render: 'Login successful!',
      type: 'success',
      isLoading: false,
      autoClose: 800,
    });

    const resp = await response.json();
    setAuth(resp);
    window.location.reload();
  } catch (error) {
    toast.update(id, {
      render: `Login failed.`,
      type: 'error',
      isLoading: false,
      autoClose: 800,
    });
  }
}

const LoginForm = () => {
  const handleSubmit = (values: Login) => {
    sendRequest(`${import.meta.env.VITE_API}/auth/login`, values);
  };

  return (
    <PageCenter>
      <Card sx={{ m: 2, p: 2, maxWidth: '30vw' }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography
              variant="h6"
              gutterBottom
              align="center"
              sx={{ marginBottom: '1rem' }}
            >
              Hotel Admin
            </Typography>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ errors, touched }) => {
                return (
                  <Form>
                    <Field
                      as={TextField}
                      id="email"
                      name="email"
                      label="E-mail"
                      fullWidth
                      error={!!errors.email && !!touched.email}
                      helperText={
                        touched.email &&
                        errors.email && <ErrorMessage name="email" />
                      }
                      sx={{ marginBottom: '1rem' }}
                      type="email"
                      InputLabelProps={{
                        shrink: true, // For google autofill
                      }}
                      required
                    />
                    <PasswordField error={errors.password} />
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
      </Card>
    </PageCenter>
  );
};

export default LoginForm;
