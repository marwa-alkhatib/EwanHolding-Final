import { Component, OnInit, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Company } from '../../services/company';
import { NewsAdminService } from '../../services/news';
import { InvestmentAdminService } from '../../services/investment';
import { MessagesService } from '../../services/messages';

@Component({
  imports: [DatePipe, RouterLink],
  selector: 'app-dashboard',
  styleUrl: './dashboard.scss',
  templateUrl: './dashboard.html',
})
export class Dashboard implements OnInit {
  // DASHBOARD STATISTICS
  companies = signal(0);
  investments = signal(0);
  newsTotal = signal(0);
  messages = signal(0);
  showPasswordForm = false;
  oldPassword = '';
  newPassword = '';
  confirmPassword = '';
  passwordLoading = false;
  passwordMessage = '';
  passwordError = false;
  // RECENT NEWS
  news = signal<any[]>([]);

  // CURRENT DATE
  today = new Date();

  constructor(
    private c: Company,
    private n: NewsAdminService,
    private i: InvestmentAdminService,
    private m: MessagesService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    // COMPANIES
    this.c.getCompanies().subscribe({
      next: (data) => {
        this.companies.set(data.length);
      },
      error: (error) => {
        console.error('Companies error:', error);
      },
    });

    // INVESTMENTS
    this.i.all().subscribe({
      next: (data) => {
        this.investments.set(data.length);
      },
      error: (error) => {
        console.error('Investments error:', error);
      },
    });

    // NEWS
    this.n.getAll().subscribe({
      next: (data) => {
        this.newsTotal.set(data.length);
        this.news.set(data.slice(0, 3));
      },
      error: (error) => {
        console.error('News error:', error);
      },
    });

    // MESSAGES
    this.m.all().subscribe({
      next: (data) => {
        this.messages.set(data.length);
      },
      error: (error) => {
        console.error('Messages error:', error);
      },
    });
  }
  changePassword(): void {
  this.passwordMessage = '';
  this.passwordError = false;

  if (!this.oldPassword || !this.newPassword || !this.confirmPassword) {
    this.passwordError = true;
    this.passwordMessage = 'Please fill in all fields.';
    return;
  }

  if (this.newPassword !== this.confirmPassword) {
    this.passwordError = true;
    this.passwordMessage = 'New passwords do not match.';
    return;
  }

  const token = localStorage.getItem('token');

  if (!token) {
    this.passwordError = true;
    this.passwordMessage = 'Please log in again.';
    return;
  }

  this.passwordLoading = true;

  this.http.put(
    'http://localhost:5050/api/Admin/change-password',
    {
      oldPassword: this.oldPassword,
      newPassword: this.newPassword
    },
    {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      }),
      responseType: 'text'
    }
  ).subscribe({
    next: () => {
      this.passwordLoading = false;
      this.passwordError = false;
      this.passwordMessage = 'Password changed successfully.';
      this.oldPassword = '';
      this.newPassword = '';
      this.confirmPassword = '';
    },
    error: (error) => {
      this.passwordLoading = false;
      this.passwordError = true;
      this.passwordMessage =
        error.status === 401
          ? 'Session expired. Please log in again.'
          : error.error?.message || 'Could not change password. Check your current password.';
    }
  });
}
}
