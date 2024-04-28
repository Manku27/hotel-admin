export interface User {
  id: number;
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  roles: { id: number; name: string }[];
}

export interface AddEmployee {
  firstName: string;
  lastName: string;
  password: string;
  email: string;
}
