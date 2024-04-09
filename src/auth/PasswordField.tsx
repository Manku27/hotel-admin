import { useState } from 'react';
import { ErrorMessage, Field } from 'formik';
import {
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  FormHelperText,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const PasswordField = ({ error, ...props }: any) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Field name="password">
      {({ field }) => {
        return (
          <FormControl
            sx={{ m: 1, width: '25ch' }}
            variant="outlined"
            error={!!error}
          >
            <InputLabel>Password</InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? 'text' : 'password'}
              {...field}
              {...props}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
            {error && (
              <FormHelperText>
                <ErrorMessage name="password" />
              </FormHelperText>
            )}
          </FormControl>
        );
      }}
    </Field>
  );
};

export default PasswordField;
