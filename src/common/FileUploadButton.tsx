import { Box, Button, FormHelperText, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { ErrorMessage } from 'formik';

interface Props {
  title: string;
  name: string;
  setValues: (...data: any) => void;
  error: any;
  fileNameField: string;
  isSubmitting: boolean;
}

export const FileUploadButton = ({
  title,
  error,
  name,
  fileNameField,
  setValues,
  isSubmitting,
}: Props) => {
  const [file, setFile] = useState<File | null>(null);

  const uploadFile = async (newFile) => {
    // const formData = new FormData();
    // formData.append('file', newFile);

    // try {
    //   setUploadUrl()
    // } catch (error) {

    // }

    setValues((prev) => {
      return {
        ...prev,
        [name]: `thisisfilepathfor-${name}`,
        [fileNameField]: newFile?.name,
      };
    });
  };

  const handleFileChange = (e) => {
    const newFile = e.target.files ? e.target.files[0] : null;
    setFile(newFile);
    if (newFile) {
      uploadFile(newFile);
    }
  };

  useEffect(() => {
    if (isSubmitting) {
      setFile(null);
    }
  }, [isSubmitting]);

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
