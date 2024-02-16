import { Route } from "@angular/router";
import { InfoTaxonomiaComponent } from "../features/info/info-taxonomia/info-taxonomia.component";
import { InfoTuristearComponent } from "../features/info/info-turistear/info-turistear.component";


export const INFO_ROUTES: Route[] = [
    { path: '', redirectTo: 'settings', pathMatch: 'full' },
    { path: 'turistear', component: InfoTuristearComponent },
    { path: 'taxonomia', component: InfoTaxonomiaComponent }
];