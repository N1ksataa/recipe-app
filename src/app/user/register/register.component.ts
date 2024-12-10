import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { emailValidator } from '../../utils/email.validator';
import { matchPasswordsValidator } from '../../utils/match-passwords.validator';
import { DOMAINS } from '../../constants';
import { UserService } from '../user.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) {
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
    const { email, username, passGroup: { password, rePassword } } = this.registerForm.value;
  
    if (password !== rePassword) {
      console.error('Passwords do not match!');
      return;
    }
  
    this.userService.register({ email, username, password })
      .subscribe((response) => {
        console.log('User registered:', response);
        this.router.navigate(['/home']);
      });
  }
  
}  
