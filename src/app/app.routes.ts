import { Routes } from '@angular/router';
import { PageNotFoundComponent } from './core/page-not-found/page-not-found.component';
import { AuthService } from './services/auth.service';

//tipejar rutes?
export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', loadComponent:() => import('./home/home.component').then(m=>m.HomeComponent)},
    { path: 'mock-turistear', loadComponent:() => import('./features/mocks/mock-turistear/mock-turistear.component').then(m=>m.MockTuristearComponent)},
    { path: 'mock-taxonomia', loadComponent:() => import('./features/mocks/mock-taxonomia/mock-taxonomia.component').then(m=>m.MockTaxonomiaComponent)},
    { path: 'auth', loadChildren: () => import('../app/routes/auth-routes').then(mod=>mod.AUTH_ROUTES) },
    { path: 'settings', loadChildren: () => import('../app/routes/settings-routes').then(mod=>mod.SETTINGS_ROUTES) },
    // { path: 'cookies-policy', loadComponent: () => import('./app/cookies-policy/cookies-policy.component').then(m => m.CookiesPolicyComponent) },
    { path: '**', pathMatch: 'full', component: PageNotFoundComponent }
  ];