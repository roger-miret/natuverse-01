import { Component, inject } from '@angular/core';
import { FormGroup, ReactiveFormsModule, UntypedFormBuilder, Validators } from '@angular/forms';
import { MatCard } from '@angular/material/card';
import { MatFormField, MatLabel, MatError } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../../../services/auth.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-confirm-code',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule, MatCard, MatFormField, MatInputModule, MatLabel, MatError],
  templateUrl: './confirm-code.component.html',
  styleUrl: './confirm-code.component.scss'
})
export class ConfirmCodeComponent {
  fb=inject(UntypedFormBuilder);
  authService=inject(AuthService);

  form!:FormGroup;

  constructor(
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      code: ['', [Validators.required]]
    })
  }

  signUpConfirm(){
    const confirmCode = this.form.value.code;
    this.authService.handleSignUpConfirmation(confirmCode);
  }
}
