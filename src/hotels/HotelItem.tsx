import {
  Autocomplete,
  Box,
  Button,
  Card,
  Chip,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import { lazy, useState } from 'react';
import { Hotel } from './hotelTypes';
import { Room } from '../rooms/roomTypes';
import {
  RoomType,
  RoomTypeColors,
  RoomTypeLabel,
} from '../rooms/roomConstants';
import LazyComponentWrapper from '../routing/LazyComponentWrapper';
import { Link } from 'react-router-dom';
import useSWR, { useSWRConfig } from 'swr';
import { getFetcher, sendRequest } from '../services/fetcher';
import { employeesAsOptions } from '../common/employeesAsOptions';

const AddRoomForm = lazy(() => import('../rooms/AddRoomForm'));

interface Props {
  hotel: Hotel;
}

export const HotelItem = ({ hotel }: Props) => {
  const { mutate } = useSWRConfig();

  const [addRoom, setAddRom] = useState(false);

  const existingEmployees = employeesAsOptions(hotel.employees);

  const [employees, setEmployees] = useState(existingEmployees);

  const { data: allEmployees, isLoading: isLoadingEmployees } = useSWR(
    `${import.meta.env.VITE_API}/users`,
    getFetcher,
    {
      revalidateOnFocus: false,
    }
  );

  const allEmployeesOption = allEmployees
    ? employeesAsOptions(allEmployees)
    : [];

  const handleEmployees = (e, newVal) => {
    setEmployees(newVal);
    handleSubmitEmployees(newVal);
  };

  const handleSubmitEmployees = (newVal) => {
    const empIdList = newVal.map((emp) => emp.id);
    sendRequest(
      `${import.meta.env.VITE_API}/hotels/${hotel.id}/employees`,
      empIdList,
      () => {
        mutate(`${import.meta.env.VITE_API}/users`);
        mutate(`${import.meta.env.VITE_API}/hotels`);
      },
      'PUT'
    );
  };

  return (
    <Grid item xs={6}>
      <Card sx={{ m: 2, p: 2, flex: 1 }}>
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={9}>
            <Box textAlign="left" sx={{ mx: 1 }}>
              <Link
                to={`/hotel/${hotel.id}`}
                style={{ textDecoration: 'none', color: '#01579b' }}
              >
                <Typography variant="h5"> {hotel.name}</Typography>
              </Link>
              <Typography variant="body2">
                Phone : {hotel.phoneNumbers?.map((phn) => phn + ' ')}
              </Typography>
              <Typography variant="body2">
                {hotel.address
                  ? `${hotel.address.street}, ${hotel.address.city}`
                  : ''}
              </Typography>
              <Typography variant="body2">
                {hotel.address
                  ? `${hotel.address.state},  ${hotel.address.country}, ${hotel.address.zipCode}`
                  : ''}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={3}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link
                to={`/hotel/${hotel.id}/${hotel.name}`}
                style={{ textDecoration: 'none', color: '#01579b' }}
              >
                <Button variant="contained">
                  <Typography variant="body2">Check Availability</Typography>
                </Button>
              </Link>
              <Link
                to={`/bookings/${hotel.id}/${hotel.name}`}
                style={{ textDecoration: 'none', color: '#01579b' }}
              >
                <Button variant="contained">
                  <Typography variant="body2">Check Bookings</Typography>
                </Button>
              </Link>
            </Box>
          </Grid>
          <Grid item xs={12} sx={{ textAlign: 'left' }}>
            <Autocomplete
              loading={isLoadingEmployees}
              clearIcon={false}
              options={allEmployeesOption}
              multiple
              value={employees}
              renderTags={(value: Option[], props) =>
                value.map((option, index) => (
                  <Chip
                    label={option?.label || ''}
                    {...props({ index })}
                    key={index}
                  />
                ))
              }
              onChange={handleEmployees}
              sx={{ marginBottom: '1rem' }}
              renderInput={(params) => (
                <TextField label="Employees" {...params} />
              )}
            />
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          {hotel.rooms.map((room: Room) => (
            <Grid item xs={4} key={room.id}>
              <Card
                sx={{
                  m: 0.5,
                  p: 1,
                  flex: 1,
                  backgroundColor: RoomTypeColors[room.type],
                }}
              >
                <Typography variant="body2"> {room.roomNumber}</Typography>
                <Typography variant="body2">
                  {room.type === RoomType.OTHER
                    ? room.customType
                    : RoomTypeLabel[room.type]}
                </Typography>
                <Typography variant="body2">₹{room.pricePerNight}</Typography>
              </Card>
            </Grid>
          ))}
          <Grid
            item
            xs={4}
            sx={{
              display: 'flex',
              justifyContent: 'flex-start',
              alignItems: 'center',
            }}
          >
            <Button
              variant="contained"
              onClick={() => setAddRom(!addRoom)}
              sx={{ mt: 1 }}
            >
              <Typography variant="body2">Add Rooms</Typography>
            </Button>
          </Grid>
        </Grid>
        {addRoom ? (
          <LazyComponentWrapper>
            <AddRoomForm
              hotelId={hotel.id}
              successCallback={() => setAddRom(false)}
            />
          </LazyComponentWrapper>
        ) : null}
      </Card>
    </Grid>
  );
};
