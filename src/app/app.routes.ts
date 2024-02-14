import { Routes } from '@angular/router';
import { PageNotFoundComponent } from './core/page-not-found/page-not-found.component';
import { AuthService } from './services/auth.service';
import { isLoggedInGuard } from './shared/guards/is-logged-in.guard';
import { isTuristearGuard } from './shared/guards/is-turistear.guard';
import { isTaxonomiaGuard } from './shared/guards/is-taxonomia.guard';

//tipejar rutes?
export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', loadComponent:() => import('./home/home.component').then(m=>m.HomeComponent)},
    { path: 'mock-turistear', canActivate:[isLoggedInGuard, isTuristearGuard], loadComponent:() => import('./features/mocks/mock-turistear/mock-turistear.component').then(m=>m.MockTuristearComponent)},
    { path: 'mock-taxonomia', canActivate:[isLoggedInGuard, isTaxonomiaGuard], loadComponent:() => import('./features/mocks/mock-taxonomia/mock-taxonomia.component').then(m=>m.MockTaxonomiaComponent)},
    { path: 'auth', loadChildren: () => import('../app/routes/auth-routes').then(mod=>mod.AUTH_ROUTES) },
    { path: 'config', canActivate:[isLoggedInGuard], loadChildren: () => import('./routes/config-routes').then(mod=>mod.SETTINGS_ROUTES) },
    // { path: 'cookies-policy', loadComponent: () => import('./app/cookies-policy/cookies-policy.component').then(m => m.CookiesPolicyComponent) },
    { path: '**', pathMatch: 'full', component: PageNotFoundComponent }
  ];