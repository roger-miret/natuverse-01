import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { inject } from '@angular/core';
import { fetchUserAttributes } from 'aws-amplify/auth';

export const isTuristearGuard: CanActivateFn = async (route, state) => {
  const authService=inject(AuthService);
  const router = inject(Router);

  try {
    const userAttributes = await fetchUserAttributes();
    if(userAttributes['custom:turistear']=='1'){
      alert('User is subscribed to Turistear');
      return true;
    }
    alert('User NOT subscribed to Turistear!');
    //navigate to settings o subscribe
    return false;
  } catch (error) {
    alert("Couldn't fetch user attributes!");
    //navigate to settings o subscribe
    console.log(error);
  }

  return true;
};
