import { RoomType } from './roomConstants';

export interface Room {
  id: number;
  roomNumber: string;
  hotelId: string;
  type: RoomType;
  pricePerNight: number;
  customType?: string; // for RoomType.OTHERS
  bookingMap: any;
}

export type AddRoom = Omit<
  Room,
  'roomNumber' | 'hotelId' | 'id' | 'bookingMap'
> & {
  roomNumbers: string[];
};
