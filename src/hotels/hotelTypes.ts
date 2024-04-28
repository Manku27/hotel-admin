import { User } from '../employee/userTypes';

export interface Hotel {
  name: string;
  address: string;
  gstNumber?: string;
  employees: User[];
  rooms: any[];
  id: number;
}

export type AddHotel = Omit<Hotel, 'rooms' | 'id' | 'employees'> & {
  employeeIds: number[];
};
