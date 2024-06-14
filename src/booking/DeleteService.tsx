import { Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteRequest } from '../services/fetcher';
import { mutate } from 'swr';

type Props = {
  id: 'total' | 'booking' | number;
  listAPI: string;
};

export const DeleteService = ({ id, listAPI }: Props) => {
  const handleClick = () => {
    const url = `${import.meta.env.VITE_API}/services/${id}`;
    deleteRequest(url, () => {
      mutate(listAPI);
    });
  };
  const notService = id === 'booking' || id === 'total';
  return notService ? null : (
    <Button onClick={handleClick}>
      <DeleteIcon sx={{ m: 1, color: 'red' }} />
    </Button>
  );
};
