import { Box, Button, Card, Chip, Grid, Typography } from '@mui/material';
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
import dayjs from 'dayjs';

const AddRoomForm = lazy(() => import('../rooms/AddRoomForm'));

interface Props {
  hotel: Hotel;
}

export const HotelItem = ({ hotel }: Props) => {
  const [addRoom, setAddRom] = useState(false);

  return (
    <Grid item xs={6}>
      <Card sx={{ m: 2, p: 2, flex: 1 }}>
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={9}>
            <Box textAlign="left" sx={{ mx: 1 }}>
              <Link
                to={`/hotels/${hotel.id}`}
                style={{ textDecoration: 'none', color: '#01579b' }}
              >
                <Typography variant="h5"> {hotel.name}</Typography>
              </Link>
              <Typography variant="body2"> {hotel.address}</Typography>
            </Box>
          </Grid>
          <Grid item xs={3}>
            <Link
              to={`/hotels/${hotel.id}`}
              style={{ textDecoration: 'none', color: '#01579b' }}
            >
              <Button variant="contained" onClick={() => setAddRom(!addRoom)}>
                <Typography variant="body2">Check Availability</Typography>
              </Button>
            </Link>
          </Grid>
          <Grid item xs={12} sx={{ textAlign: 'left' }}>
            {hotel.employees.map((employee) => (
              <Chip
                label={`${employee.firstName} ${employee.lastName}`}
                key={employee.id}
                sx={{ mr: 1 }}
              />
            ))}
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
          <Grid item xs={4}>
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
