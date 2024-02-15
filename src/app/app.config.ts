import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { provideRouter } from '@angular/router';

import amplifyconfig from './../amplifyconfiguration.json';

import { Amplify } from 'aws-amplify';
Amplify.configure(amplifyconfig);

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AuthService } from './services/auth.service';
import { ConfigService } from './services/config.service';
import { DialogsService } from './services/dialogs.service';
import { NavigationService } from './services/navigation.service';
import { ErrorHandlingService } from './services/error-handling.service';
import { ConfirmBeforeLeavingGuard } from './shared/guards/confirm-before-leaving.guard';




export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideAnimationsAsync(), 
  importProvidersFrom(ReactiveFormsModule),
  AuthService, ConfigService, DialogsService, 
  NavigationService, ErrorHandlingService]
};
