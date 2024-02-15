import { Injectable, inject } from '@angular/core';
import { ConfirmResetPasswordInput, ConfirmUserAttributeInput, ResetPasswordOutput, UpdatePasswordInput, UpdateUserAttributeOutput, UpdateUserAttributesInput, VerifiableUserAttributeKey, confirmResetPassword, confirmUserAttribute, deleteUser, resetPassword, sendUserAttributeVerificationCode, updatePassword, updateUserAttribute, updateUserAttributes } from 'aws-amplify/auth';
import { mutableAttributes } from '../models/user';
import { AuthService } from './auth.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogModel, ConfirmationDialogComponent } from '../shared/components/confirmation-dialog/confirmation-dialog.component';
import { async, filter, map, switchMap } from 'rxjs';
import { DialogsService } from './dialogs.service';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  authService = inject(AuthService);
  dialogsService=inject(DialogsService);

  constructor() { }

  //UPDATE COMMON ATTRIBUTES (SETTINGS)
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

  //UPDATE ONE ATTRIBUTE, OPTIONALLY SEND CONFIRMATION CODE
  //UPDATE ATTRIBUTE
  handleUpdateUserAttribute(attributeKey: string, value: string) {
    return this.dialogsService.openConfirmModal(
     'Yes, send me confirmation code to email', 
     'do you really wish to update '+attributeKey+' as '+value+'?')
     //si al dialog es confirma, actualitza l'atribut i envia codi de confirmació
     .pipe(filter(dialogResult=>dialogResult), switchMap(async res=>{
        try {
          const output = await updateUserAttribute({
            userAttribute: {
              attributeKey,
              value
            }
          });
          this.handleUpdateUserAttributeNextSteps(output);
          return true;
        } catch (error) {
          console.log(error);
          return false;
        }
     }))
  }
  
  //SEND CONFIRMATION CODE
  handleUpdateUserAttributeNextSteps(output: UpdateUserAttributeOutput) {
    const { nextStep } = output;
    switch (nextStep.updateAttributeStep) {
      case 'CONFIRM_ATTRIBUTE_WITH_CODE':
        const codeDeliveryDetails = nextStep.codeDeliveryDetails;
        alert(
          `Confirmation code was sent to ${codeDeliveryDetails?.deliveryMedium}.`
        );
        // Collect the confirmation code from the user and pass to confirmUserAttribute.
        break;
      case 'DONE':
        alert(`attribute was successfully updated.`);
        break;
    }
  }

  //CONFIRM ATTRIBUTE UPDATE WITH CODE
  async handleConfirmUserAttribute({
    userAttributeKey,
    confirmationCode
  }: ConfirmUserAttributeInput) {
    try {
      await confirmUserAttribute({ userAttributeKey, confirmationCode });
      alert('updated successfully with code. Browser is going to reload to update login statge.');
      return true;
      //subscriber should reload
    } catch (error) {
      console.log(error);
      alert(error);
      return false;
    }
  }

  //CONFIRM DELETION MODAL+DELETION
  //unsubscribe!
  openConfirmDeleteModal(){//es podria modularitzar passant els args aquí
    this.dialogsService.openConfirmModal(
      `Are you SURE you want to delete your account?`,
      "Confirm delete account"
    ).subscribe(dialogResult => {
      if(dialogResult===true){
        this.handleDeleteUser();
      }
    });
  }

  async handleUpdatePassword({
    oldPassword,
    newPassword
  }: UpdatePasswordInput) {
    try {
      await updatePassword({ oldPassword, newPassword });
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  }

    //DELETE ACCOUNT
    async handleDeleteUser() {
      if(confirm("we will ask again: are you SURE to delete your account??")) {
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
