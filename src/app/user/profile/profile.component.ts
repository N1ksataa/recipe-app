import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  standalone: true,
  imports: [CommonModule],
})

export class ProfileComponent {
  showEditInfo = false;
  showChangePassword = false;

  toggleEditInfo() {
    if(this.showChangePassword){
      this.showChangePassword = false;
    }
    this.showEditInfo = !this.showEditInfo;
  }

  toggleChangePassword() {
    if(this.showEditInfo){
      this.showEditInfo = false;
    }
    this.showChangePassword = !this.showChangePassword;
  }
}