import useSWR from 'swr';
import { getFetcher } from '../services/fetcher';
import { Container, Grid } from '@mui/material';
import { Hotel } from './hotelTypes';
import { HotelItem } from './HotelItem';

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
      sx={{ maxHeight: '50vh', backgroundColor: '#e0e0e0' }}
    >
      <Grid container spacing={2}>
        {hotels.map((hotel) => (
          <HotelItem key={hotel.id} hotel={hotel} />
        ))}
      </Grid>
    </Container>
  );
};

export default HotelList;
