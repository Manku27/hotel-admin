import { Box, Button, FormHelperText, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { ErrorMessage } from 'formik';

interface Props {
  title: string;
  name: string;
  setValues: (...data: any) => void;
  error: any;
  isSubmitting: boolean;
}

export const FileUploadButton = ({
  title,
  error,
  name,
  setValues,
  isSubmitting,
}: Props) => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e) => {
    const newFile = e.target.files ? e.target.files[0] : null;
    setFile(newFile);
    if (newFile) {
      setValues((prev) => {
        return {
          ...prev,
          [name]: newFile,
        };
      });
    }
  };

  useEffect(() => {
    if (isSubmitting) {
      setFile(null);
    }
  }, [isSubmitting]);

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <Button
        component="label"
        role={undefined}
        variant="contained"
        tabIndex={-1}
        startIcon={<CloudUploadIcon />}
      >
        {title}
        <input type="file" hidden onChange={handleFileChange} />
      </Button>
      {file ? <Typography>{file.name}</Typography> : null}
      {error ? (
        <FormHelperText>
          <ErrorMessage name={name} />
        </FormHelperText>
      ) : null}
    </Box>
  );
};
