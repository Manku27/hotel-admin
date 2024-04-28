import { Button, Container } from '@mui/material';
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
        height: '100%',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        backgroundColor: '#e0e0e0',
      }}
    >
      <h1>Hotels</h1>
      <Button
        onClick={() => setAddHotel(!addHotel)}
        variant="contained"
        color="primary"
      >
        Add Hotel
      </Button>
      <HotelList />
      {addHotel ? (
        <LazyComponentWrapper>
          <AddHotelForm />
        </LazyComponentWrapper>
      ) : null}
    </Container>
  );
};

export default Hotels;
