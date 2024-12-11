import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { emailValidator } from '../../utils/email.validator';
import { matchPasswordsValidator } from '../../utils/match-passwords.validator';
import { DOMAINS } from '../../constants';
import { UserService } from '../user.service';
import { LoaderComponent } from '../../shared/loader/loader.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule, LoaderComponent],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  isLoading = true;

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

  ngOnInit(): void {
    if (this.userService.isLogged) {
      this.router.navigate(['/home']);
    }
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.isLoading = false;
    }, 100);
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
