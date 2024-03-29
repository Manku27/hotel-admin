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

enum RoomTypeLabel {
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
