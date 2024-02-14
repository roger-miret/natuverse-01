import { JWT } from "aws-amplify/auth";

export interface User {
    sub: string,
    email: string,
    email_verified:'true'|'false',
    username: string,
    token: JWT,
    turistear: '0' | '1',
    taxonomia: '0' | '1',
    dark_mode_pref: '0' | '1',
    language: language,
    isLoggedIn: boolean,
  }

  export interface mutableAttributes {
    email: string,
    // password:string,
    'custom:turistear': '0' | '1',
    'custom:taxonomia': '0' | '1',
    'custom:dark_mode_pref': '0' | '1',
    'custom:language': language,
  }
  
  // Aquest tipus pot ser User o null
  export type UserOrNull = User | null;

  export const langArr = ["cat", "es", "en", "it"] as const;
  export type language = typeof langArr[number];


  