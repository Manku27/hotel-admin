export type Gender = 'Male' | 'Female' | 'Others';

export interface Guest {
  firstName: string;
  lastName: string;
  gender: Gender;
  age: number;
  mobileNo: string; // one for the group
  govtId: string; // for minor also
  picture: string;
}

export interface GuestForm extends Guest {}

export const PHONE_REGEX = /^[6789]\d{9}$/;
