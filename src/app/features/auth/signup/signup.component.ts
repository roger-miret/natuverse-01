import { Component, inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, UntypedFormGroup, UntypedFormBuilder } from '@angular/forms';
import { MatCard } from '@angular/material/card';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { NgIf } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../../../services/auth.service';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule, MatCard, MatFormField, MatInputModule, MatSlideToggleModule, MatLabel, MatError],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  fb=inject(FormBuilder);
  authService=inject(AuthService);

  form!:FormGroup;

  constructor(
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')],
      confirmPassword: ['', [Validators.required, this.passwordConfirmedValidator()]],
      taxonomia: [false, [Validators.required]],
      turistear: [true, [Validators.required]]
    });
  }

  signUp() {

    const taxonomiaValue = this.form.value.taxonomia ? 1 : 0;
    const turistearValue = this.form.value.turistear ? 1 : 0;

    if (this.form.valid) {
      this.authService.signUp( //pro email, username, pw
        this.form.value.email,
        this.form.value.password,
        taxonomiaValue,
        turistearValue,
      );
    }
  }

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
