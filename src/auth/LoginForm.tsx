import { ErrorMessage, Field, Form, Formik } from 'formik';
import { Login } from './authTypes';
import * as yup from 'yup';
import { EMAIL_REGEX } from './authConstants';
import { Avatar, Box, Button, Card, CardActions, CardContent, Stack, TextField, Typography } from '@mui/material';
import PasswordField from './PasswordField';
import { toast } from 'react-toastify';
import { setAuth } from '../services/auth-service';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { WidthFull } from '@mui/icons-material';

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
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      validateOnBlur={false}
    >
      {({ errors }) => {
        return (
          <>

            <Stack sx={{ backgroundColor: '#FAF9F6', height: '100vh'}}>

              <Form>
                <Card variant='outlined' sx={{ boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', width: "40%", height: "80%", align: 'center', justifyContent: 'center', marginLeft: "30%", marginTop: '10%' }}>
                  
                  <CardContent>
                    <img src="../src/assets/bell.gif" alt="GIF" style={{ width: '10vh', height: 'auto' }} />
                  </CardContent>
                  
                  <CardContent>

                    <Box
                      // display="flex"
                      justifyContent="center"
                      alignItems="center">

                      {/* <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                      </Avatar> */}

                      <Typography component="h6" variant="h6" sx={{paddingBottom:"2px"}}>
                        Hotel Management Login System 
                      </Typography>

                      <Typography sx={{ fontSize: 13,paddingBottom:"30px"}} color="text.secondary">
                        Connect with us by Logging In. Imagine a place where you can be yourself.
                      </Typography>
    
                    </Box>

                    <Typography sx={{ fontSize: 15, paddingBottom: '1px'}}>
                    Email
                    </Typography>


                    <Field
                      as={TextField}
                      id="email"
                      name="email"
                      placeholder="E-mail"
                      fullWidth
                      error={!!errors.email}
                      helperText={errors.email && <ErrorMessage name="email" />}
                      sx={{ marginBottom: '1rem' }}
                      type="email"
                      required
                    />


                    <Typography sx={{ fontSize: 15, paddingBottom: '1px'}}>
                      Password
                    </Typography>

                    <Field sx={{paddingBottom: '10px'}}
                      as={TextField}
                      margin="normal"
                      fullWidth
                      name="password"
                      placeholder="Password"
                      type="password"
                      id="password"
                      autoComplete="current-password"
                      error={errors.password} 
                      helperText={errors.password && <ErrorMessage name="password" />}
                      required
                    />

                    </CardContent>
                    <CardActions sx={{paddingBottom: '20px', paddingLeft: '30px'}}>

                    <Button variant='contained' size="medium" sx={{textTransform: "none", width: '95%'}}
                      type="submit"
                      color="primary"
                      formNoValidate
                    >
                      Submit
                    </Button>
      
                    </CardActions>

                  



                  <Typography sx={{ fontSize: 11, display:'flex', justifyContent: "center", alignItems: 'center'}} color="text.secondary">
                        By clickng "Submit" you can connect with us.
                  </Typography>

                  <Typography sx={{ fontSize: 11, display:'flex', justifyContent: "center", alignItems: 'center', paddingBottom: '7%'}} color="text.secondary" gutterBottom>
                        This action signifies you accept our Terms and Condition outlined.
                  </Typography>


                </Card>

              </Form>  
            
            </Stack>

          </>
          // <Form>
          //   <Field
          //     as={TextField}
          //     id="email"
          //     name="email"
          //     label="E-mail"
          //     fullWidth
          //     error={!!errors.email}
          //     helperText={errors.email && <ErrorMessage name="email" />}
          //     sx={{ marginBottom: '1rem' }}
          //     type="email"
          //     required
          //   />
          //   <PasswordField error={errors.password} />
          //   <Button
          //     type="submit"
          //     variant="contained"
          //     color="primary"
          //     fullWidth
          //     formNoValidate
          //   >
          //     Submit
          //   </Button>
          // </Form>
        );
      }}
    </Formik>
  );
};

export default LoginForm;