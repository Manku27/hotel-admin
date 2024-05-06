import { RoomType } from './roomConstants';

export interface Room {
  id: number;
  roomNumber: string | number;
  hotelId: string | number;
  type: RoomType;
  pricePerNight: number;
  customType?: string; // for RoomType.OTHERS
  bookingMap: { [date: string]: boolean };
  availableToday: boolean;
}

export type AddRoom = Omit<
  Room,
  'roomNumber' | 'hotelId' | 'id' | 'bookingMap' | 'availableToday'
> & {
  roomNumbers: string[];
};
