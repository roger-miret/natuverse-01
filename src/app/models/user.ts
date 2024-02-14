import { JWT } from "aws-amplify/auth";

export interface User {
    sub: string,
    email: string,
    email_verified:boolean,
    username: string,
    token: JWT,
    turistear: '0' | '1',
    taxonomia: '0' | '1',
    isLoggedIn: boolean,
  }
  
  // Aquest tipus pot ser User o null
  export type UserOrNull = User | null;
  