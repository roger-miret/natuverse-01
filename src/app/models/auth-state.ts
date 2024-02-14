import { User } from "./user";

export interface AuthState{
    isLoggedIn:boolean,
    currentUser:User,
    token:string,
    auth_loading:boolean
}