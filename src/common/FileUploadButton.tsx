import { Box, Button, FormHelperText, Typography } from '@mui/material';
import { useState } from 'react';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { ErrorMessage } from 'formik';

interface Props {
  title: string;
  name: string;
  setFieldValue: (...data: any) => void;
  error: any;
}

export const FileUploadButton = ({
  title,
  error,
  name,
  setFieldValue,
}: Props) => {
  const [file, setFile] = useState<File | null>(null);

  const uploadFile = async () => {
    // const formData = new FormData();
    // formData.append('file', newFile);

    // try {
    //   setUploadUrl()
    // } catch (error) {

    // }

    setFieldValue(name, `thisisfilepathfor-${name}`);
  };

  const handleFileChange = (e) => {
    const newFile = e.target.files ? e.target.files[0] : null;
    setFile(newFile);
    if (newFile) {
      uploadFile();
    }
  };

  return (
    <Box sx={{ marginBottom: '1rem' }}>
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
