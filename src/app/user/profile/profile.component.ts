import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { emailValidator } from '../../utils/email.validator';
import { DOMAINS } from '../../constants';
import { UserService } from '../user.service';
import { ProfileDetails } from '../../types/user';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
})
export class ProfileComponent implements OnInit {
  showEditInfo = false;
  showChangePassword = false;

  profileDetails: ProfileDetails = {
    username: '',
    email: ''
  };

  editInfoForm: FormGroup;
  passwordsForm: FormGroup;

  constructor(private fb: FormBuilder, private userSevice: UserService) {
    this.editInfoForm = this.fb.group({
      newUsername: ['', [Validators.required, Validators.minLength(6)]],
      newEmail: ['', [Validators.required, emailValidator(DOMAINS)]],
    });

    this.passwordsForm = this.fb.group({
      oldPassword: ['', [Validators.required, Validators.minLength(6)]],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {
    this.userSevice.getCurrentUser().subscribe({
      next: (user) => {
        if (user) {
          this.profileDetails = { username: user.username, email: user.email };
  
          this.editInfoForm.setValue({
            newUsername: user.username,
            newEmail: user.email,
          });
        }
      },
      error: (err) => console.error('Error fetching user:', err),
    });
  }
  

  toggleEditInfo() {
    if (this.showChangePassword) {
      this.showChangePassword = false;
      this.passwordsForm.reset();
    }
    if (!this.showEditInfo) {
      this.editInfoForm.setValue({
        newUsername: this.profileDetails.username,
        newEmail: this.profileDetails.email,
      });
    }
    this.showEditInfo = !this.showEditInfo;
  }

  toggleChangePassword() {
    if (this.showEditInfo) {
      this.showEditInfo = false;
    }
    this.passwordsForm.reset();
    this.showChangePassword = !this.showChangePassword;
  }

  onSubmitEditInfo() {
    if (this.editInfoForm.valid) {
      const { newUsername, newEmail } = this.editInfoForm.value;
  
      this.userSevice.changeUserDetails(newUsername, newEmail).subscribe({
        next: (updatedUser) => {
          console.log('Details changed successfully:', updatedUser);
          this.profileDetails = { username: updatedUser.username, email: updatedUser.email };
          this.toggleEditInfo();
        },
        error: (err) => {
          console.error('Error changing details:', err);
        },
      });
    }
  }  

  onSubmitChangePassword() {
    if (this.passwordsForm.valid) {
      const { oldPassword, newPassword } = this.passwordsForm.value;
  
      this.userSevice.changePassword(oldPassword, newPassword).subscribe({
        next: () => {
          console.log('Password changed successfully');
          this.toggleChangePassword();
        },
        error: (err) => {
          console.error('Error changing password:', err);
        },
      });
    }
  }
}