import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss'
})
export class SigninComponent {
  fb = inject(FormBuilder);
  authService = inject(AuthService);

  signinForm!: FormGroup; //tipejar?
  isLoggedin?: boolean;

  ngOnInit() {
    this.signinForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  loginOnSubmit() {
    if (this.signinForm.valid) {
      const formValue = this.signinForm.value;
      this.authService.handleSignIn({username:formValue.email, password:formValue.password});
    }
  }

}
