import { ErrorMessage, Field } from 'formik';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers';
import { FormHelperText } from '@mui/material';

const FormikDatePicker = ({ name, sideEffect, ...otherProps }: any) => {
  return (
    <Field name={name}>
      {({ field, form: { setFieldValue, errors } }) => (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            value={field.value ? field.value : null}
            onChange={(value) => {
              setFieldValue(field.name, value ? value : '');
              sideEffect(value);
            }}
            {...otherProps}
          />
          {errors ? (
            <FormHelperText>
              <ErrorMessage name={field.name} />
            </FormHelperText>
          ) : null}
        </LocalizationProvider>
      )}
    </Field>
  );
};

export default FormikDatePicker;
