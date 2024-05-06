import {
  red,
  pink,
  purple,
  indigo,
  cyan,
  teal,
  lime,
  orange,
  amber,
  yellow,
  lightGreen,
} from '@mui/material/colors';

export enum RoomType {
  SINGLE = 'SINGLE',
  DOUBLE = 'DOUBLE',
  TWIN = 'TWIN',
  SUITE = 'SUITE',
  DELUXE = 'DELUXE',
  APARTMENT = 'APARTMENT',
  PENTHOUSE = 'PENTHOUSE',
  CONNECTING = 'CONNECTING',
  ADJACENT = 'ADJACENT',
  OTHER = 'OTHER',
}

export const RoomTypeColors = {
  SINGLE: pink[100],
  DOUBLE: purple[100],
  TWIN: amber[100],
  SUITE: orange[100],
  DELUXE: lightGreen[100],
  APARTMENT: yellow[100],
  PENTHOUSE: indigo[100],
  CONNECTING: cyan[100],
  ADJACENT: teal[100],
  OTHER: lime[100],
  BOOKED: red[100],
};

export enum RoomTypeLabel {
  SINGLE = 'Single',
  DOUBLE = 'Double',
  TWIN = 'Twin',
  SUITE = 'Suite',
  DELUXE = 'Deluxe',
  APARTMENT = 'Apartment',
  PENTHOUSE = 'Penthouse',
  CONNECTING = 'Connecting',
  ADJACENT = 'Adjacent',
  OTHER = 'OTHER',
}

export const ROOM_TYPE_LIST = Object.keys(RoomType).map((key) => ({
  id: RoomType[key as keyof typeof RoomType],
  label: RoomTypeLabel[key as keyof typeof RoomTypeLabel],
}));

export const roomTypeValues = Object.values(RoomType);
