import { RoomType } from './roomConstants';

export interface Room {
  hotelId: string;
  roomNumber: string;
  type: RoomType;
  defaultPricePerNight: number;
  customType?: string; // for RoomType.OTHERS
}

export type AddRoom = Omit<Room, 'roomNumber' | 'hotelId'> & {
  roomNumbers: string[];
};
