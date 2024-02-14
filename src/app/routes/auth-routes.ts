import { Route } from "@angular/router";
import { SigninComponent } from "../features/auth/signin/signin.component";
import { SignupComponent } from "../features/auth/signup/signup.component";
import { ConfirmCodeComponent } from "../features/auth/confirm-code/confirm-code.component";
import { isNotLoggedInGuard } from "../shared/guards/is-not-logged-in.guard";


export const AUTH_ROUTES: Route[] = [
    { path: '', redirectTo: 'signin', pathMatch: 'full' },
    {path: 'signin', canActivate:[isNotLoggedInGuard], component: SigninComponent},
    {path: 'signup', canActivate:[isNotLoggedInGuard], component: SignupComponent},
    {path: 'confirm', component: ConfirmCodeComponent},
];