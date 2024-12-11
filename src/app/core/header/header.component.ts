import { Component } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserService } from '../../user/user.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})

export class HeaderComponent {
  menuOpen = false;

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu() {
    this.menuOpen = false; // Затваря менюто
  }

  get isLoggedIn(): boolean {
    return this.userService.isLogged;
  }

  get username(): string {
    return this.userService.user?.username || '';
  }

  constructor(private router: Router, private userService: UserService) { }

  logout() {
    this.userService.logout().subscribe(() => {
      this.router.navigate(['/login']);
    });
  }


}