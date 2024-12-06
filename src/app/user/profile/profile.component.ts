import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { emailValidator } from '../../utils/email.validator';
import { DOMAINS } from '../../constants';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
})
export class ProfileComponent {
  showEditInfo = false;
  showChangePassword = false;

  editInfoForm: FormGroup;

  passwordsForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.editInfoForm = this.fb.group({
      newUsername: ['', [Validators.required, Validators.minLength(6)]],
      newEmail: ['', [Validators.required, emailValidator(DOMAINS)]],
    });

    this.passwordsForm = this.fb.group({
      oldPassword: ['', [Validators.required, Validators.minLength(6)]],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  toggleEditInfo() {
    if (this.showChangePassword) {
      this.showChangePassword = false;
      this.passwordsForm.reset();
    }
    this.editInfoForm.reset();
    this.showEditInfo = !this.showEditInfo;
  }

  toggleChangePassword() {
    if (this.showEditInfo) {
      this.showEditInfo = false;
      this.editInfoForm.reset();
    }
    this.passwordsForm.reset();
    this.showChangePassword = !this.showChangePassword;
  }

  onSubmitEditInfo() {
    if (this.editInfoForm.valid) {
      console.log('Information updated:', this.editInfoForm.value);
    }
  }

  onSubmitChangePassword() {
    if (this.passwordsForm.valid) {
      console.log('Password changed:', this.passwordsForm.value);
    }
  }
}
