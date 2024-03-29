import { Guest } from '../guests/guestsType';

export interface RoomBooking {
  guestList: Guest[]; // max occupany of room
  room: string; // room size and guest list conditional on each other
  checkInDate: string;
  checkOutDate: string;
  finalPrice?: string; // final price agreed on
}
