import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, MatToolbarModule, MatButtonModule, MatIconModule, AsyncPipe],

  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  authService=inject(AuthService);

  isLoggedIn$!:Observable<boolean>;
  currentuser$!:Observable<any>; //tipejar
  
  
  ngOnInit(){
    this.isLoggedIn$ = this.authService.isLoggedIn$;
    this.currentuser$ = this.authService.currentUser$;
  }

  signout(){
    this.authService.handleSignOut();
  }
}
