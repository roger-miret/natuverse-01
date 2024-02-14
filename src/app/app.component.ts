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
  
  ngOnInit(){
    // this.authService.getCurrentSession();
    this.authService.getCurrentAuthenticatedUser();
    this.isLoggedIn$ = this.authService.isLoggedIn$;
    this.auth_loading = this.authService.auth_loading;
  }

  title = 'natuverse-01';
}
