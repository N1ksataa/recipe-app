import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserService } from '../user.service';
import { LoaderComponent } from '../../shared/loader/loader.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule, LoaderComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})  

export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isLoading = true;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(6)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
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
    const { username, password } = this.loginForm.value;
  
    this.userService.login(username, password).subscribe({
      next: () => {
        this.router.navigate(['/home']);
      },
      error: (err) => {
        console.error('Login error:', err);
        alert('Invalid username or password');
      }
    });
  }
}