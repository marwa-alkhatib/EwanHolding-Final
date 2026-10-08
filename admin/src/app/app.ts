
import { Component, inject } from '@angular/core';
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet
} from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { Auth } from './services/auth';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    AsyncPipe
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {

  private auth = inject(Auth);
  public router = inject(Router);

  profile$ = this.auth.profile$;

  getInitial(name: string): string {
    return name.trim().charAt(0).toUpperCase();
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
