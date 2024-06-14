import {
  Box,
  Button,
  Card,
  Container,
  Grid,
  Tooltip,
  Typography,
} from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import useSWR from 'swr';
import { getFetcher } from '../services/fetcher';
import dayjs from 'dayjs';
import {
  DataGrid,
  GridCellParams,
  GridColDef,
  GridColumnHeaderParams,
} from '@mui/x-data-grid';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import RedoIcon from '@mui/icons-material/Redo';
import { useState } from 'react';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosNewIcon from '@mui/icons-material/ArrowForwardIos';
import { Room } from '../rooms/roomTypes';
import { RevenueDisplay } from '../common/RevenueDisplay';

function getWeekDates(today) {
  const weekStart = today.startOf('week'); // Sunday

  const dates: any = [];
  for (let i = 0; i < 7; i++) {
    dates.push(weekStart.add(i, 'day').format('YYYY-MM-DD'));
  }
  return dates;
}

const days = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const getColumnsForThisWeek = (today) => {
  const datesofweek = getWeekDates(today);

  const columns: GridColDef[] = [
    {
      field: 'roomNumber',
      headerName: 'Room',
      flex: 1,
      align: 'center',
      headerAlign: 'center',
    },
    ...datesofweek.map((date, index) => {
      const isCurrMonth = today.month() + 1 === Number(date.split('-')[1]);

      return {
        field: date,
        flex: 1,
        key: date,
        align: 'center',
        headerAlign: 'center',

        renderHeader: ({ field }: GridColumnHeaderParams) => {
          return (
            <Box
              display="flex"
              flexDirection="column"
              sx={{ m: 1, height: '150%' }} // margin and height not working
            >
              <Typography sx={{ color: !isCurrMonth ? 'grey' : 'inherit' }}>
                {days[index]}
              </Typography>
              <Typography
                variant="h4"
                sx={{ color: !isCurrMonth ? 'grey' : 'inherit' }}
              >
                {field.split('-')[2]}
              </Typography>
            </Box>
          );
        },

        renderCell: ({ row, field }: GridCellParams) => {
          if (!isCurrMonth) {
            return <RedoIcon sx={{ m: 1, color: 'grey' }} />;
          }

          let isAvailableAtThisDay = true;
          if (row.unavailableDays.length > 0) {
            isAvailableAtThisDay = row.unavailableDays.indexOf(field) === -1;
          }

          return (
            <Tooltip title={`${row.roomNumber} for ${field.split('-')[2]}`}>
              {isAvailableAtThisDay ? (
                <CheckIcon sx={{ m: 1, color: 'green' }} />
              ) : (
                <ClearIcon sx={{ m: 1, color: 'red' }} />
              )}
            </Tooltip>
          );
        },
      };
    }),
  ];

  return columns;
};

const getRowClassName = (params) => {
  return params.indexRelativeToCurrentPage % 2 === 0 ? 'alternate-row' : '';
};

function Availability() {
  const { hotelId, hotelName } = useParams();

  const [selectedDate, setSelectedDate] = useState(dayjs());

  const month = selectedDate.month();

  const { data, isLoading } = useSWR(
    hotelId
      ? `${import.meta.env.VITE_API}/hotels/${hotelId}/availability?year=${selectedDate.year()}&month=${month + 1}`
      : null,
    getFetcher
  );

  const { data: revenue } = useSWR(
    hotelId
      ? `${import.meta.env.VITE_API}/revenue/monthly/${selectedDate.year()}/${month + 1}/${hotelId}`
      : null,
    getFetcher
  );

  const roomList: Room[] = data ?? [];

  const handlePrevWeek = () => {
    const newDate = selectedDate.subtract(7, 'day');
    if (newDate.month() < selectedDate.month()) {
      setSelectedDate(newDate.endOf('month'));
    } else {
      setSelectedDate(newDate);
    }
  };

  const handleNextWeek = () => {
    const newDate = selectedDate.add(7, 'day');
    if (newDate.month() > selectedDate.month()) {
      setSelectedDate(newDate.startOf('month'));
    } else {
      setSelectedDate(newDate);
    }
  };

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
      <Grid container spacing={1} sx={{ my: 1, pl: '8px' }} alignItems="center">
        <Grid item xs={10} sx={{ textAlign: 'left' }}>
          <Typography variant="h3" textAlign="center">
            {hotelName}
          </Typography>
        </Grid>
        <Grid item xs={2} sx={{ textAlign: 'right' }}>
          <Link to={`/book/${hotelId}/${hotelName}`}>
            <Button variant="contained" color="primary">
              Make Bookings
            </Button>
          </Link>
        </Grid>
      </Grid>

      <Grid container spacing={2} sx={{ my: 1, alignItems: 'center' }}>
        <Grid item xs={2}>
          <Typography variant="h4" sx={{ ml: 2, textAlign: 'left' }}>
            {months[month]}
          </Typography>
        </Grid>
        <Grid item xs={8}>
          {revenue && revenue.totalRevenue > 0 ? (
            <Card sx={{ p: 2 }}>
              <RevenueDisplay
                booking={revenue.totalBookingRevenue}
                service={revenue.totalServiceRevenue}
                total={revenue.totalRevenue}
              />
            </Card>
          ) : null}
        </Grid>
        <Grid
          item
          xs={2}
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}
        >
          <ArrowBackIosNewIcon
            onClick={handlePrevWeek}
            sx={{
              m: 1,
              ':hover': {
                cursor: 'pointer',
                color: 'red',
              },
            }}
          />
          <ArrowForwardIosNewIcon
            sx={{
              m: 1,
              ':hover': {
                cursor: 'pointer',
                color: 'red',
              },
            }}
            onClick={handleNextWeek}
          />
        </Grid>
      </Grid>

      <Card sx={{ m: 1 }}>
        <DataGrid
          rows={roomList}
          columns={getColumnsForThisWeek(selectedDate)}
          loading={isLoading}
          hideFooter
          disableColumnFilter
          disableColumnMenu
          disableColumnSorting
          columnHeaderHeight={80}
          getRowClassName={getRowClassName}
          sx={{
            '& .alternate-row': {
              backgroundColor: '#f5f5f5', // Light grey color
            },
          }}
        />
      </Card>
    </Container>
  );
}

export default Availability;
