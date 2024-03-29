export type Gender = 'Male' | 'Female' | 'Others';

export interface Guest {
  firstName: string;
  lastName: string;
  gender: Gender;
  govIDFilePath: string;
  mobileNo: string;
}
