export interface Hotel {
  name: string;
  address: string;
  gstNumber?: string;
  employeeIds: any[];
  rooms: any[];
  id: number;
}

export type AddHotel = Omit<Hotel, 'rooms' | 'id'>;
