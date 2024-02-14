import { Route } from "@angular/router";
import { AccountComponent } from "../features/settings/account/account.component";
import { SettingsComponent } from "../features/settings/settings/settings.component";


export const SETTINGS_ROUTES: Route[] = [
    { path: '', redirectTo: 'settings', pathMatch: 'full' },
    { path: 'settings', component: SettingsComponent },
    { path: 'account', component: AccountComponent }
];