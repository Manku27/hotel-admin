import { Button, Container, Grid, Typography } from '@mui/material';
import { lazy, useState } from 'react';
import HotelList from './HotelList';
import LazyComponentWrapper from '../routing/LazyComponentWrapper';

const AddHotelForm = lazy(() => import('./AddHotelForm'));

const Hotels = () => {
  const [addHotel, setAddHotel] = useState(false);
  return (
    <Container
      maxWidth={false}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '85%',
        backgroundColor: '#e0e0e0',
      }}
    >
      <Grid container spacing={1} sx={{ m: 1 }} alignItems="center">
        <Grid item xs={10} sx={{ textAlign: 'left' }}>
          <Typography variant="h3">Hotels</Typography>
        </Grid>
        <Grid item xs={2}>
          <Button
            onClick={() => setAddHotel(!addHotel)}
            variant="contained"
            color="primary"
          >
            Add Hotel
          </Button>
        </Grid>
      </Grid>
      {addHotel ? (
        <LazyComponentWrapper>
          <AddHotelForm successCallback={() => setAddHotel(false)} />
        </LazyComponentWrapper>
      ) : null}
      <HotelList />
    </Container>
  );
};

export default Hotels;
