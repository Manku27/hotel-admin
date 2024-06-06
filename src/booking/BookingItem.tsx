import { Booking } from './bookingTypes';
import { Button, Card, Grid, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { lazy, useState } from 'react';
import LazyComponentWrapper from '../routing/LazyComponentWrapper';

const AddServiceForm = lazy(() => import('./AddServiceForm'));

const guestColumns = [
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

const billColumns = [
  {
    field: 'name',
    headerName: 'Service',
    flex: 1,
  },
  {
    field: 'cost',
    headerName: 'Cost',
    flex: 1,
  },
];

interface Props {
  item: Booking;
  listAPI: string;
}

export const BookingItem = ({ item, listAPI }: Props) => {
  const [addService, setAddService] = useState(false);

  const billItems = [
    { id: 'booking', name: 'Booking Amount', cost: item.bookingPrice },
    ...item.additionalServices,
    { id: 'total', name: 'Total Cost', cost: item.totalPrice },
  ];
  return (
    <Grid item xs={6}>
      <Card sx={{ m: 2, p: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={9}>
            <Typography
              variant="h5"
              sx={{ textAlign: 'left' }}
            >{`From : ${item.checkInDate},  To : ${item.checkOutDate}`}</Typography>
            <Typography
              variant="h5"
              sx={{ textAlign: 'left' }}
            >{`Room : ${item.roomNo}`}</Typography>
          </Grid>
          <Grid item xs={3}>
            <Button
              variant="contained"
              onClick={() => setAddService(!addService)}
              sx={{ mt: 1 }}
            >
              <Typography variant="body2">Add Services</Typography>
            </Button>
          </Grid>
        </Grid>

        {addService ? (
          <LazyComponentWrapper>
            <AddServiceForm
              bookingId={item.id}
              listAPI={listAPI}
              successCallback={() => setAddService(false)}
            />
          </LazyComponentWrapper>
        ) : null}

        <Typography variant="h5" sx={{ mt: 1 }}>
          Guests
        </Typography>
        <DataGrid
          rows={item.guests}
          columns={guestColumns}
          getRowId={(row) => row.name}
          hideFooter
          disableColumnFilter
          disableColumnMenu
          disableColumnSorting
        />

        <Typography variant="h5" sx={{ mt: 2 }}>
          Bill
        </Typography>
        <DataGrid
          rows={billItems}
          columns={billColumns}
          hideFooter
          disableColumnFilter
          disableColumnMenu
          disableColumnSorting
        />
      </Card>
    </Grid>
  );
};
