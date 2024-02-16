import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './core/header/header.component';
import { BodyComponent } from './core/body/body.component';
import { FooterComponent } from './core/footer/footer.component';

import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { AuthService } from './services/auth.service';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AsyncPipe, MatToolbarModule, MatButtonModule, MatIconModule, RouterOutlet, HeaderComponent, BodyComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  authService=inject(AuthService);
  
  isLoggedIn$!:Observable<boolean>;
  auth_loading = signal<any>(false);
  
  async ngOnInit(){
    const isUser = await this.authService.getCurrentSession();
    this.isLoggedIn$ = this.authService.isLoggedIn$;
    this.auth_loading = this.authService.auth_loading$;
    // this.logginGoogleCognito();
    //url dl botó d cognito: https://ui-mat.auth.eu-west-3.amazoncognito.com/oauth2/authorize?client_id=2gbgjkcaiu4dif12c82lbageqt&response_type=token&scope=email+openid+phone&redirect_uri=http%3A%2F%2Flocalhost%3A4200Ç
  }

  loginGoogle(){
    window.location.href="https://ui-mat.auth.eu-west-3.amazoncognito.com/oauth2/authorize?identity_provider=Google&redirect_uri=http://localhost:4200&response_type=CODE&client_id=2gbgjkcaiu4dif12c82lbageqt&scope=email openid phone"
  }

  logginGoogleCognito(){
    this.authService.loginWithGoogle();
  }

  getUser(){
    this.authService.getCurrentAuthenticatedUser();
  }

  toggleDarkMode(){
    document.body.classList.toggle("dark-theme");

  }

  title = 'natuverse-01';
}
