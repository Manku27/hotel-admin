import useSWR from 'swr';
import { getFetcher } from '../services/fetcher';
import { Card, Container, Grid } from '@mui/material';
import { Hotel } from './hotelTypes';
import { Room } from '../rooms/roomTypes';

const HotelList = () => {
  const { data, isLoading } = useSWR(
    `${import.meta.env.VITE_API}/hotels`,
    getFetcher,
    {
      revalidateOnFocus: false,
    }
  );

  if (isLoading) {
    return <>Setting things up</>;
  }

  const hotels: Hotel[] = data || [];

  return (
    <Container
      maxWidth={false}
      sx={{ height: '50vh', backgroundColor: '#e0e0e0' }}
    >
      <Grid container spacing={2}>
        {hotels.map((hotel) => (
          <Grid item xs={6} key={hotel.id}>
            <Card sx={{ m: 2, p: 2, flex: 1 }}>
              <h4> {hotel.name}</h4>
              <h5> {hotel.address}</h5>
              <Grid container spacing={2}>
                {hotel.rooms.map((room: Room) => (
                  <Grid item xs={4} key={room.id}>
                    <Card sx={{ m: 0.5, p: 0.5, flex: 1 }}>
                      <h5> {room.roomNumber}</h5>
                      <h6> {room.type}</h6>
                      <h6>₹{room.pricePerNight}</h6>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default HotelList;
