import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { inject } from '@angular/core';
import { fetchUserAttributes } from 'aws-amplify/auth';

export const isTaxonomiaGuard: CanActivateFn = async () => {
  const authService=inject(AuthService);
  const router = inject(Router);

  try {
    const userAttributes = await fetchUserAttributes();
    if(userAttributes['custom:taxonomia']=='1'){
      alert('User is subscribed to Taxonomia');
      return true;
    }
    alert('User NOT subscribed to Taxonomia!');
    return false;
  } catch (error) {
    alert("Couldn't fetch user attributes!");
    console.log(error);
  }

  return true;
};
