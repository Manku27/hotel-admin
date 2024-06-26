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
        <input
          type="file"
          name={name}
          hidden
          onChange={handleFileChange}
          onClick={(event) => ((event.target as any).value = '')}
        />
      </Button>
      {file ? <Typography>{file.name}</Typography> : null}
      {error ? (
        <Typography
          variant="subtitle2"
          sx={{ color: 'red', fontWeight: 'normal' }}
        >
          <ErrorMessage name={name} />
        </Typography>
      ) : null}
    </Box>
  );
};
