export interface UserModel {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  password: string;
  isAdmin: boolean;
  isBorrower: boolean;
  isInvestor: boolean;
}

export class User implements UserModel {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  password: string;
  isAdmin: boolean;
  isBorrower: boolean;
  isInvestor: boolean;

}