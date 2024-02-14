import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { tap } from 'rxjs';
import { getCurrentUser } from 'aws-amplify/auth';

export const isLoggedInGuard: CanActivateFn = async () => {
  const router:Router = inject(Router);

  const authService: AuthService = inject(AuthService);
    
  try{
    await getCurrentUser();
    alert('GUARD: OK!');
    return true;
  }catch{
    alert('GUARD: NOT LOGGED IN');
    return false;
  }  
};
