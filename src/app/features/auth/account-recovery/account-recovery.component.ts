import { Component, inject } from '@angular/core';
import { AccountRecoveryService } from '../../../services/account-recovery.service';
import { NgIf } from '@angular/common';
import { FormGroup, ReactiveFormsModule, UntypedFormBuilder, Validators } from '@angular/forms';
import { MatCard } from '@angular/material/card';
import { MatFormField, MatLabel, MatError } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { resetPassword } from 'aws-amplify/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account-recovery',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule, MatCard, MatFormField, MatInputModule, MatLabel, MatError],
  templateUrl: './account-recovery.component.html',
  styleUrl: './account-recovery.component.scss'
})
export class AccountRecoveryComponent {
  fb=inject(UntypedFormBuilder);
  accountRecovery = inject(AccountRecoveryService);
  router=inject(Router);

  showCodeInput=false;
  form!:FormGroup;
  codeForm!:FormGroup;
  
  constructor(
    ) { }
  
    ngOnInit(): void {
      this.form = this.fb.group({
        email: ['', [Validators.required]]
      })

      //afegir que es validi dues vegades la password
      this.codeForm = this.fb.group({
        newPassword: ['', Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')],
        confirmPassword: ['', [Validators.required, this.passwordConfirmedValidator()]],
        code: ['', [Validators.required]]
      });
    }

  async resetPassword(){
    const passwordReseted = await this.accountRecovery.handleResetPassword(this.form.value.email);
    if(passwordReseted){
      this.showCodeInput = true;
      alert('Email was sent to recover password');
    }else{
      alert('Error when trying to recover password. Try again.');
    }
  }

  async confirmRecovery(){
    const accountIsRecovered = await this.accountRecovery.handleConfirmResetPassword({
      username:this.form.value.email, 
      newPassword:this.codeForm.value.newPassword,
    confirmationCode:this.codeForm.value.code});
    if(accountIsRecovered){
      alert('Account reseted! Now you may login with email and new password.');
      this.router.navigate(['/auth/signin']);
    }
  }

  private passwordConfirmedValidator() {
    return (formGroup: FormGroup) => {
      const passwordField = this.codeForm?.controls['newPassword'];
      if (!passwordField || (formGroup.errors && !formGroup.errors['passwordConfirmed'])) {
        return;
      }
      if (formGroup.value !== passwordField.value) {
        return {
          passwordConfirmed: true,
        }
      } else {
        return null;
      }
    }
  }


}
