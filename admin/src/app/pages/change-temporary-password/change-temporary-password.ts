
import {
  ChangeDetectorRef,
  Component
} from '@angular/core';

import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-change-temporary-password',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './change-temporary-password.html',
  styleUrl: './change-temporary-password.scss'
})
export class ChangeTemporaryPassword {
  oldPassword = '';
  newPassword = '';
  confirmPassword = '';

  loading = false;
  error = '';

  constructor(
    private auth: Auth,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  submit() {
    this.error = '';

    if (
      !this.oldPassword ||
      !this.newPassword ||
      !this.confirmPassword
    ) {
      this.error = 'Please complete all fields.';
      return;
    }

    if (this.newPassword.length < 12) {
      this.error =
        'New password must be at least 12 characters.';
      return;
    }

    if (this.newPassword !== this.confirmPassword) {
      this.error = 'New passwords do not match.';
      return;
    }

    if (this.oldPassword === this.newPassword) {
      this.error = 'Choose a different password.';
      return;
    }

    this.loading = true;

    this.auth.changePassword(
      this.oldPassword,
      this.newPassword
    ).subscribe({
      next: () => {
        this.loading = false;

        this.auth.logout();

        this.router.navigate(['/login']);

        this.cdr.markForCheck();
      },

      error: err => {
        this.loading = false;

        this.error =
          err.error?.message ||
          'Unable to change password.';

        this.cdr.markForCheck();
      }
    });
  }
}
