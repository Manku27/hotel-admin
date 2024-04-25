import { Button, Card, Grid } from '@mui/material';
import { lazy, useState } from 'react';
import { Hotel } from './hotelTypes';
import { Room } from '../rooms/roomTypes';
import { RoomType } from '../rooms/roomConstants';

const AddRoomForm = lazy(() => import('../rooms/AddRoomForm'));

interface Props {
  hotel: Hotel;
}

export const HotelItem = ({ hotel }: Props) => {
  const [addRoom, setAddRom] = useState(false);

  return (
    <Grid item xs={6}>
      <Card sx={{ m: 2, p: 2, flex: 1 }}>
        <h4> {hotel.name}</h4>
        <h5> {hotel.address}</h5>
        <Button onClick={() => setAddRom(!addRoom)}>Add Rooms</Button>
        <Grid container spacing={2}>
          {hotel.rooms.map((room: Room) => (
            <Grid item xs={4} key={room.id}>
              <Card sx={{ m: 0.5, p: 0.5, flex: 1 }}>
                <h5> {room.roomNumber}</h5>
                <h6>
                  {room.type === RoomType.OTHER ? room.customType : room.type}
                </h6>
                <h6>₹{room.pricePerNight}</h6>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Card>
      {addRoom ? <AddRoomForm hotelId={hotel.id} /> : null}
    </Grid>
  );
};
