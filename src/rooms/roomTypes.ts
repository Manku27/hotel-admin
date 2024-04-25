import { RoomType } from './roomConstants';

export interface Room {
  id: number;
  roomNumber: string;
  hotelId: string;
  type: RoomType;
  pricePerNight: number;
  customType?: string; // for RoomType.OTHERS
}

export type AddRoom = Omit<Room, 'roomNumber' | 'hotelId' | 'id'> & {
  roomNumbers: string[];
};
