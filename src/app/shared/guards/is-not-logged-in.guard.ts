import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { getCurrentUser } from 'aws-amplify/auth';
import { AuthService } from '../../services/auth.service';

export const isNotLoggedInGuard: CanActivateFn = async (route, state) => {
  const router:Router = inject(Router);

  const authService: AuthService = inject(AuthService);
    
  try{
    await getCurrentUser();
    alert("GUARD: can't access authentication pages while already signed in!");
    return false;
  }catch{
    alert('GUARD: can access authentication pages since you are not signed in');
    return true;
  }  
};
