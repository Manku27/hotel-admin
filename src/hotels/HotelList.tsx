import useSWR from 'swr';
import { getFetcher } from '../services/fetcher';
import { Grid } from '@mui/material';
import { Hotel } from './hotelTypes';
import { HotelItem } from './HotelItem';
import { ScriptLoadingFallback } from '../routing/ScriptLoadingFallback';

const HotelList = () => {
  const { data, isLoading } = useSWR(
    `${import.meta.env.VITE_API}/hotels`,
    getFetcher,
    {
      revalidateOnFocus: false,
    }
  );

  if (isLoading) {
    return <ScriptLoadingFallback />;
  }
  return (
    <>
      <Grid container spacing={2}>
        {data.map((hotel: Hotel) => (
          <HotelItem key={hotel.id} hotel={hotel} />
        ))}
      </Grid>
    </>
  );
};

export default HotelList;
