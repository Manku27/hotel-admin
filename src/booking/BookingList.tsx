import { Box, Card, Grid, Typography } from '@mui/material';
import { Booking } from './bookingTypes';
import { DataGrid } from '@mui/x-data-grid';

interface Props {
  list: Booking[];
}

const columns = [
  {
    field: 'name',
    headerName: 'Name',
    flex: 1,
  },
  {
    field: 'mobileNo',
    headerName: 'Phone',
    flex: 1,
  },
];

const BookingList = ({ list }: Props) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Grid container spacing={2}>
        {list.map((item) => (
          <Grid item xs={6} key={item.id}>
            <Card sx={{ m: 2, p: 2 }}>
              <Typography variant="h5">{`From : ${item.checkInDate} - To : ${item.checkOutDate}`}</Typography>
              <Typography variant="h5">{`Room : ${item.roomNo ?? '001'}`}</Typography>
              <DataGrid
                rows={item.guests}
                columns={columns}
                getRowId={(row) => row.name}
                hideFooter
                disableColumnFilter
                disableColumnMenu
                disableColumnSorting
              />
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default BookingList;
