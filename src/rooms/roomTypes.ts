import { RoomType } from './roomConstants';

export interface Room {
  // hotel identifier goes in params
  roomNumber: string;
  type: RoomType;
  defaultPricePerNight: number;
  occupanySize: number;
  customType?: string; // for RoomType.OTHERS
}

export type AddRooms = Omit<Room, 'roomNumber'> & { roomNumbers: string[] };
