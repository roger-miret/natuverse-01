import { Injectable, inject } from '@angular/core';
import { UpdateUserAttributeOutput, UpdateUserAttributesInput, deleteUser, updateUserAttribute, updateUserAttributes } from 'aws-amplify/auth';
import { mutableAttributes } from '../models/user';
import { AuthService } from './auth.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogModel, ConfirmationDialogComponent } from '../shared/components/confirmation-dialog/confirmation-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  authService = inject(AuthService);
  dialog=inject(MatDialog);

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



  openConfirmDeleteModal(){
    const message = `Are you sure you want to delete your account?`;
    //es podria posar títol també en altra variable...
    const dialogData = new ConfirmDialogModel("Confirm delete account", message);

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      maxWidth: "400px",
      data: dialogData
    });

    //unsubscribe!
    dialogRef.afterClosed().subscribe(dialogResult => {
      console.log(dialogResult);
      alert(dialogResult);
      if(dialogResult===true){
        this.handleDeleteUser();
      }
    });
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
