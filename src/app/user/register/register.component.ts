import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { emailValidator } from '../../utils/email.validator';
import { matchPasswordsValidator } from '../../utils/match-passwords.validator';
import { DOMAINS } from '../../constants';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, emailValidator(DOMAINS)]],
      username: ['', [Validators.required, Validators.minLength(6)]],
      passGroup: this.fb.group(
        {
          password: ['', [Validators.required, Validators.minLength(6)]],
          rePassword: ['', Validators.required],
        },
        { validators: [matchPasswordsValidator('password', 'rePassword')] }
      )
    });
  }

  onSubmit(): void {
      console.log('Form Submitted:', this.registerForm.value);
  };
}
