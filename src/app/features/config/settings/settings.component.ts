import { NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCard } from '@angular/material/card';
import { MatFormField, MatLabel, MatError } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { AuthService } from '../../../services/auth.service';
import {MatSelectModule} from '@angular/material/select';
import { langArr, language } from '../../../models/user';
import { ConfigService } from '../../../services/config.service';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule, MatSelectModule, 
    MatCard, MatFormField, MatInputModule, MatSlideToggleModule, MatLabel, MatError],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent {
  fb=inject(FormBuilder);
  authService=inject(AuthService);
  configService = inject(ConfigService);

  form!:FormGroup;
  languages=langArr;
  languageTrigger='cat';

  ngOnInit() {
    this.form = this.fb.group({
      taxonomia: [false, [Validators.required]],
      turistear: [false, [Validators.required]],
      dark_mode_pref: [false, [Validators.required]],
      language: [this.languages[0], [Validators.required]],
    });

    this.authService.user$.subscribe(user => {
      if(user){
        this.form.patchValue({
          taxonomia: user.taxonomia == '1' ? true : false,
          turistear: user.turistear == '1' ? true : false,
          dark_mode_pref: user.dark_mode_pref == '1' ? true : false,
          language: user.language
        });

        this.languageTrigger=user.language;
      }
    });
  }

  updateUser(){
    const formValues = this.form.value;
    this.configService.updateAttributes({
      'custom:taxonomia': formValues.taxonomia ? '1' : '0',
      'custom:turistear': formValues.turistear ? '1' : '0',
      'custom:dark_mode_pref': formValues.dark_mode_pref ? '1' : '0',
      'custom:language': formValues.language
    });
  }

}
