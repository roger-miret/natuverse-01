import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { langArr } from '../../../models/user';
import { AuthService } from '../../../services/auth.service';
import { ConfigService } from '../../../services/config.service';
import { NgIf } from '@angular/common';
import { MatCard } from '@angular/material/card';
import { MatFormField, MatLabel, MatError } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { DialogsService } from '../../../services/dialogs.service';
import { ComponentCanDeactivate } from '../../../shared/guards/confirm-before-leaving.guard';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule, 
    MatCard, MatFormField, MatInputModule, MatLabel, MatError, MatButtonModule],
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss'
})
export class AccountComponent implements ComponentCanDeactivate{
  fb=inject(FormBuilder);
  authService=inject(AuthService);
  configService = inject(ConfigService);

  emailForm!:FormGroup;
  emailCodeForm!:FormGroup;
  
  showCodeInput=false;

  //PENDENT
  canLeave=true;
  canDeactivate(): boolean {
    return this.canLeave;
  }

  ngOnInit() {
    //es podrien unir en un sol form suposo
    this.emailForm = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      // password: ['', Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')],
      // confirmPassword: ['', [Validators.required, this.passwordConfirmedValidator()]],
    });

    this.emailCodeForm = this.fb.group({
      code: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]],
    });

    this.authService.user$.subscribe(user => {
      if(user){
        this.emailForm.patchValue({
          email: user.email,
        });
      }
    });
}

//SEND NEW EMAIL AND SEND CONFIRMATION CODE
updateEmail() {
  if(this.emailForm.value.email===this.authService.userSubj.getValue()!.email){
    alert('Insert a different email!');
  } else if (this.emailForm.valid) {
    this.configService.handleUpdateUserAttribute('email', this.emailForm.value.email )
    .subscribe(res=>{
      if(res){
        this.showCodeInput=true;
        this.canLeave=false;
      }
    })
  }
}

//ENTER CONFIRMATION CODE TO UPDATE EMAIL
async sendEmailCode(){
  const codeIsValid = await this.configService.handleConfirmUserAttribute({
    userAttributeKey:'email',
    confirmationCode:this.emailCodeForm.value.code
  });
  if(codeIsValid){
    this.canLeave=true;
    location.reload();
  }
}

//NEEDS CONFIRMATION TO BE IMPLEMENTED
deleteAccount(){
  // this.configService.handleDeleteUser();
  this.configService.openConfirmDeleteModal();
}

  //repetit de signup component
  private passwordConfirmedValidator() {
    return (formGroup: FormGroup) => {
      const passwordField = this.emailForm?.controls['password'];
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
