import { ErrorMessage, Field, Form, Formik } from 'formik';
import { Login } from './authTypes';
import * as yup from 'yup';
import { EMAIL_REGEX } from './authConstants';
import { Button, TextField, Typography } from '@mui/material';
import PasswordField from './PasswordField';

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

const LoginForm = () => {
  const handleSubmit = (values: Login) => {
    console.log('Login form:', values);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      validateOnBlur={false}
    >
      {({ errors, values }) => {
        console.log(errors, values);
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
