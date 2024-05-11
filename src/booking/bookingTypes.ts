import { Dayjs } from 'dayjs';
import { Guest } from '../guests/guestsType';

export interface RoomBooking {
  guestList: Guest[];
  roomNo: string;
  checkInDate: Dayjs;
  checkOutDate: Dayjs;
  finalPrice?: string; // final price agreed on
}

export interface BookingPayload {
  booking: {
    checkInDate: Dayjs;
    checkOutDate: Dayjs;
    bookedRooms: {
      roomNumber: number | string;
      id: number;
    }[];
    roomPrice: {
      [roomId: string | number]: number; //nothing for default
    };
  };
  guests: {
    name: string;
    mobileNo: string;
  }[];
}
