import { Gender, GuestForm } from './guestsType';

export const GENDER_LIST: Gender[] = ['Male', 'Female', 'Others'];

export const guestInitialValues: GuestForm = {
  firstName: '',
  lastName: '',
  gender: 'Female',
  age: 20,
  mobileNo: '',
  govIDFilePath: '',
  govIDFileName: '',
  pictureFilePath: '',
  pictureFileName: '',
};
