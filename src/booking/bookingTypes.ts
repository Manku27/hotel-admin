import { Dayjs } from 'dayjs';
import { Guest } from '../guests/guestsType';

export interface RoomBooking {
  guestList: Guest[];
  roomNo: string;
  checkInDate: Dayjs;
  checkOutDate: Dayjs;
  finalPrice?: string; // final price agreed on
  id: string;
  type?: string;
}

export interface BookingPayload {
  booking: {
    checkInDate: string;
    checkOutDate: string;
    bookedRooms: {
      roomNumber: number | string;
      id: string;
    }[];
    roomPrice: {
      [roomId: string]: number; //nothing for default
    };
  };
  guests: Guest[];
}
