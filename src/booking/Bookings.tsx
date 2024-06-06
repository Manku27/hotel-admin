import { Container, Grid, Typography } from '@mui/material';
import useSWR from 'swr';
import { getFetcher } from '../services/fetcher';
import { useParams } from 'react-router-dom';
import dayjs, { Dayjs } from 'dayjs';
import { useState } from 'react';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import BookingList from './BookingList';
import { ScriptLoadingFallback } from '../routing/ScriptLoadingFallback';
import { PageCenter } from '../common/PageCenter';

const today = dayjs();

const Bookings = () => {
  const { hotelId } = useParams();

  const [checkIn, setCheckIn] = useState<Dayjs | null>(
    today.subtract(3, 'days')
  );
  const [checkOut, setCheckOut] = useState<Dayjs | null>(today.add(1, 'day'));

  const API = `${import.meta.env.VITE_API}/bookings/hotel/${hotelId}/startDate/${checkIn?.format('YYYY-MM-DD')}/endDate/${checkOut?.format('YYYY-MM-DD')}`;

  const { data, isLoading } = useSWR(API, getFetcher, {
    revalidateOnFocus: false,
  });

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
      <Typography variant="h2">Bookings</Typography>

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Grid container spacing={2}>
          <Grid
            item
            xs={2}
            sx={{ display: 'flex', justifyContent: 'flex-start', ml: 2 }}
          >
            <DatePicker
              value={checkIn}
              onChange={(value) => {
                setCheckIn(value);
              }}
              label="Check In"
            />
          </Grid>
          <Grid
            item
            xs={2}
            sx={{ display: 'flex', justifyContent: 'flex-start' }}
          >
            <DatePicker
              value={checkOut}
              onChange={(value) => {
                setCheckOut(value);
              }}
              label="Check Out"
            />
          </Grid>
        </Grid>
      </LocalizationProvider>

      {isLoading ? (
        <ScriptLoadingFallback />
      ) : data?.length > 0 ? (
        <BookingList list={data} listAPI={API} />
      ) : (
        <PageCenter>
          <Typography variant="h3" sx={{ fontStyle: 'italic' }}>
            Your bookings appear here
          </Typography>
        </PageCenter>
      )}
    </Container>
  );
};

export default Bookings;
