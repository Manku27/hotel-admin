import { RoomType } from './roomConstants';

export interface Room {
  hotelId: string; // not id of hotel, but identifier
  roomNumber: string;
  type: RoomType;
  defaultPricePerNight: number;
  occupanySize: number;
  customType?: string; // for RoomType.OTHERS
}

export type AddRooms = Omit<Room, 'roomNumber'> & { roomNumbers: string[] };
