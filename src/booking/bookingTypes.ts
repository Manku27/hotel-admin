import { Dayjs } from 'dayjs';
import { Guest } from '../guests/guestsType';

export interface RoomBooking {
  guestList: Guest[]; // max occupany of room
  roomNo: string;
  checkInDate: Dayjs;
  checkOutDate: Dayjs;
  finalPrice?: string; // final price agreed on
}
