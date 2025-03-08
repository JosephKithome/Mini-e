export interface UserData {
  _id: string;
  systemRef: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  isAdmin: boolean;
  isBorrower: boolean;
  isInvestor: boolean;
  isGuardian: boolean;
  hasAcceptedTerms: boolean;
  isEmailEnabled: boolean;
  isTextMessageEnabled: boolean;
  status: string,
  createdAt: string; 
  updatedAt: string;
  __v: number;
  showMore?: boolean; 
}

export interface AuthPayload {
  subject: string;
  userData: UserData;
  expiresAt: string; 
  iat: number;
}
