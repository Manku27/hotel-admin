export interface Login {
  email: string;
  password: string;
}

export interface Auth {
  firstName: string;
  lastName: string;
  username: string;
  accessToken: string;
  token: string;
}

export enum RoleType {
  ROLE_ADMIN = 0,
  ROLE_EMPLOYEE = 1,
  ROLE_USER = 2,
  ROLE_OWNER = 3,
}
export enum RoleLabel {
  ROLE_ADMIN = 'Admin',
  ROLE_EMPLOYEE = 'Employee',
  ROLE_USER = 'User',
  ROLE_OWNER = 'Owner',
}
