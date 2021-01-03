export interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword?: string;
}
export interface UpdateUserModel {
  firstName: string;
  lastName: string;
}
