import {
  Button,
  Container,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Grid,
  InputAdornment,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from '@mui/material';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { GENDER_LIST } from './guestConstants';
import { Guest, PHONE_REGEX } from './guestsType';
import { SyntheticEvent } from 'react';
import { FileUploadButton } from '../common/FileUploadButton';

const validationSchema = yup.object().shape({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  age: yup.number().required('Age is required'),
  gender: yup
    .string()
    .oneOf(GENDER_LIST, 'Invalid gender')
    .required('Gender is required'),
  govIDFilePath: yup.string().required('Government Id is required'),
  pictureFilePath: yup.string().required('Picture is required'),
  mobileNo: yup.string().matches(PHONE_REGEX, {
    message: 'Mobile no. is not valid',
    excludeEmptyString: true,
  }),
});

const initialValues: Guest = {
  firstName: '',
  lastName: '',
  gender: 'Female',
  age: 20,
  mobileNo: '',
  govIDFilePath: '',
  pictureFilePath: '',
};

const AddGuestsForm = () => {
  const handleSubmit = (values: Guest) => {
    console.log('Hotel form:', values);
  };

  return (
    <Container maxWidth="sm" sx={{ padding: '6rem' }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            validateOnBlur={false}
          >
            {({ errors, setFieldValue, handleChange, values }) => {
              return (
                <Form>
                  <Typography variant="h6" gutterBottom>
                    Add Guest
                  </Typography>
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
                  <FormControl error={!!errors.gender}>
                    <FormLabel id="demo-row-radio-buttons-group-label">
                      Gender
                    </FormLabel>
                    <Field
                      as={RadioGroup}
                      row
                      name="gender"
                      value={values.gender}
                      onChange={handleChange}
                    >
                      <FormControlLabel
                        value="Female"
                        control={<Radio />}
                        label="Female"
                      />
                      <FormControlLabel
                        value="Male"
                        control={<Radio />}
                        label="Male"
                      />
                      <FormControlLabel
                        value="Others"
                        control={<Radio />}
                        label="Others"
                      />
                    </Field>
                    <FormHelperText>
                      {errors.gender && <ErrorMessage name="gender" />}
                    </FormHelperText>
                  </FormControl>
                  <Field
                    as={TextField}
                    id="age"
                    name="age"
                    label="Age"
                    fullWidth
                    error={!!errors.age}
                    helperText={errors.age && <ErrorMessage name="age" />}
                    sx={{ marginBottom: '1rem' }}
                    type="number"
                    required
                    onWheel={(e: SyntheticEvent) =>
                      (e.target as HTMLElement).blur()
                    }
                  />
                  <Field
                    as={TextField}
                    name="mobileNo"
                    label="Mobile No"
                    fullWidth
                    error={!!errors.mobileNo}
                    helperText={
                      errors.mobileNo && <ErrorMessage name="mobileNo" />
                    }
                    sx={{ marginBottom: '1rem' }}
                    required
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">+91</InputAdornment>
                      ),
                    }}
                    type="number"
                    onWheel={(e: SyntheticEvent) =>
                      (e.target as HTMLElement).blur()
                    }
                  />
                  <FileUploadButton
                    title="Id upload"
                    name="govIDFilePath"
                    error={errors.govIDFilePath}
                    setFieldValue={setFieldValue}
                  />
                  <FileUploadButton
                    title="Photo upload"
                    name="pictureFilePath"
                    error={errors.pictureFilePath}
                    setFieldValue={setFieldValue}
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

export default AddGuestsForm;
