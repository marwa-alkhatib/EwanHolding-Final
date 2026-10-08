
import { Component, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-setup-email',
  imports: [FormsModule],
  templateUrl: './setup-email.html',
  styleUrl: './setup-email.scss'
})
export class SetupEmail {

  newEmail = '';
  confirmEmail = '';
  verificationCode = '';

  codeSent = false;
  loading = false;
  error = '';
  success = '';

  constructor(
    private auth: Auth,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  // Send verification code to the new email
  sendCode() {
    this.error = '';
    this.success = '';

    const email = this.newEmail.trim().toLowerCase();
    const confirm = this.confirmEmail.trim().toLowerCase();

    if (!email || !confirm) {
      this.error = 'Please complete both email fields.';
      return;
    }

    if (email !== confirm) {
      this.error = 'Email addresses do not match.';
      return;
    }

    this.loading = true;
    this.cdr.markForCheck();

    this.auth.sendEmailVerification(email).subscribe({
      next: () => {
        this.loading = false;
        this.codeSent = true;
        this.success = 'Verification code sent to your email.';

        this.cdr.markForCheck();
      },
      error: (err) => {
        this.loading = false;
        this.error =
          err.error?.message ||
          'Unable to send verification code. Please try again.';

        this.cdr.markForCheck();
      }
    });
  }

  // Verify the 6-digit OTP code
  verifyCode() {
    this.error = '';
    this.success = '';

    const code = this.verificationCode.trim();

    if (!/^\d{6}$/.test(code)) {
      this.error = 'Please enter a valid 6-digit code.';
      return;
    }

    this.loading = true;
    this.cdr.markForCheck();

    this.auth.verifyEmailCode(code).subscribe({
      next: () => {
        this.loading = false;
        this.success = 'Email verified successfully.';

        this.cdr.markForCheck();

        // Logout to sign in using the verified email
        this.auth.logout();
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.loading = false;
        this.error =
          err.error?.message ||
          'Unable to verify the code. Please try again.';

        this.cdr.markForCheck();
      }
    });
  }

  // Return to email entry screen
  changeEmail() {
    this.codeSent = false;
    this.verificationCode = '';
    this.error = '';
    this.success = '';

    this.cdr.markForCheck();
  }
}
