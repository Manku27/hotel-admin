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
              <Typography variant="h5"> {hotel.name}</Typography>
              <Typography variant="body2"> {hotel.address}</Typography>
            </Box>
          </Grid>
          <Grid item xs={3}>
            <Button variant="contained" onClick={() => setAddRom(!addRoom)}>
              <Typography variant="body2">Add Rooms</Typography>
            </Button>
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
                  backgroundColor:
                    RoomTypeColors[room.availableToday ? room.type : 'BOOKED'],
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
