export type Gender = 'Male' | 'Female' | 'Others';

export interface Guest {
  firstName: string;
  lastName: string;
  gender: Gender;
  age: number;
  mobileNo: string; // one for the group
  govIDFilePath: string; // for minor also
  pictureFilePath: string;
}

export const PHONE_REGEX = /^[6789]\d{9}$/;
