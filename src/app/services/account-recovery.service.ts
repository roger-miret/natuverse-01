import { Injectable } from '@angular/core';
import { resetPassword, ResetPasswordOutput, ConfirmResetPasswordInput, confirmResetPassword } from 'aws-amplify/auth';

@Injectable({
  providedIn: 'root'
})
export class AccountRecoveryService {

  //PASSWORD RECOVERY
  async handleResetPassword(username: string) {
    try {
      const output = await resetPassword({ username });
      this.handleResetPasswordNextSteps(output);
      return true;
    } catch (error) {
      console.log(error);
      alert(error);
      return false;
    }
  }
  
  handleResetPasswordNextSteps(output: ResetPasswordOutput) {
    const { nextStep } = output;
    switch (nextStep.resetPasswordStep) {
      case 'CONFIRM_RESET_PASSWORD_WITH_CODE':
        const codeDeliveryDetails = nextStep.codeDeliveryDetails;
        alert(
          `Confirmation code was sent to ${codeDeliveryDetails.deliveryMedium}`
        );
        // Collect the confirmation code from the user and pass to confirmResetPassword.
        break;
      case 'DONE':
        console.log('Successfully reset password.');
        break;
    }
  }

  //SEND EMAIL TO RESET PASSWORD
  async handleConfirmResetPassword({
    username,
    confirmationCode,
    newPassword
  }: ConfirmResetPasswordInput) {
    try {
      await confirmResetPassword({ username, confirmationCode, newPassword });
      return true;
    } catch (error) {
      console.log(error);
      alert(error);
      return false;
    }
  }

  constructor() { }
}
