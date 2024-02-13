import { Routes } from '@angular/router';
import { PageNotFoundComponent } from './core/page-not-found/page-not-found.component';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', loadComponent:() => import('./home/home.component').then(m=>m.HomeComponent)},
    { path: 'auth', loadChildren: () => import('../app/routes/auth-routes').then(mod=>mod.AUTH_ROUTES) },
    { path: 'settings', loadChildren: () => import('../app/routes/settings-routes').then(mod=>mod.SETTINGS_ROUTES) },
    // { path: 'cookies-policy', loadComponent: () => import('./app/cookies-policy/cookies-policy.component').then(m => m.CookiesPolicyComponent) },
    { path: '**', pathMatch: 'full', component: PageNotFoundComponent }
  ];