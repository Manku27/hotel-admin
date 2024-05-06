import { Box, Card, Container, Tooltip, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
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
import { useState } from 'react';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosNewIcon from '@mui/icons-material/ArrowForwardIos';

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
              <Typography>{days[index]}</Typography>
              <Typography variant="h4">{field.split('-')[2]}</Typography>
            </Box>
          );
        },

        renderCell: ({ row, field }: GridCellParams) => {
          const isAvailableAtThisDay = !row.bookingMap[field];
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

function Availability() {
  const { hotelId } = useParams();

  const [selectedDate, setSelectedDate] = useState(dayjs());

  const month = selectedDate.month();

  const { data: roomList, isLoading } = useSWR(
    hotelId ? `${import.meta.env.VITE_API}/rooms/hotel/${hotelId}` : null,
    getFetcher
  );

  const handlePrevWeek = () => {
    setSelectedDate(selectedDate.subtract(7, 'day'));
  };

  const handleNextWeek = () => {
    setSelectedDate(selectedDate.add(7, 'day'));
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
      <Typography variant="h3" sx={{ m: 2 }}>
        Availability for {hotelId}
      </Typography>
      <Box display="flex" justifyContent="flex-end" alignItems="center">
        <Typography variant="h4" sx={{ mx: 1, textAlign: 'right' }}>
          {months[month]}
        </Typography>
        <Box>
          <ArrowBackIosNewIcon
            onClick={handlePrevWeek}
            sx={{
              m: 1,
              ':hover': {
                cursor: 'pointer',
                color: 'lightblue',
              },
            }}
          />
          <ArrowForwardIosNewIcon
            sx={{
              m: 1,
              ':hover': {
                cursor: 'pointer',
                color: 'lightblue',
              },
            }}
            onClick={handleNextWeek}
          />
        </Box>
      </Box>

      <Card sx={{ m: 1 }}>
        <DataGrid
          rows={roomList || []}
          columns={getColumnsForThisWeek(selectedDate)}
          loading={isLoading}
          hideFooter
          disableColumnFilter
          disableColumnMenu
          disableColumnSorting
        />
      </Card>
    </Container>
  );
}

export default Availability;
