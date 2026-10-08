
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

export interface AdminProfile {
  fullName: string;
  role: string;
}

export interface LoginResponse {
  token: string;
  isEmailSetupCompleted: boolean;
  mustChangePassword: boolean;
  fullName?: string;
  role?: number | string;
}

@Injectable({
  providedIn: 'root'
})
export class Auth {
  private apiUrl = 'http://localhost:5050/api';

  private profileSubject =
    new BehaviorSubject<AdminProfile | null>(
      this.readProfile()
    );

  profile$ = this.profileSubject.asObservable();

  constructor(private http: HttpClient) {}

  login(loginData: { email: string; password: string }) {
    return this.http.post<LoginResponse>(
      `${this.apiUrl}/Auth/login`,
      loginData
    );
  }

  saveProfile(profile: AdminProfile): void {
    sessionStorage.setItem(
      'adminProfile',
      JSON.stringify(profile)
    );

    this.profileSubject.next(profile);
  }

  getProfile(): AdminProfile | null {
    return this.profileSubject.value;
  }

  private readProfile(): AdminProfile | null {
    try {
      const saved =
        sessionStorage.getItem('adminProfile');

      return saved
        ? JSON.parse(saved) as AdminProfile
        : null;
    } catch {
      return null;
    }
  }

  getEmailSetupStatus() {
    return this.http.get<{
      isEmailSetupRequired: boolean
    }>(
      `${this.apiUrl}/Admin/email-setup-status`,
      { headers: this.getHeaders() }
    );
  }

  getPasswordChangeStatus() {
    return this.http.get<{
      mustChangePassword: boolean
    }>(
      `${this.apiUrl}/Admin/password-change-status`,
      { headers: this.getHeaders() }
    );
  }

  sendEmailVerification(newEmail: string) {
    return this.http.post<{ message: string }>(
      `${this.apiUrl}/Admin/send-email-verification`,
      { newEmail },
      { headers: this.getHeaders() }
    );
  }

  verifyEmailCode(code: string) {
    return this.http.post<{ message: string }>(
      `${this.apiUrl}/Admin/verify-email-code`,
      { code },
      { headers: this.getHeaders() }
    );
  }

  changePassword(
    oldPassword: string,
    newPassword: string
  ) {
    return this.http.put<{ message: string }>(
      `${this.apiUrl}/Admin/change-password`,
      { oldPassword, newPassword },
      { headers: this.getHeaders() }
    );
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  logout(): void {
    localStorage.removeItem('token');
    sessionStorage.removeItem('adminProfile');
    this.profileSubject.next(null);
  }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization:
        `Bearer ${localStorage.getItem('token') || ''}`
    });
  }
}
