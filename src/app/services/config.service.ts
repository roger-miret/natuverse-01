import { Injectable, inject } from '@angular/core';
import { UpdateUserAttributeOutput, UpdateUserAttributesInput, deleteUser, updateUserAttribute, updateUserAttributes } from 'aws-amplify/auth';
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

    //confirmation needs to be implemented
    async handleDeleteUser() {
      if(confirm("Are you sure to delete your account??")) {
        try {
          await deleteUser();
          alert('user deleted!');
          location.reload();
        } catch (error) {
          console.log(error);
          alert('error when trying to delete account');
        }
      }
    }
}
