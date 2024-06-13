import { User } from '../employee/userTypes';

interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}
export interface Hotel {
  name: string;
  address: Address;
  gstNumber?: string;
  employees: User[];
  rooms: any[];
  id: number;
  phoneNumbers: string[];
}

export type AddHotel = Omit<Hotel, 'rooms' | 'id' | 'employees'> & {
  employeeIds: number[];
};
