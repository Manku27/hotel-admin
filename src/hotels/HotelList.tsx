import useSWR from 'swr';
import { getFetcher } from '../services/fetcher';
import { Container, Grid } from '@mui/material';
import { Hotel } from './hotelTypes';
import { HotelItem } from './HotelItem';
import LazyComponentWrapper from '../routing/LazyComponentWrapper';

const HotelList = () => {
  const { data } = useSWR(`${import.meta.env.VITE_API}/hotels`, getFetcher, {
    revalidateOnFocus: false,
  });

  const hotels: Hotel[] = data || [];

  return (
    <Container maxWidth={false} sx={{ maxHeight: '50%' }}>
      <LazyComponentWrapper>
        <Grid container spacing={2}>
          {hotels.map((hotel) => (
            <HotelItem key={hotel.id} hotel={hotel} />
          ))}
        </Grid>
      </LazyComponentWrapper>
    </Container>
  );
};

export default HotelList;
