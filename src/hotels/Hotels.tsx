import { Button, Container } from '@mui/material';
import { lazy, useState } from 'react';
import HotelList from './HotelList';

const AddHotelForm = lazy(() => import('./AddHotelForm'));

const Hotels = () => {
  const [addHotel, setAddHotel] = useState(false);
  return (
    <Container
      maxWidth={false}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        justifyContent: 'center',
        p: 10,
      }}
    >
      <h1>Hotels</h1>
      <Button onClick={() => setAddHotel(!addHotel)}>Add Hotel</Button>
      <HotelList />
      {addHotel ? <AddHotelForm /> : null}
    </Container>
  );
};

export default Hotels;
