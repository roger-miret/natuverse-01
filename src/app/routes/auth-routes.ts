import { Route } from "@angular/router";
import { SigninComponent } from "../features/auth/signin/signin.component";
import { SignupComponent } from "../features/auth/signup/signup.component";


export const AUTH_ROUTES: Route[] = [
    { path: '', redirectTo: 'signin', pathMatch: 'full' },
    {path: 'signin', component: SigninComponent},
    {path: 'signup', component: SignupComponent}
];