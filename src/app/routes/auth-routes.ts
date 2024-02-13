import { Route } from "@angular/router";
import { SigninComponent } from "../features/auth/signin/signin.component";
import { SignupComponent } from "../features/auth/signup/signup.component";
import { ConfirmCodeComponent } from "../features/auth/confirm-code/confirm-code.component";


export const AUTH_ROUTES: Route[] = [
    { path: '', redirectTo: 'signin', pathMatch: 'full' },
    {path: 'signin', component: SigninComponent},
    {path: 'signup', component: SignupComponent},
    {path: 'confirm', component: ConfirmCodeComponent},
];