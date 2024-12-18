import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { emailValidator } from '../../utils/email.validator';
import { DOMAINS } from '../../constants';
import { UserService } from '../user.service';
import { ProfileDetails } from '../../types/user';
import { LoaderComponent } from '../../shared/loader/loader.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, LoaderComponent],
})
export class ProfileComponent implements OnInit {
  showEditInfo = false;
  showChangePassword = false;
  isLoading = true;

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

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.isLoading = false;
    }, 100);
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
          this.profileDetails = { username: updatedUser.username, email: updatedUser.email };
          alert('Details changed successfully!');
          this.toggleEditInfo();
        },
        error: (err) => {
          console.error('Error changing details:', err);
          alert(`Error changing details: Username or email is already taken! Try again!`);
          this.editInfoForm.setValue({
            newUsername: this.profileDetails.username,
            newEmail: this.profileDetails.email,
          });
        },
      });
    }
  }  

  onSubmitChangePassword() {
    if (this.passwordsForm.valid) {
      const { oldPassword, newPassword } = this.passwordsForm.value;

      if (oldPassword === newPassword) {
        alert('Error changing details: Old password cannot be the same as the new password.');
        this.passwordsForm.reset();
        return;
      }
  
      this.userSevice.changePassword(oldPassword, newPassword).subscribe({
        next: () => {
          alert('Password changed successfully');
          this.toggleChangePassword();
        },
        error: (err) => {
          console.error('Error changing details:', err);
          alert(`Error changing details: Old password is incorrect`);
          this.passwordsForm.reset();
        },
      });
    }
  }
}