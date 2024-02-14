import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { langArr } from '../../../models/user';
import { AuthService } from '../../../services/auth.service';
import { ConfigService } from '../../../services/config.service';
import { NgIf } from '@angular/common';
import { MatCard } from '@angular/material/card';
import { MatFormField, MatLabel, MatError } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule, 
    MatCard, MatFormField, MatInputModule, MatLabel, MatError],
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss'
})
export class AccountComponent {
  fb=inject(FormBuilder);
  authService=inject(AuthService);
  configService = inject(ConfigService);

  form!:FormGroup;
  languages=langArr;
  languageTrigger='cat';

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')],
      confirmPassword: ['', [Validators.required, this.passwordConfirmedValidator()]],
    });

    this.authService.user$.subscribe(user => {
      if(user){
        this.form.patchValue({
          email: user.email,
          password: '',
          confirmPassword: '',
        });
      }
    });
}

//PENDENT
updateEmailAndPassword(){
  console.log('mock of updating email and password; confirmation needs to be implemented');
}

  //repetit de signup component
  private passwordConfirmedValidator() {
    return (formGroup: FormGroup) => {
      const passwordField = this.form?.controls['password'];
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
