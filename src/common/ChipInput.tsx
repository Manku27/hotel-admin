import { useState } from 'react';
import { Field } from 'formik';
import { TextField, Chip, InputAdornment, FormHelperText } from '@mui/material';

interface Props {
  name: string;
  label: string;
}

const ChipInput = ({ name, label }: Props) => {
  const [chipData, setChipData] = useState<string[]>([]);
  const [value, setValue] = useState('');

  const handleKeyDown = (event, form) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      const values = [...chipData, event.target.value];
      setChipData(values);
      form.setFieldValue(name, values);
      setValue('');
      event.target.value = '';
    }
  };

  return (
    <Field name={name}>
      {({ field, form }) => {
        return (
          <>
            <TextField
              {...field}
              value={value}
              onChange={(event) => setValue(event.target.value)}
              onKeyDown={(event) => handleKeyDown(event, form)}
              label={label}
              InputProps={{
                startAdornment: chipData.map((data, index) => (
                  <InputAdornment position="start" key={index}>
                    <Chip
                      label={data}
                      onDelete={() => {
                        const newChipData = [...chipData];
                        newChipData.splice(index, 1);
                        setChipData(newChipData);
                        form.setFieldValue(name, newChipData);
                      }}
                    />
                  </InputAdornment>
                )),
              }}
              helperText={
                form.errors[name] && form.touched[name] ? form.errors[name] : ''
              }
              fullWidth
              error={!!form.errors[name] && !!form.touched[name]}
            />

            <FormHelperText>Hit Enter after every number</FormHelperText>
          </>
        );
      }}
    </Field>
  );
};

export default ChipInput;
