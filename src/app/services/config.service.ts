import { Injectable, inject } from '@angular/core';
import { UpdateUserAttributeOutput, UpdateUserAttributesInput, updateUserAttribute, updateUserAttributes } from 'aws-amplify/auth';
import { mutableAttributes } from '../models/user';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  authService = inject(AuthService);

  constructor() { }

  async updateAttributes(attr:mutableAttributes) { //tipejar
    try {
      const attributes = await updateUserAttributes({
        userAttributes: {
          ...attr
        }
      });
      alert('Update successful');
      location.reload();
    } catch (error) {
      alert('Error when trying to update!'+error)
      console.log(error);
    }
  }
}
