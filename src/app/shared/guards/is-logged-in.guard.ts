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
    alert('GAURD: OK!');
    return true;
  }catch{
    alert('GUARD: NOT LOGGED IN');
    return false;
  }
  //El problema d'utilitzar el subject és que el guarda s'aplica abans, per això usem localStorage
    // return authService.isLoggedIn$.pipe(tap(isLoggedIn=>
    //   {
    //       if (isLoggedIn) {
    //       alert('logged in guard: ok!')
    //       return true;
    //     }
    //     router.navigate(['/auth/signin']);
    //     alert('logged in guard: NOT LOGGED IN!')
    //     return false;
    //   }
    //   ));
  
};
