import { Box, Grid } from '@mui/material';
import { Booking } from './bookingTypes';
import { BookingItem } from './BookingItem';

interface Props {
  list: Booking[];
  listAPI: string;
}

const BookingList = ({ list, listAPI }: Props) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Grid container spacing={2}>
        {list.map((item) => {
          return <BookingItem item={item} listAPI={listAPI} key={item.id} />;
        })}
      </Grid>
    </Box>
  );
};

export default BookingList;
