import { Button } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import { getAndDisplayFiles } from '../services/fetcher';

type Props = {
  values: any;
  type: 'Gov' | 'Photo';
};

export const PhotoDownload = ({ values, type }: Props) => {
  const handleClick = () => {
    const fileType = type === 'Gov' ? 'govtId' : 'picture';
    const guestId = values?.row?.guestId;
    const url = `${import.meta.env.VITE_API}/file/download/${fileType}/${guestId}`;
    getAndDisplayFiles(url);
  };
  return (
    <Button onClick={handleClick}>
      <DownloadIcon sx={{ m: 1 }} />
    </Button>
  );
};
