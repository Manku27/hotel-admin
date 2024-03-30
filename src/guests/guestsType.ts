export type Gender = 'Male' | 'Female' | 'Others';

export interface Guest {
  firstName: string;
  lastName: string;
  gender: Gender;
  govIDFilePath: string; // for minor also
  mobileNo: string; // one for the group
  pictureFilePath: string;
}
