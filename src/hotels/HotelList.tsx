import useSWR from 'swr';
import { getFetcher } from '../services/fetcher';
import { Grid, Typography } from '@mui/material';
import { Hotel } from './hotelTypes';
import { HotelItem } from './HotelItem';
import { ScriptLoadingFallback } from '../routing/ScriptLoadingFallback';
import { PageCenter } from '../common/PageCenter';

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
        {data && data.length > 0 ? (
          data.map((hotel: Hotel) => <HotelItem key={hotel.id} hotel={hotel} />)
        ) : (
          <PageCenter>
            <Typography variant="h1" sx={{ fontStyle: 'italic' }}>
              Add hotels
            </Typography>
          </PageCenter>
        )}
      </Grid>
    </>
  );
};

export default HotelList;
