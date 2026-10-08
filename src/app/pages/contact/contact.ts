import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { SiteFooter } from '../../components/site-footer/site-footer';
import { LanguageToggle } from '../../components/language-toggle/language-toggle';

import { TranslatePipe } from '../../services/translate.pipe';
import { ContactService } from '../../services/contact';
import { LanguageService } from '../../services/language';

@Component({
  selector: 'app-contact',
  imports: [SiteFooter, LanguageToggle, TranslatePipe, FormsModule, RouterLink],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class Contact {
  menuOpen = false;
  sent = false;
  sending = false;
  sendError = '';

  form = {
    fullName: '',
    phone: '',
    email: '',
    subject: '',
    message: '',
  };

  constructor(
    private api: ContactService,
    public lang: LanguageService,
  ) {}

  send(event: Event): void {
    event.preventDefault();

    if (this.sending) return;

    this.sent = false;
    this.sendError = '';

    const data = {
      fullName: this.form.fullName.trim(),
      phone: this.form.phone.trim(),
      email: this.form.email.trim(),
      subject: this.form.subject.trim(),
      message: this.form.message.trim(),
    };

    if (Object.values(data).some((value) => !value)) {
      this.sendError = 'Please fill in all fields.';
      return;
    }

    this.sending = true;

    console.log('Contact data being sent:', data);

    this.api.send(data).subscribe({
      next: () => {
        this.sent = true;
        this.sending = false;

        this.form = {
          fullName: '',
          phone: '',
          email: '',
          subject: '',
          message: '',
        };
      },

      error: (error) => {
        this.sending = false;

        console.error('Contact API error:', error);
        console.error('Backend validation errors:', error.error?.errors);

        this.sendError = 'Could not send your message. Please try again.';
      },
    });
  }
}
