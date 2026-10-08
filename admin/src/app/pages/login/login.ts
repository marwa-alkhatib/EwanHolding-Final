
import {
  ChangeDetectorRef,
  Component,
  OnInit
} from '@angular/core';

import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login implements OnInit {

  loginData = {
    email: '',
    password: '',
  };

  error = '';
  loading = false;

  constructor(
    private authService: Auth,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.clearLoginData();
    this.error = '';
    this.loading = false;
  }

  private clearLoginData(): void {
    this.loginData = {
      email: '',
      password: '',
    };
  }

  login(): void {
    if (
      !this.loginData.email.trim() ||
      !this.loginData.password
    ) {
      this.error = 'Please enter your email and password.';
      return;
    }

    this.loading = true;
    this.error = '';

    this.authService.login(this.loginData).subscribe({
      next: (response) => {

        if (!response?.token) {
          this.error = 'Login failed. Token was not received.';
          this.loading = false;
          this.cdr.markForCheck();
          return;
        }

        // Save authentication token
        localStorage.setItem('token', response.token);

        // Save admin profile information
        if (
          response.fullName &&
          response.role !== undefined
        ) {
          const roleNames: Record<number, string> = {
            1: 'Super Admin',
            2: 'Editor',
            3: 'Content Manager',
          };

          const role =
            typeof response.role === 'number'
              ? (roleNames[response.role] ?? 'Admin')
              : response.role === 'SuperAdmin'
                ? 'Super Admin'
                : response.role === 'ContentManager'
                  ? 'Content Manager'
                  : response.role;

          this.authService.saveProfile({
            fullName: response.fullName,
            role,
          });
        }

        this.clearLoginData();
        this.loading = false;

        // Step 1: Verify email if required
        if (response.isEmailSetupCompleted === false) {
          this.router.navigate(['/setup-email']);
        }

        // Step 2: Change temporary password if required
        else if (response.mustChangePassword === true) {
          this.router.navigate([
            '/change-temporary-password'
          ]);
        }

        // Step 3: Access dashboard
        else {
          this.router.navigate(['/']);
        }

        this.cdr.markForCheck();
      },

      error: () => {
        this.error = 'Invalid email or password.';
        this.loading = false;
        this.loginData.password = '';
        this.cdr.markForCheck();
      },
    });
  }
}
