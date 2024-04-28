import {
  Button,
  Card,
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
import { GuestForm, PHONE_REGEX } from './guestsType';
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

interface Props {
  initialValues: GuestForm;
  submitCallback: (data: GuestForm) => void;
}

const AddSingleGuestForm = ({ initialValues, submitCallback }: Props) => {
  const handleSubmit = (values: GuestForm, { resetForm }) => {
    submitCallback(values);
    resetForm();
  };

  return (
    <Card sx={{ m: 2, p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Add Guest
      </Typography>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        validateOnBlur={false}
      >
        {({ errors, setValues, handleChange, values, isSubmitting }) => {
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
                </Grid>
                <Grid item xs={4}>
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
                </Grid>
                <Grid item xs={4}>
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
                </Grid>
                <Grid item xs={4}></Grid>
                <Grid item xs={5} sx={{ textAlign: 'left' }}>
                  <FileUploadButton
                    title="Id upload"
                    name="govIDFilePath"
                    error={errors.govIDFilePath}
                    setValues={setValues}
                    fileNameField="govIDFileName"
                    isSubmitting={isSubmitting}
                  />
                </Grid>
                <Grid item xs={5} sx={{ textAlign: 'left' }}>
                  <FileUploadButton
                    title="Photo upload"
                    name="pictureFilePath"
                    error={errors.pictureFilePath}
                    setValues={setValues}
                    fileNameField="pictureFileName"
                    isSubmitting={isSubmitting}
                  />
                </Grid>
                <Grid item xs={2}>
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

export default AddSingleGuestForm;
