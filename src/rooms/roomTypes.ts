import { RoomType } from './roomConstants';

export interface Room {
  id: number;
  roomNumber: string | number;
  hotelId: string | number;
  type: RoomType;
  pricePerNight: number;
  customType?: string; // for RoomType.OTHERS
  unavailableDays: string[];
}

export type AddRoom = Omit<
  Room,
  'roomNumber' | 'hotelId' | 'id' | 'unavailableDays'
> & {
  roomNumbers: string[];
};
