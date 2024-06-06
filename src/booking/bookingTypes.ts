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

export interface Booking {
  guests: { name: string; mobileNo: string }[];
  roomNo: string;
  checkInDate: Dayjs;
  checkOutDate: Dayjs;
  id: number;
  additionalServices: { id: number; name: string; cost: number }[];
  bookingPrice: number;
  totalPrice: number;
}
