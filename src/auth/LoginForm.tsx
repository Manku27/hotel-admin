import { ErrorMessage, Field, Form, Formik } from 'formik';
import { Login } from './authTypes';
import * as yup from 'yup';
import { EMAIL_REGEX } from './authConstants';
import { Button, TextField, Typography } from '@mui/material';
import PasswordField from './PasswordField';
import useSWRMutation from 'swr/mutation';
import { toast } from 'react-toastify';
import { setAuth } from '../services/auth-service';

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

async function sendRequest(url, { arg }: { arg: any }) {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(arg),
    });
    toast.success('Login successful!');

    const resp = await response.json();
    setAuth(resp);
    window.location.reload();
  } catch (error) {
    toast.error(`Login failed.`);
  }
}

const LoginForm = () => {
  const { trigger, isMutating } = useSWRMutation(
    `${import.meta.env.VITE_API}/auth/login`,
    sendRequest
  );

  const handleSubmit = (values: Login) => {
    trigger(values);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      validateOnBlur={false}
    >
      {({ errors }) => {
        return (
          <Form>
            <Typography variant="h6" gutterBottom>
              Log In
            </Typography>
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
            <PasswordField error={errors.password} />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              formNoValidate
              disabled={isMutating}
            >
              Submit
            </Button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default LoginForm;
